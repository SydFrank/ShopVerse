// Import moment library for date formatting
const moment = require("moment");
const authOrderModel = require("../../models/authOrder");
const customerOrderModel = require("../../models/customerOrder");
const cartModel = require("../../models/cartModel");
// Import custom response utility for consistent API responses
const { responseReturn } = require("../../utils/response");
const customerOrder = require("../../models/customerOrder");
const myShopWallet = require("../../models/myShopWallet");
const sellerWallet = require("../../models/sellerWallet");

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Define the orderControllers class to handle order-related operations
class orderControllers {
  /**
   * Checks payment status and cancels unpaid orders.
   * This method is typically called after a timeout period to automatically
   * cancel orders that haven't been paid for within the specified time limit.
   * Updates both customer and seller order records to "cancelled" status.
   *
   * @param {string} id - The order ID to check payment status for
   * @returns {boolean} Returns true when check is complete
   */
  paymentCheck = async (id) => {
    try {
      // Find the customer order by ID
      const order = await customerOrderModel.findById(id);

      // Check if the order payment status is still unpaid
      if (order.payment_status === "unpaid") {
        // Update customer order delivery status to cancelled
        await customerOrderModel.findByIdAndUpdate(id, {
          delivery_status: "cancelled",
        });

        // Update all related seller orders (authOrders) to cancelled status
        await authOrderModel.updateMany(
          { orderId: id }, // Find all seller orders with this orderId
          { delivery_status: "cancelled" } // Set delivery status to cancelled
        );
      }
      return true;
    } catch (error) {
      // Log error message for debugging purposes
      console.log(error.message);
    }
  };
  // End of paymentCheck method

  /**
   * Handles placing a new order with multiple products from different sellers.
   * This method creates customer and seller order records, removes items from cart,
   * and sets up automatic order cancellation for unpaid orders.
   * The order is split between customer order (for customer view) and
   * auth orders (for individual sellers).
   *
   * @param {Object} req - Express request object, expects body:
   *   - price: total price of products (excluding shipping)
   *   - products: array of products grouped by seller
   *   - shipping_fee: total shipping cost
   *   - shippingInfo: customer shipping address details
   *   - userId: ID of the customer placing the order
   * @param {Object} res - Express response object
   */
  place_order = async (req, res) => {
    // Extract order details from request body
    const { price, products, shipping_fee, shippingInfo, userId } = req.body;

    // Initialize arrays for order processing
    let authOrderData = []; // Array to store seller-specific order data
    let cartId = []; // Array to store cart item IDs for deletion

    // Format current date and time for order timestamp
    const tempData = moment(Date.now()).format("LLL");

    // Initialize array to store all customer order products
    let customerOrderProduct = [];

    // Process products and extract cart IDs for deletion
    for (let i = 0; i < products.length; i++) {
      // Get products array for current seller
      const pro = products[i].products;

      // Process each product for the current seller
      for (let j = 0; j < pro.length; j++) {
        // Get product information
        const tempCusPro = pro[j].productInfo;
        // Add quantity to product info
        tempCusPro.quantity = pro[j].quantity;
        // Add to customer order products array
        customerOrderProduct.push(tempCusPro);

        // Collect cart item IDs for deletion after order placement
        if (pro[j]._id) {
          cartId.push(pro[j]._id);
        }
      }
    }

    try {
      // Create main customer order record
      const order = await customerOrderModel.create({
        customerId: userId, // Customer who placed the order
        shippingInfo: shippingInfo, // Shipping address details
        products: customerOrderProduct, // All products in the order
        price: price + shipping_fee, // Total price including shipping
        payment_status: "unpaid", // Initial payment status
        delivery_status: "pending", // Initial delivery status
        date: tempData, // Order timestamp
      });

      // Create individual seller orders (auth orders)
      for (let i = 0; i < products.length; i++) {
        // Get products and details for current seller
        const pro = products[i].products;
        const pri = products[i].price; // Price for this seller's products
        const sellerId = products[i].sellerId; // Seller's ID

        // Prepare products array for current seller
        let storePro = [];
        for (let j = 0; j < pro.length; j++) {
          const tempPro = pro[j].productInfo;
          // Add quantity information to product
          tempPro.quantity = pro[j].quantity;
          storePro.push(tempPro);
        }

        // Build seller order data
        authOrderData.push({
          orderId: order.id, // Reference to main customer order
          sellerId, // Seller who will fulfill this part of the order
          products: storePro, // Products for this seller
          price: pri, // Total price for this seller's products
          payment_status: "unpaid", // Initial payment status
          shippingInfo: "Easy Main Warehouse", // Shipping origin
          delivery_status: "pending", // Initial delivery status
          date: tempData, // Order timestamp
        });
      }

      // Insert all seller orders into database
      await authOrderModel.insertMany(authOrderData);

      // Remove ordered items from customer's cart
      for (let i = 0; i < cartId.length; i++) {
        await cartModel.findByIdAndDelete(cartId[i]);
      }

      // Set automatic order cancellation timer for unpaid orders
      setTimeout(async () => {
        await this.paymentCheck(order.id);
      }, 15000); // Cancel order after 15 seconds if unpaid

      // Return success response with order ID
      responseReturn(res, 200, {
        message: "Order Placed Successfully",
        orderId: order.id, // Include order ID for payment processing
      });
    } catch (error) {
      // Log error message for debugging purposes
      console.log(error.message);
      // Return error response
      responseReturn(res, 500, { error: "Internal Server Error" });
    }
  };
  // End of place_order method

  /**
   * Handles retrieving customer dashboard statistics and recent order data.
   * This method provides an overview of the customer's order history including
   * recent orders, pending orders count, total orders count, and cancelled orders count.
   * Used to populate the customer dashboard with relevant order statistics.
   *
   * @param {Object} req - Express request object, expects params:
   *   - userId: ID of the customer whose dashboard data to retrieve (string)
   * @param {Object} res - Express response object
   */
  get_customer_dashboard_data = async (req, res) => {
    // Extract customer ID from request parameters
    const { userId } = req.params;

    try {
      // Fetch the 5 most recent orders for this customer
      const recentOrders = await customerOrder
        .find({
          customerId: new ObjectId(userId), // Match orders by customer ID
        })
        .limit(5); // Limit to 5 most recent orders

      // Count total number of pending orders for this customer
      const pendingOrder = await customerOrder
        .find({
          customerId: new ObjectId(userId), // Match orders by customer ID
          delivery_status: "pending", // Filter for pending delivery status
        })
        .countDocuments(); // Get count instead of documents

      // Count total number of orders (all statuses) for this customer
      const totalOrder = await customerOrder
        .find({
          customerId: new ObjectId(userId), // Match orders by customer ID
        })
        .countDocuments(); // Get count instead of documents

      // Count total number of cancelled orders for this customer
      const cancelledOrder = await customerOrder
        .find({
          customerId: new ObjectId(userId), // Match orders by customer ID
          delivery_status: "cancelled", // Filter for cancelled delivery status
        })
        .countDocuments(); // Get count instead of documents

      // Return dashboard statistics and recent orders
      responseReturn(res, 200, {
        recentOrders, // Array of 5 most recent orders with full details
        pendingOrder, // Number of orders with pending status
        totalOrder, // Total number of orders placed by customer
        cancelledOrder, // Number of orders that were cancelled
      });
    } catch (error) {
      // Log error message for debugging purposes
      console.log(error.message);
      // Return error response
      responseReturn(res, 500, { error: "Internal Server Error" });
    }
  };
  // End of get_customer_dashboard_data method

  /**
   * Handles retrieving customer orders based on delivery status filter.
   * This method fetches orders for a specific customer, optionally filtered by
   * delivery status (pending, delivered, cancelled, etc.). If status is "all",
   * it returns all orders regardless of status. Used for customer order history pages.
   *
   * @param {Object} req - Express request object, expects params:
   *   - customerId: ID of the customer whose orders to retrieve (string)
   *   - status: delivery status filter ("all", "pending", "delivered", "cancelled", etc.)
   * @param {Object} res - Express response object
   */
  get_orders = async (req, res) => {
    // Extract customer ID and status filter from request parameters
    const { customerId, status } = req.params;

    try {
      // Initialize orders array to store query results
      let orders = [];

      // Check if status filter is applied or if fetching all orders
      if (status !== "all") {
        // Fetch orders filtered by specific delivery status
        orders = await customerOrderModel.find({
          customerId: new ObjectId(customerId), // Match orders by customer ID
          delivery_status: status, // Filter by specific delivery status
        });
      } else {
        // Fetch all orders for the customer regardless of status
        orders = await customerOrderModel.find({
          customerId: new ObjectId(customerId), // Match orders by customer ID
        });
      }

      // Return the filtered orders in the response
      responseReturn(res, 200, { orders });
    } catch (error) {
      // Log error message for debugging purposes
      console.log(error.message);
      // Return error response (should include proper error response)
      responseReturn(res, 500, { error: "Internal Server Error" });
    }
  };
  // End of get_orders method

  /**
   * Handles retrieving detailed information for a specific customer order.
   * This method fetches complete order details including products, shipping info,
   * pricing, and status information for a single order. Used when customers
   * want to view full details of a specific order from their order history.
   *
   * @param {Object} req - Express request object, expects params:
   *   - orderId: ID of the specific order to retrieve details for (string)
   * @param {Object} res - Express response object
   */
  get_orders_details = async (req, res) => {
    // Extract order ID from request parameters
    const { orderId } = req.params;

    try {
      // Find and retrieve the complete order details by order ID
      const order = await customerOrderModel.findById(orderId);

      // Return the complete order details in the response
      responseReturn(res, 200, { order });
    } catch (error) {
      // Log error message for debugging purposes
      console.log(error.message);
      // Return error response if order retrieval fails
      responseReturn(res, 500, { error: "Internal Server Error" });
    }
  };
  // End of get_orders_details method

  /**
   * Handles retrieving all orders for admin view with pagination and search.
   * This method fetches orders across all customers, supporting pagination
   * and optional search functionality. Used for admin dashboards to monitor
   * all customer orders and their statuses with associated seller order details.
   *
   * @param {Object} req - Express request object, expects query params:
   *   - page: current page number for pagination (string/number)
   *   - parPage: number of orders per page (string/number)
   *   - searchValue: optional search term to filter orders (string)
   * @param {Object} res - Express response object
   */
  get_admin_orders = async (req, res) => {
    // Extract and parse pagination and search parameters from query
    let { page, searchValue, parPage } = req.query;
    page = parseInt(page); // Convert page to integer
    parPage = parseInt(parPage); // Convert items per page to integer

    // Calculate how many orders to skip based on current page
    const skipPage = parPage * (page - 1);

    try {
      // Check if search functionality is being used
      if (searchValue) {
        // TODO: Implement search functionality when searchValue is provided
        // This would typically search by order ID, customer name, or other criteria
      } else {
        // Fetch paginated orders with associated seller order details using aggregation
        const orders = await customerOrder
          .aggregate([
            {
              // Join customer orders with corresponding seller orders (auth orders)
              $lookup: {
                from: "authororders", // Collection name for seller orders
                localField: "_id", // Customer order ID
                foreignField: "orderId", // Reference field in seller orders
                as: "suborder", // Alias for joined seller order data
              },
            },
          ])
          .skip(skipPage) // Skip orders for previous pages
          .limit(parPage) // Limit to specified number per page
          .sort({ createdAt: -1 }); // Sort by creation date (newest first)

        // Get total count of all orders for pagination calculation
        const totalOrder = await customerOrder.aggregate([
          {
            // Join customer orders with seller orders to get complete count
            $lookup: {
              from: "authororders", // Collection name for seller orders
              localField: "_id", // Customer order ID
              foreignField: "orderId", // Reference field in seller orders
              as: "suborder", // Alias for joined seller order data
            },
          },
        ]);

        // Return paginated orders and total count
        responseReturn(res, 200, {
          orders, // Array of orders for current page with seller details
          totalOrder: totalOrder.length, // Total number of orders for pagination
        });
      }
    } catch (error) {
      // Log error message for debugging purposes
      console.log(error.message);
    }
  };
  // End of get_admin_orders method

  /**
   * Handles retrieving detailed information for a specific order for admin view.
   * This method fetches complete order details including products, shipping info,
   * pricing, and status information for a single order, along with associated
   * seller order details. Used by admins to view full details of any customer order.
   *
   * @param {Object} req - Express request object, expects params:
   *   - orderId: ID of the specific order to retrieve details for (string)
   * @param {Object} res - Express response object
   */
  get_admin_order = async (req, res) => {
    const { orderId } = req.params;

    try {
      const order = await customerOrder.aggregate([
        {
          $match: {
            _id: new ObjectId(orderId),
          },
        },
        {
          $lookup: {
            from: "authororders",
            localField: "_id",
            foreignField: "orderId",
            as: "suborder",
          },
        },
      ]);
      responseReturn(res, 200, { order: order[0] });
    } catch (error) {
      console.log(error.message);
    }
  };
  // End of get_admin_order method

  /**
   * Handles updating the delivery status of a specific order by admin.
   * This method allows admins to change the delivery status of a customer order,
   * including marking it as shipped, delivered, or canceled.
   * Also updates all associated seller orders to maintain consistency.
   *
   * @param {Object} req - Express request object, expects params and body:
   *  - orderId: ID of the specific order to update (string)
   * - status: new delivery status to set (string)
   * @param {Object} res - Express response object
   */
  admin_order_status_update = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
      await customerOrder.findByIdAndUpdate(orderId, {
        delivery_status: status,
      });
      responseReturn(res, 200, {
        message: "Order Status Updated Successfully",
      });
    } catch (error) {
      console.log(error.message);
      responseReturn(res, 500, { message: "Internal Server Error" });
    }
  };
  // End of admin_order_status_update method

  /**
   * Handles retrieving all orders for a specific seller with pagination and search.
   * This method fetches orders assigned to a particular seller, supporting pagination and search functionality.
   * Used for seller dashboards to monitor their orders and statuses.
   *
   * @param {Object} req - Express request object, expects params and query:
   * - sellerId: ID of the seller whose orders to retrieve (string)
   * - page: current page number for pagination (string/number)
   * - parPage: number of orders per page (string/number)
   * - searchValue: optional search term to filter orders (string)
   * @param {Object} res - Express response object
   */
  get_seller_orders = async (req, res) => {
    // Get seller ID from request parameters
    const { sellerId } = req.params;
    // Extract and parse pagination and search parameters from query
    let { page, searchValue, parPage } = req.query;
    page = parseInt(page); // Convert page to integer
    parPage = parseInt(parPage); // Convert items per page to integer

    // Calculate how many orders to skip based on current page
    const skipPage = parPage * (page - 1);

    try {
      if (searchValue) {
      } else {
        const orders = await authOrderModel
          .find({
            sellerId: sellerId,
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalOrder = await authOrderModel
          .find({
            sellerId: sellerId,
          })
          .countDocuments();

        responseReturn(res, 200, {
          orders,
          totalOrder,
        });
      }
    } catch (error) {
      console.log(error.message);
      responseReturn(res, 500, { message: "Internal Server Error" });
    }
  };
  // End of get_seller_orders method

  /**
   * Handles retrieving detailed information for a specific order for seller view.
   * This method fetches complete order details including products, shipping info, and customer details.
   * Used by sellers to view full details of orders assigned to them.
   *
   * @param {Object} req - Express request object, expects params:
   *   - orderId: ID of the specific order to retrieve details for (string)
   * @param {Object} res - Express response object
   */
  get_seller_order = async (req, res) => {
    const { orderId } = req.params;

    try {
      const order = await authOrderModel.findById(orderId);
      responseReturn(res, 200, { order });
    } catch (error) {
      console.log(error.message);
      responseReturn(res, 500, { message: "Internal Server Error" });
    }
  };
  // End of get_seller_order method

  /**
   * Handles updating the delivery status of a specific order by seller.
   * This method allows sellers to change the delivery status of their assigned orders, ensuring accurate tracking and management.
   *
   * @param {Object} req - Express request object, expects params and body:
   *   - orderId: ID of the specific order to update (string)
   * @param {Object} res - Express response object
   */
  seller_order_status_update = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
      await authOrderModel.findByIdAndUpdate(orderId, {
        delivery_status: status,
      });
      responseReturn(res, 200, {
        message: "Order Status Updated Successfully",
      });
    } catch (error) {
      console.log(error.message);
      responseReturn(res, 500, { message: "Internal Server Error" });
    }
  };
  // End of seller_order_status_update method

  /**
   * Handles creating a Stripe payment intent for order payment processing.
   * This method creates a payment intent with Stripe that allows customers
   * to pay for their orders using various payment methods. The payment intent
   * includes the total amount and currency, and returns a client secret that
   * the frontend can use to complete the payment process securely.
   *
   * @param {Object} req - Express request object, expects body:
   *   - price: total amount to be charged (number, in dollars)
   * @param {Object} res - Express response object
   */
  payment_create = async (req, res) => {
    // Extract the price from request body
    const price = req.body?.price;

    try {
      // Create a payment intent with Stripe
      const payment = await stripe.paymentIntents.create({
        amount: Math.round(Number(price) * 100), // Convert dollars to cents (Stripe requires amounts in smallest currency unit)
        currency: "aud", // Set currency to Australian Dollars
        automatic_payment_methods: { enabled: true }, // Enable automatic payment method selection (cards, digital wallets, etc.)
      });

      // Return the client secret to the frontend for secure payment completion
      responseReturn(res, 200, {
        clientSecret: payment.client_secret, // Client secret needed for frontend payment confirmation
      });
    } catch (error) {
      // Log error message for debugging purposes
      console.log("Payment creation error:", error.message);
    }
  };
  // End of payment_create method

  /**
   * Handles confirming order payment and updating order status.
   * This method is called after successful payment to update both customer and seller
   * order statuses from "unpaid" to "paid", and creates wallet entries for revenue tracking.
   * It also records financial transactions for both the platform and individual sellers.
   *
   * @param {Object} req - Express request object, expects params:
   *   - orderId: ID of the order to confirm payment for (string)
   * @param {Object} res - Express response object
   */
  order_confirm = async (req, res) => {
    // Extract order ID from request parameters
    const { orderId } = req.params;

    try {
      // Update customer order payment status to "paid"
      await customerOrder.findByIdAndUpdate(orderId, {
        payment_status: "paid",
      });

      // Update all related seller orders to "paid" and set delivery status to "pending"
      // This allows sellers to start processing the order
      await authOrderModel.updateMany(
        { orderId: new ObjectId(orderId) }, // Find all seller orders for this customer order
        {
          payment_status: "paid", // Mark payment as received
          delivery_status: "pending", // Set delivery status to pending (ready to process)
        }
      );

      // Fetch the confirmed customer order for financial tracking
      const cuOrder = await customerOrder.findById(orderId);

      // Fetch all seller orders associated with this customer order
      const auOrder = await authOrderModel.find({
        orderId: new ObjectId(orderId),
      });

      // Get current date and format it for financial record keeping
      const time = moment(Date.now()).format("l"); // Format: MM/DD/YYYY

      // Split the date to extract month and year for financial categorization
      const splitTime = time.split("/");
      // splitTime[0] = month, splitTime[1] = day, splitTime[2] = year

      // Create platform wallet entry for total order revenue tracking
      // This records the total amount received by the platform
      await myShopWallet.create({
        amount: cuOrder.price, // Total order amount (including all sellers + fees)
        month: splitTime[0], // Month for financial reporting
        year: splitTime[2], // Year for financial reporting
      });

      // Create individual seller wallet entries for each seller in this order
      // This tracks how much each seller earned from their products
      for (let i = 0; i < auOrder.length; i++) {
        await sellerWallet.create({
          sellerId: auOrder[i].sellerId.toString(), // Convert ObjectId to string
          amount: auOrder[i].price, // Amount earned by this specific seller
          month: splitTime[0], // Month for financial reporting
          year: splitTime[2], // Year for financial reporting
        });
      }

      // Return success response confirming payment and order processing
      responseReturn(res, 200, { message: "success" });
    } catch (error) {
      console.log(error.message);
    }
  };
  // End of order_confirm method
}

// Export instance of orderControllers for use in routes
module.exports = new orderControllers();

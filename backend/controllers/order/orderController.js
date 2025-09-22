// Import moment library for date formatting
const moment = require("moment");
// Import authentication order model for seller order records
const authOrderModel = require("../../models/authOrder");
// Import customer order model for customer order records
const customerOrderModel = require("../../models/customerOrder");
// Import cart model for removing items from cart after order placement
const cartModel = require("../../models/cartModel");
// Import custom response utility for consistent API responses
const { responseReturn } = require("../../utils/response");

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
}

// Export instance of orderControllers for use in routes
module.exports = new orderControllers();

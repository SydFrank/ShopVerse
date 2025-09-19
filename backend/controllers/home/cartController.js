// Import the cart model for database operations
const cartModel = require("../../models/cartModel");
// Import custom response utility for consistent API responses
const { responseReturn } = require("../../utils/response");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Define the cartControllers class to handle shopping cart related logic
class cartControllers {
  /**
   * Handles adding a product to the shopping cart.
   * This method checks if the product is already in the user's cart,
   * and if not, creates a new cart entry with the specified quantity.
   * Prevents duplicate products from being added to the same user's cart.
   *
   * @param {Object} req - Express request object, expects body:
   *   - userId: ID of the customer adding the product (string)
   *   - productId: ID of the product to be added (string)
   *   - quantity: Number of items to add to cart (number)
   * @param {Object} res - Express response object
   */
  add_to_cart = async (req, res) => {
    // Optionally log the request body for debugging
    // console.log(req.body);

    // Extract cart details from the request body
    const { userId, productId, quantity } = req.body;

    try {
      // Check if the product already exists in the user's cart
      // Using MongoDB $and operator to match both productId and userId
      const product = await cartModel.findOne({
        $and: [
          {
            productId: {
              $eq: productId, // Check if productId matches
            },
          },
          {
            userId: {
              $eq: userId, // Check if userId matches
            },
          },
        ],
      });

      if (product) {
        // Return error response if product is already in the cart
        responseReturn(res, 404, { error: "Product Already Added To Cart" });
      } else {
        // Create a new cart entry if product is not already in cart
        const product = await cartModel.create({
          userId, // Customer's ID who is adding the product
          productId, // Product's ID being added to cart
          quantity, // Number of items being added
        });

        // Return success response with the created cart entry
        responseReturn(res, 201, {
          message: "Added To Cart Successfully",
          product, // Include the created cart entry in response
        });
      }
    } catch (error) {
      // Log error message to console for debugging purposes
      console.log(error.message);
      // Return internal server error response
      responseReturn(res, 500, { error: "Internal Server Error" });
    }
  };
  // End of add_to_cart method

  /**
   * Handles retrieving and calculating cart products for a specific user.
   * This method aggregates cart items with product details, separates in-stock
   * and out-of-stock products, calculates total prices including discounts and
   * commission, groups products by seller, and returns comprehensive cart information.
   *
   * @param {Object} req - Express request object, expects params:
   *   - userId: ID of the customer whose cart to retrieve (string)
   * @param {Object} res - Express response object
   */
  get_cart_products = async (req, res) => {
    // Define commission percentage that will be deducted from seller's earnings
    const commision = 5; // 5% commission on each product
    // Extract userId from request parameters
    const { userId } = req.params;

    try {
      // Aggregate cart products with product details using MongoDB aggregation pipeline
      const cart_products = await cartModel.aggregate([
        {
          // Match cart items belonging to the specific user
          $match: {
            userId: {
              $eq: new ObjectId(userId), // Convert userId string to ObjectId for matching
            },
          },
        },
        {
          // Join cart items with product collection to get product details
          $lookup: {
            from: "products", // Name of the products collection in MongoDB
            localField: "productId", // Field in cartModel that references product
            foreignField: "_id", // Field in products collection (primary key)
            as: "products", // Alias for the joined product data
          },
        },
      ]);

      // Initialize variables for calculations
      let buy_product_item = 0; // Count of items that can be purchased (in stock)
      let calculate_price = 0; // Total price of purchasable items
      let cart_product_count = 0; // Total count of all items in cart

      // Filter products that are out of stock (insufficient inventory)
      const outOfStockProduct = cart_products.filter((item) => {
        return item.products[0].stock < item.quantity; // Check if requested quantity exceeds available stock
      });

      // Count total quantity of out-of-stock products
      for (let i = 0; i < outOfStockProduct.length; i++) {
        cart_product_count = cart_product_count + outOfStockProduct[i].quantity;
      }

      // Filter products that are in stock (sufficient inventory)
      const stockProduct = cart_products.filter((item) => {
        return item.products[0].stock >= item.quantity; // Check if stock is sufficient for requested quantity
      });

      // Calculate total price and quantities for in-stock products
      for (let i = 0; i < stockProduct.length; i++) {
        const { quantity } = stockProduct[i]; // Get quantity from cart item
        cart_product_count = cart_product_count + quantity; // Add to total cart count
        buy_product_item = buy_product_item + quantity; // Add to purchasable items count

        // Get product pricing information
        const { discount, price } = stockProduct[i].products[0];

        // Calculate price based on whether discount is applied
        if (discount !== 0) {
          // Apply discount: final price = original price - (original price * discount percentage)
          calculate_price =
            calculate_price + quantity * (price - price * (discount / 100));
        } else {
          // No discount: use original price
          calculate_price = calculate_price + quantity * price;
        }
      }

      // Round calculated price to 2 decimal places
      calculate_price = parseFloat(calculate_price.toFixed(2));

      // Initialize array to store products grouped by seller
      let product = [];

      // Get unique seller IDs from in-stock products
      let unique = [
        ...new Set(
          stockProduct.map((item) => item.products[0].sellerId.toString())
        ),
      ];

      // Group products by seller and calculate seller-specific totals
      for (let i = 0; i < unique.length; i++) {
        let price = 0; // Initialize price for current seller

        // Process all products for current seller
        for (let j = 0; j < stockProduct.length; j++) {
          const tempProduct = stockProduct[j].products[0]; // Get product details

          // Check if current product belongs to current seller
          if (unique[i] === tempProduct.sellerId.toString()) {
            let singleProductPrice = 0;

            // Calculate single product price with discount if applicable
            if (tempProduct.discount !== 0) {
              singleProductPrice =
                tempProduct.price -
                Math.floor(tempProduct.price * (tempProduct.discount / 100));
            } else {
              singleProductPrice = tempProduct.price;
            }

            // Deduct commission from seller's price
            singleProductPrice =
              singleProductPrice -
              Math.floor(singleProductPrice * (commision / 100));

            // Calculate total price for this product (price * quantity)
            price = price + singleProductPrice * stockProduct[j].quantity;

            // Build product object grouped by seller
            product[i] = {
              sellerId: unique[i], // Seller's unique ID
              shopName: tempProduct.shopName, // Seller's shop name
              price, // Total price for all products from this seller
              products: product[i]
                ? [
                    // If seller already has products, add to existing array
                    ...product[i].products,
                    {
                      _id: stockProduct[j]._id, // Cart item ID
                      quantity: stockProduct[j].quantity, // Quantity in cart
                      productInfo: tempProduct, // Complete product information
                    },
                  ]
                : [
                    // If first product for this seller, create new array
                    {
                      _id: stockProduct[j]._id, // Cart item ID
                      quantity: stockProduct[j].quantity, // Quantity in cart
                      productInfo: tempProduct, // Complete product information
                    },
                  ],
            };
          }
        }
      }

      // Return comprehensive cart information
      responseReturn(res, 200, {
        cart_products: product, // Products grouped by seller
        price: calculate_price, // Total price of purchasable items
        cart_product_count, // Total number of items in cart
        shipping_fee: 20 * product.length, // Shipping fee (20 per seller)
        buy_product_item, // Number of items that can be purchased
        outOfStockProduct, // Array of out-of-stock products
      });
    } catch (error) {
      // Return error response if any exception occurs
      responseReturn(res, 500, { error: "Internal Server Error" });
    }
  };
  // End of get_cart_products method

  /**
   * Handles removing a product from the shopping cart.
   * This method deletes a specific cart item using the cart item's ID.
   * Once deleted, the product will no longer appear in the user's cart.
   *
   * @param {Object} req - Express request object, expects params:
   *   - cart_id: ID of the cart item to be deleted (string)
   * @param {Object} res - Express response object
   */
  delete_cart_product = async (req, res) => {
    // Extract cart item ID from request parameters
    const { cart_id } = req.params;

    try {
      // Find and delete the cart item by its ID
      await cartModel.findByIdAndDelete(cart_id);

      // Return success response confirming deletion
      responseReturn(res, 200, { message: "Product Removed Successfully" });
    } catch (error) {
      // Return error response if deletion fails
      responseReturn(res, 500, { error: "Internal Server Error" });
    }
  };
  // End of delete_cart_product method
}

// Export instance of cartControllers for use in routes
module.exports = new cartControllers();

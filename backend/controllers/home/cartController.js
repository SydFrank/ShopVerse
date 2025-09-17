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

  get_cart_products = async (req, res) => {
    const { userId } = req.params;

    try {
      const cart_products = await cartModel.aggregate([
        {
          $match: {
            userId: {
              $eq: new ObjectId(userId),
            },
          },
        },
        {
          $lookup: {
            from: "products", // Name of the products collection
            localField: "productId", // Field in cartModel
            foreignField: "_id", // Field in products collection
            as: "products", // Alias for the joined data
          },
        },
      ]);

      let buy_product_item = 0;
      let calculate_price = 0;
      let cart_product_count = 0;
      const outOfStockProduct = cart_products.filter((item) => {
        return item.products[0].stock < item.quantity;
      });
      for (let i = 0; i < outOfStockProduct.length; i++) {
        cart_product_count = cart_product_count + outOfStockProduct[i].quantity;
      }
      const stockProduct = cart_products.filter((item) => {
        return item.products[0].stock >= item.quantity;
      });
      for (let i = 0; i < stockProduct.length; i++) {
        const { quantity } = stockProduct[i];
        cart_product_count = cart_product_count + quantity;
        buy_product_item = buy_product_item + quantity;
        const { discount, price } = stockProduct[i].products[0];
        if (discount !== 0) {
          calculate_price =
            calculate_price + quantity * (price - price * (discount / 100));
        } else {
          calculate_price = calculate_price + quantity * price;
        }
      }
      calculate_price = parseFloat(calculate_price.toFixed(2));

      console.log(calculate_price);
    } catch (error) {}
  };
  // End of get_cart_products method
}

// Export instance of cartControllers for use in routes
module.exports = new cartControllers();

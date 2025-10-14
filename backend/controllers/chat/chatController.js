// Import the seller model for database operations
const sellerModel = require("../../models/sellerModel");
// Import the customer model for database operations
const customerModel = require("../../models/customerModel");
// Import the seller-customer relationship model for chat functionality
const sellerCustomerModel = require("../../models/chat/sellerCustomerModel");
// Import custom response utility for consistent API responses
const { responseReturn } = require("../../utils/response");

// Define the ChatController class to handle chat-related operations
class ChatController {
  /**
   * Handles establishing a chat relationship between a customer and a seller.
   * This method creates bidirectional friend connections in the chat system,
   * allowing both the customer and seller to communicate with each other.
   * It checks for existing relationships to prevent duplicates and updates
   * both parties' friend lists if the relationship doesn't already exist.
   *
   * @param {Object} req - Express request object, expects body:
   *   - sellerId: ID of the seller to establish chat relationship with (string)
   *   - userId: ID of the customer initiating the chat (string)
   * @param {Object} res - Express response object
   */
  async add_customer_friend(req, res) {
    // Extract seller and customer IDs from request body
    const { sellerId, userId } = req.body;

    try {
      // Check if sellerId is provided and not empty
      if (sellerId !== "") {
        // Fetch seller information from database
        const seller = await sellerModel.findById(sellerId);
        // Fetch customer information from database
        const user = await customerModel.findById(userId);

        // Check if the seller is already in the customer's friend list
        // Uses MongoDB $and operator to match both myId (customer) and specific friend
        const checkSeller = await sellerCustomerModel.findOne({
          $and: [
            {
              myId: {
                $eq: userId, // Match customer's ID
              },
            },
            {
              myFriends: {
                $elemMatch: { fdId: sellerId }, // Check if seller is already a friend
              },
            },
          ],
        });

        // If seller is not in customer's friend list, add them
        if (!checkSeller) {
          await sellerCustomerModel.updateOne(
            {
              myId: userId, // Find customer's record
            },
            {
              $push: {
                myFriends: {
                  fdId: sellerId, // Seller's ID
                  name: seller.shopInfo?.shopName, // Seller's shop name (with optional chaining)
                  image: seller.image, // Seller's profile image
                },
              },
            }
          );
        }

        // Check if the customer is already in the seller's friend list
        // Uses MongoDB $and operator to match both myId (seller) and specific friend
        const checkCustomer = await sellerCustomerModel.findOne({
          $and: [
            {
              myId: {
                $eq: sellerId, // Match seller's ID
              },
            },
            {
              myFriends: {
                $elemMatch: { fdId: userId }, // Check if customer is already a friend
              },
            },
          ],
        });

        // If customer is not in seller's friend list, add them
        if (!checkCustomer) {
          await sellerCustomerModel.updateOne(
            {
              myId: sellerId, // Find seller's record
            },
            {
              $push: {
                myFriends: {
                  fdId: userId, // Customer's ID
                  name: user.name, // Customer's name
                  image: "", // Customer's profile image (empty by default)
                },
              },
            }
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  // End of add_customer_friend method
}

// Export instance of ChatController for use in routes
module.exports = new ChatController();

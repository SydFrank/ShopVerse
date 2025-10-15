const sellerModel = require("../../models/sellerModel");
const customerModel = require("../../models/customerModel");
const sellerCustomerModel = require("../../models/chat/sellerCustomerModel");
const { responseReturn } = require("../../utils/response");
const sellerCustomerMessage = require("../../models/chat/sellerCustomerMessage");

// Define the ChatController class to handle chat-related operations
class ChatController {
  /**
   * Handles establishing a chat relationship between a customer and a seller.
   * This method creates bidirectional friend connections in the chat system,
   * allowing both the customer and seller to communicate with each other.
   * It also retrieves existing chat messages between the parties and returns
   * the customer's friend list with current conversation data.
   *
   * @param {Object} req - Express request object, expects body:
   *   - sellerId: ID of the seller to establish chat relationship with (string, optional)
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

        // Retrieve all messages between the customer and seller
        // Uses MongoDB $or operator to find messages in both directions
        const messages = await sellerCustomerMessage.find({
          $or: [
            {
              // Messages from customer to seller
              $and: [
                {
                  receiverId: {
                    $eq: sellerId, // Seller is the receiver
                  },
                },
                {
                  senderId: { $eq: userId }, // Customer is the sender
                },
              ],
            },
            {
              // Messages from seller to customer
              $and: [
                {
                  receiverId: {
                    $eq: userId, // Customer is the receiver
                  },
                },
                {
                  senderId: { $eq: sellerId }, // Seller is the sender
                },
              ],
            },
          ],
        });

        // Get the customer's complete friends list
        const MyFriends = await sellerCustomerModel.findOne({ myId: userId });

        // Find the specific friend (seller) that the customer is currently chatting with
        const currentFriend = MyFriends.myFriends.find(
          (friend) => friend.fdId === sellerId
        );

        // Return success response with friends list, current friend, and messages
        responseReturn(res, 200, {
          MyFriends: MyFriends.myFriends, // Complete list of customer's friends
          currentFriend, // Details of the seller currently being chatted with
          messages, // All messages between customer and seller
        });
      } else {
        // If no sellerId provided, just return the customer's friends list
        // This is used when loading the chat interface without selecting a specific seller
        const MyFriends = await sellerCustomerModel.findOne({ myId: userId });

        // Return response with only the friends list (no current friend or messages)
        responseReturn(res, 200, {
          MyFriends: MyFriends.myFriends, // Complete list of customer's friends
          messages: [], // Empty messages array since no specific conversation is selected
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  // End of add_customer_friend method
}

// Export instance of ChatController for use in routes
module.exports = new ChatController();

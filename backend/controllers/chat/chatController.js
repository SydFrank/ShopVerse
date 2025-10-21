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
  add_customer_friend = async (req, res) => {
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
  };
  // End of add_customer_friend method

  /**
   * Handles sending a message from a customer to a seller.
   * This method creates a new message entry in the database and updates
   * both the customer's and seller's friend lists to move the current
   * conversation to the top (most recent activity first). This ensures
   * that active conversations appear at the top of the chat list.
   *
   * @param {Object} req - Express request object, expects body:
   *   - userId: ID of the customer sending the message (string)
   *   - text: content of the message being sent (string)
   *   - sellerId: ID of the seller receiving the message (string)
   *   - name: name of the customer sending the message (string)
   * @param {Object} res - Express response object
   */
  send_message_to_seller = async (req, res) => {
    // Extract message details from request body
    const { userId, text, sellerId, name } = req.body;

    try {
      // Create a new message record in the database
      const message = await sellerCustomerMessage.create({
        senderId: userId, // Customer who is sending the message
        senderName: name, // Name of the customer sender
        receiverId: sellerId, // Seller who will receive the message
        message: text, // Message content
      });

      // Update customer's friend list to move this seller to top (most recent conversation)
      // Get the customer's current friend list data
      const data = await sellerCustomerModel.findOne({
        myId: userId,
      });

      // Extract the friends array for manipulation
      let myFriends = data.myFriends;

      // Find the index of the seller in the customer's friend list
      let index = myFriends.findIndex((f) => f.fdId === sellerId);

      // Move the seller to the top of the friend list using bubble sort approach
      // This ensures the most recent conversation appears at the top
      while (index > 0) {
        let temp = myFriends[index]; // Store current friend
        myFriends[index] = myFriends[index - 1]; // Move previous friend down
        myFriends[index - 1] = temp; // Move current friend up
        index--; // Continue moving toward top
      }

      // Update the customer's friend list in the database with new order
      await sellerCustomerModel.updateOne(
        {
          myId: userId,
        },
        {
          myFriends, // Updated friend list with seller moved to top
        }
      );

      // Update seller's friend list to move this customer to top (most recent conversation)
      // Get the seller's current friend list data
      const data1 = await sellerCustomerModel.findOne({
        myId: sellerId,
      });

      // Extract the friends array for manipulation
      let myFriends1 = data1.myFriends;

      // Find the index of the customer in the seller's friend list
      let index1 = myFriends1.findIndex((f) => f.fdId === userId);

      // Move the customer to the top of the seller's friend list using bubble sort approach
      // This ensures the most recent conversation appears at the top for both parties
      while (index1 > 0) {
        let temp1 = myFriends1[index1]; // Store current friend
        myFriends1[index1] = myFriends1[index1 - 1]; // Move previous friend down
        myFriends1[index1 - 1] = temp1; // Move current friend up
        index1--; // Continue moving toward top
      }

      // Update the seller's friend list in the database with new order
      await sellerCustomerModel.updateOne(
        {
          myId: sellerId,
        },
        {
          myFriends: myFriends1, // Updated friend list with customer moved to top
        }
      );

      // Return success response with the created message
      responseReturn(res, 201, { message });
    } catch (error) {
      console.log(error);
    }
  };
  // End of send_message_to_seller method

  /**
   * Handles retrieving all customers that have chat relationships with a specific seller.
   * This method fetches the seller's friend list which contains all customers
   * who have initiated conversations with the seller. Used to display the
   * seller's chat list showing all customers they can communicate with.
   *
   * @param {Object} req - Express request object, expects params:
   *   - sellerId: ID of the seller whose customer list to retrieve (string)
   * @param {Object} res - Express response object
   */
  get_customers = async (req, res) => {
    // Extract seller ID from request parameters
    const { sellerId } = req.params;

    try {
      // Find the seller's chat relationship record containing their friend list
      const data = await sellerCustomerModel.findOne({ myId: sellerId });

      // Return the seller's customer friend list
      responseReturn(res, 200, {
        customers: data.myFriends, // Array of customers who have chat relationships with this seller
      });
    } catch (error) {
      console.log(error);
    }
  };
  // End of get_customers method

  /**
   * Handles retrieving messages between a seller and a specific customer.
   * This method fetches all chat messages exchanged between a seller and
   * a particular customer, along with the customer's information. Used when
   * a seller clicks on a customer in their chat list to view the conversation
   * history and customer details.
   *
   * @param {Object} req - Express request object, expects:
   *   - params.customerId: ID of the customer whose messages to retrieve (string)
   *   - id: ID of the seller (from authentication middleware) (string)
   * @param {Object} res - Express response object
   */
  get_customers_seller_message = async (req, res) => {
    // Extract customer ID from request parameters
    const { customerId } = req.params;
    // Extract seller ID from authenticated request (set by auth middleware)
    const { id } = req;

    try {
      // Retrieve all messages between the seller and specific customer
      // Uses MongoDB $or operator to find messages in both directions
      const messages = await sellerCustomerMessage.find({
        $or: [
          {
            // Messages from seller to customer
            $and: [
              {
                receiverId: {
                  $eq: customerId, // Customer is the receiver
                },
              },
              {
                senderId: { $eq: id }, // Seller is the sender
              },
            ],
          },
          {
            // Messages from customer to seller
            $and: [
              {
                receiverId: {
                  $eq: id, // Seller is the receiver
                },
              },
              {
                senderId: { $eq: customerId }, // Customer is the sender
              },
            ],
          },
        ],
      });

      // Get customer information for display in chat interface
      const currentCustomer = await customerModel.findById(customerId);

      // Return the conversation messages and customer details
      responseReturn(res, 200, {
        currentCustomer, // Customer information (name, profile, etc.)
        messages, // Array of all messages between seller and customer
      });
    } catch (error) {
      console.log(error);
    }
  };
  // End of get_customers_seller_message method
}

// Export instance of ChatController for use in routes
module.exports = new ChatController();

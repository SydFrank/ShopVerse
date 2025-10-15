// Import the required Schema and model constructors from Mongoose
const { Schema, model } = require("mongoose");

// Define the schema for seller-customer chat relationships
const sellerCustomerMsgSchema = new Schema(
  {
    senderName: {
      type: String,
      required: true, // senderName is a required string field
    },
    senderId: {
      type: String,
      required: true, // senderId is a required string field
    },
    receiverId: {
      type: String,
      required: true, // receiverId is a required string field
    },
    message: {
      type: String,
      required: true, // message is a required string field
    },
    status: {
      type: String,
      default: "unseen", // Default value is 'unseen'
    },
  },
  { timestamps: true }
); // Automatically manage createdAt and updatedAt fields

// Export the model based on the defined schema
module.exports = model("seller_customers_msg", sellerCustomerMsgSchema);

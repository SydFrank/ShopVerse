// Import the required Schema and model constructors from Mongoose
const { Schema, model } = require("mongoose");

// Define the schema for admin-seller chat relationships
const adminSellerMsgSchema = new Schema(
  {
    senderName: {
      type: String,
      required: true, // senderName is a required string field
    },
    senderId: {
      type: String,
      default: "", // senderId is an optional string field
    },
    receiverId: {
      type: String,
      default: "", // receiverId is an optional string field
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
module.exports = model("seller_admin_messages", adminSellerMsgSchema);

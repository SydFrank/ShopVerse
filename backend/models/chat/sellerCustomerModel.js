// Import the required Schema and model constructors from Mongoose
const { Schema, model } = require("mongoose");

// Define the schema for the "admins" collection
const sellerCustomerSchema = new Schema(
  {
    myId: {
      type: String,
      required: true, // myId is a required string field
    },
    myFriends: {
      type: Array,
      default: [], // Default value is an empty array
    },
  },
  { timestamps: true }
); // Automatically manage createdAt and updatedAt fields

// Export the model based on the defined schema
// This will create or use the "seller_customers" collection in MongoDB
module.exports = model("seller_customers", sellerCustomerSchema);

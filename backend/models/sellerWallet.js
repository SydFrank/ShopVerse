// Import the required Schema and model constructors from Mongoose
const { Schema, model } = require("mongoose");

// Define the schema for the "sellerWallet" collection
const sellerWalletSchema = new Schema(
  {
    sellerId: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    month: {
      type: Number,
      required: true, // Month for the wallet transaction
    },

    year: {
      type: Number,
      required: true, // Year for the wallet transaction
    },
  },
  { timestamps: true }
); // Enable timestamps to automatically add createdAt and updatedAt fields

// Export the model based on the defined schema
// The model is named "sellerWallets" and uses the sellerWalletSchema
module.exports = model("sellerWallets", sellerWalletSchema);

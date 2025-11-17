// Import the required Schema and model constructors from Mongoose
const { Schema, model } = require("mongoose");

// Define the schema for the "withdrawRequest" collection
const withdrawSchema = new Schema(
  {
    sellerId: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
); // Enable timestamps to automatically add createdAt and updatedAt fields

// Export the model based on the defined schema
// The model is named "withdrawRequest" and uses the withdrawSchema
module.exports = model("withdrawRequest", withdrawSchema);

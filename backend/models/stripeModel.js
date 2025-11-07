// Import the required Schema and model constructors from Mongoose
const { Schema, model } = require("mongoose");

// Define the schema for the "stripes" collection
const stripeSchema = new Schema(
  {
    sellerId: {
      type: Schema.ObjectId,
      required: true, // Reference to the seller's user ID
    },

    stripeId: {
      type: String,
      required: true, // Stripe account identifier
    },

    code: {
      type: String,
      required: true, // Authorization code for Stripe account linking
    },
  },
  { timestamps: true }
); // Enable timestamps to automatically add createdAt and updatedAt fields

// Export the model based on the defined schema
// The model is named "stripes" and uses the stripeSchema
module.exports = model("stripes", stripeSchema);

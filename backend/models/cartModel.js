// Import the required Schema and model constructors from Mongoose
const { Schema, model } = require("mongoose");

// Define the schema for cart products
const cartSchema = new Schema(
  {
    userId: {
      type: Schema.ObjectId, // Reference to the User model
      required: true,
    },
    productId: {
      type: Schema.ObjectId, // Reference to the Product model
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Export the model based on the defined schema
// This will create or use the "carts" collection in MongoDB
module.exports = model("cartProducts", cartSchema);

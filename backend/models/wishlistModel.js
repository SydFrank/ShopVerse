// Import the required Schema and model constructors from Mongoose
const { Schema, model } = require("mongoose");

// Define the schema for the "wishlist" collection
const wishlistSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Export the model based on the defined schema
// This will create or use the "wishlist" collection in MongoDB
module.exports = model("wishlist", wishlistSchema);

// Import the required Schema and model constructors from Mongoose
const { Schema, model } = require("mongoose");

// Define the schema for product reviews
const reviewSchema = new Schema(
  {
    productId: {
      type: Schema.ObjectId, // Reference to the Product model
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    review: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Export the model based on the defined schema
// This will create or use the "reviews" collection in MongoDB
module.exports = model("reviews", reviewSchema);

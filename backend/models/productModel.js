// Import the required Schema and model constructors from Mongoose
const { Schema, model } = require("mongoose");

// Define the schema for the "product" collection
const productSchema = new Schema(
  {
    sellerId: {
      type: Schema.ObjectId,
      required: true, // Seller ID is a required string field
    },
    name: {
      type: String,
      required: true, // Name is a required string field
    },
    slug: {
      type: String,
      required: true, // Slug is a required string field
    },
    category: {
      type: String,
      required: true, // Name is a required string field
    },
    brand: {
      type: String,
      required: true, // Brand is a required string field
    },
    price: {
      type: Number,
      required: true, // Price is a required number field
    },
    stock: {
      type: Number,
      required: true, // Stock is a required number field
    },
    discount: {
      type: Number,
      required: true, // Discount is a required number field
    },
    description: {
      type: String,
      required: true, // Description is a required string field
    },
    shopName: {
      type: String,
      required: true, // Shop Name is a required string field
    },
    images: {
      type: Array,
      required: true, // Images are a required array field
    },
    rating: {
      type: Number,
      default: 0, // Default rating is 0
    },
  },
  { timestamps: true }
); // Automatically manage createdAt and updatedAt fields

// Create a text index on the name field for search functionality
productSchema.index(
  {
    name: "text",
    category: "text",
    brand: "text",
    description: "text",
  },
  {
    weights: {
      name: 5, // Higher weight for name field
      category: 4, // Medium weight for category field
      brand: 3, // Lower weight for brand field
      description: 2, // Lowest weight for description field
    },
  }
);

// Export the model based on the defined schema
// This will create or use the "products" collection in MongoDB
module.exports = model("products", productSchema);

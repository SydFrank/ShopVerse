// Import the required Schema and model constructors from Mongoose
const { Schema, model } = require("mongoose");

// Define the schema for the "category" collection
const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true, // Name is a required string field
    },
    image: {
      type: String,
      required: true, // Image is a required string field
    },
    slug: {
      type: String,
      required: true, // Slug is a required string field
    },
  },
  { timestamps: true }
); // Automatically manage createdAt and updatedAt fields

categorySchema.index({ name: "text" }); // Create a text index on the name field for search functionality

// Export the model based on the defined schema
// This will create or use the "categorys" collection in MongoDB
module.exports = model("categorys", categorySchema);

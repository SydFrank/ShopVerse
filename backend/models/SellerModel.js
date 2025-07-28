// Import the required Schema and model constructors from Mongoose
const { Schema, model } = require("mongoose");

// Define the schema for the "sellers" collection
const sellerSchema = new Schema(
  {
    name: {
      type: String,
      required: true, // Name is a required string field
    },
    email: {
      type: String,
      required: true, // Email is required and should be unique for each
    },
    password: {
      type: String,
      required: true, // Password is required and typically stored as a hashed string
      select: false, // Exclude password from queries by default; use .select("+password") to include it
    },
    role: {
      type: String,
      default: "seller", // Default role is 'seller'; allows for future role extension (e.g., 'superadmin')
    },
    status: {
      type: String,
      default: "pending", // Default status is 'pending'; can be used to manage user states
    },
    payment: {
      type: String,
      default: "inactive", // Default status is 'inactive'; can be used to manage user states
    },
    method: {
      type: String,
      required: true, // Method is required; can be used to specify payment or registration method
    },
    image: {
      type: String,
      default: "", // Default status is ''; can be used to manage user states
    },
    shopInfo: {
      type: Object,
      default: {}, // Default status is {}; can be used to manage user states
    },
  },
  { timestamps: true }
); // Enable timestamps to automatically add createdAt and updatedAt fields

// Export the model based on the defined schema
// This will create or use the "sellers" collection in MongoDB
module.exports = model("sellers", sellerSchema);

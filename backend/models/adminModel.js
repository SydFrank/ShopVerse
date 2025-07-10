// Import the required Schema and model constructors from Mongoose
const { Schema, model } = require("mongoose");

// Define the schema for the "admins" collection
const adminSchema = new Schema({
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
  },
  image: {
    type: String,
    required: true, // URL or path to the admin's profile image
  },
  role: {
    type: String,
    default: "admin", // Default role is 'admin'; allows for future role extension (e.g., 'superadmin')
  },
});

// Export the model based on the defined schema
// This will create or use the "admins" collection in MongoDB
module.exports = model("admins", adminSchema);

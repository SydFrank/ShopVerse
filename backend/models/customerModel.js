// Import the required Schema and model constructors from Mongoose
const { Schema, model } = require("mongoose");

// Define the schema for the "customers" collection
const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: true, // Name is a required string field
    },
    email: {
      type: String,
      required: true, // Email is required and should be unique for each customer
    },
    password: {
      type: String,
      required: true, // Password is required and typically stored as a hashed string
      select: false, // Exclude password from query results by default
    },
    method: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Export the model based on the defined schema
// This will create or use the "customers" collection in MongoDB
module.exports = model("customers", customerSchema);

// Import the required Schema and model constructors from Mongoose
const { Schema, model } = require("mongoose");

// Define the schema for the "authorOrders" collection
const authSchema = new Schema(
  {
    orderId: {
      type: Schema.ObjectId,
      required: true, // Reference to the user placing the order
    },

    sellerId: {
      type: Schema.ObjectId,
      required: true, // Array of seller IDs involved in the order
    },

    products: {
      type: Array,
      required: true, // Array of products included in the order
    },

    price: {
      type: Number,
      required: true, // Total price of the order
    },

    payment_status: {
      type: String,
      required: true, // Payment status (e.g., 'paid', 'pending')
    },

    shippingInfo: {
      type: Object,
      required: true, // Shipping information for the order
    },

    delivery_status: {
      type: String,
      required: true, // Delivery status (e.g., 'shipped', 'delivered')
    },

    date: {
      type: String,
      required: true, // Date when the order was placed
    },
  },
  { timestamps: true }
); // Enable timestamps to automatically add createdAt and updatedAt fields

// Export the model based on the defined schema
// This will create or use the "customerOrders" collection in MongoDB
module.exports = model("authorOrders", authSchema);

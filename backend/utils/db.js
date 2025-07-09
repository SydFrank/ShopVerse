// Import the Mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// An asynchronous function to establish a connection to the MongoDB database
const dbConnect = async () => {
  try {
    // Attempt to connect to the MongoDB database using the URL from environment variables
    await mongoose.connect(
      process.env.DB_URL,
      // Use the new URL string parser instead of the deprecated one
      {
        useNewUrlParser: true,
      }
    );
    console.log("Database connected....");
  } catch (error) {
    console.log(error.message);
  }
};

// Export the dbConnect function for external use
module.exports = { dbConnect };

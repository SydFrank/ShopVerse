// Import the Mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// An asynchronous function to establish a connection to the MongoDB database
const dbConnect = async () => {
  try {
    if (process.env.mode === "pro") {
      await mongoose.connect(process.env.DB_PRO_URL, {
        useNewUrlParser: true, // Use the new URL parser to avoid deprecation warnings
      });
      console.log("Production database connected successfully");
    } else {
      await mongoose.connect(process.env.DB_LOCAL_URL, {
        useNewUrlParser: true, // Use the new URL parser to avoid deprecation warnings
      });
      console.log("Local database connected successfully");
    }
  } catch (error) {
    console.log(error.message);
  }
};

// Export the dbConnect function for external use
module.exports = { dbConnect };

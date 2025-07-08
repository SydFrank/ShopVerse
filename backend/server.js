// Import the Express framework to create the server
const express = require("express");

// Create an instance of the Express application
const app = express();

// Load environment variables from a .env file into process.env
require("dotenv").config();

// Retrieve the port number from environment variables
const port = process.env.PORT;

// Define a GET route handler for the root path '/'
// Sends a simple response message to the client
app.get("/", (req, res) => res.send("My backend "));

// Start the server and have it listen on the specified port
// Log a message to the console once the server is running
app.listen(port, () => console.log(`Server is running on port ${port}`));

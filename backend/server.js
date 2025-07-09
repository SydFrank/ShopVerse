// Import the Express framework to create the server
const express = require("express");

// Create an instance of the Express application
const app = express();

// Load environment variables from a .env file into process.env
require("dotenv").config();

// Import middleware for cross-origin requests, JSON parsing, and cookie handling
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

/**
 * Enable Cross-Origin Resource Sharing (CORS) for the specified frontend origin
 * Allow credentials such as cookies and authorization headers to be included in requests
 */
app.use(
  cors({
    origin: ["http://localhost:5173"], // Frontend development server origin
    credentials: true, // Required for sending cookies across domains
  })
);

// Parse incoming JSON payloads and populate req.body
app.use(bodyParser.json());

// Parse cookies from incoming requests and populate req.cookies
app.use(cookieParser());

// Mount the authentication routes at the '/api' path
app.use("/api", require("./routes/authRoutes"));

// Define a GET route handler for the root path '/'
// Sends a simple response message to the client
app.get("/", (req, res) => res.send("My backend "));

// Retrieve the port number from environment variables
const port = process.env.PORT;

// Start the server and have it listen on the specified port
// Log a message to the console once the server is running
app.listen(port, () => console.log(`Server is running on port ${port}`));

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

// Import the database connection utility
const { dbConnect } = require("./utils/db");

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
// Must be registered before any route handlers that need to access req.body
app.use(bodyParser.json());

// Parse cookies from incoming requests and populate req.cookies
app.use(cookieParser());

// Mount the authentication routes at the '/api' path
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/dashboard/CategoryRoutes"));
app.use("/api", require("./routes/dashboard/ProductRoutes"));
app.use("/api", require("./routes/dashboard/SellerRoutes"));

app.use("/api/home", require("./routes/home/homeRoutes"));

// Define a GET route handler for the root path '/'
// Sends a simple response message to the client to verify that the server is running
app.get("/", (req, res) => res.send("My backend is running"));

// Retrieve the port number from environment variables
const port = process.env.PORT;

// Establish a connection to the MongoDB database
// This should ideally be done before the server starts listening
dbConnect();

// Start the server and have it listen on the specified port
// Log a message to the console once the server is running
app.listen(port, () => console.log(`Server is running on port ${port}`));

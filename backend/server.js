// Import the Express framework to create the server
const express = require("express");

// Create an instance of the Express application
const app = express();

// Import middleware for cross-origin requests, JSON parsing, and cookie handling
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Import the database connection utility
const { dbConnect } = require("./utils/db");

// Import Socket.IO for real-time communication
const socket = require("socket.io");
// Import the built-in HTTP module to create an HTTP server
const http = require("http");
// Create an HTTP server using the Express app
const server = http.createServer(app);

// Load environment variables from a .env file into process.env
require("dotenv").config();

/**
 * Enable Cross-Origin Resource Sharing (CORS) for the specified frontend origin
 * Allow credentials such as cookies and authorization headers to be included in requests
 */
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Frontend development server origin
    credentials: true, // Required for sending cookies across domains
  })
);

// Initialize a Socket.IO server instance, allowing connections from any origin
const io = socket(server, {
  cors: {
    origin: "*", // Allow connections from any origin
  },
  credentials: true, // Allow credentials to be sent
});

// Array to store all connected customers with their socket information
var allCustomer = [];
// Array to store all connected sellers with their socket information
var allSeller = [];

/**
 * Adds a new user to the connected customers array.
 * Checks if the customer is already connected to prevent duplicates.
 *
 * @param {string} customerId - Unique identifier for the customer
 * @param {string} socketId - Socket.IO connection ID
 * @param {Object} userInfo - Additional user information
 */
const addUser = (customerId, socketId, userInfo) => {
  // Check if customer is already in the connected users array
  const checkUser = allCustomer.some((u) => u.customerId === customerId);

  if (!checkUser) {
    // Add new customer to the connected users array
    allCustomer.push({ customerId, socketId, userInfo });
  }
};

/**
 * Adds a new seller to the connected sellers array.
 * Checks if the seller is already connected to prevent duplicates.
 *
 * @param {string} sellerId - Unique identifier for the seller
 * @param {string} socketId - Socket.IO connection ID
 * @param {Object} userInfo - Additional user information
 */
const addSeller = (sellerId, socketId, userInfo) => {
  // Check if seller is already in the connected users array
  const checkSeller = allSeller.some((u) => u.sellerId === sellerId);

  if (!checkSeller) {
    // Add new seller to the connected users array
    allSeller.push({ sellerId, socketId, userInfo });
  }
};

/**
 * Finds a customer in the connected customers array.
 *
 * @param {string} customerId - Unique identifier for the customer
 * @returns {Object|undefined} - The customer object if found, otherwise undefined
 */
const findCustomer = (customerId) => {
  return allCustomer.find((u) => u.customerId === customerId);
};

// Listen for incoming Socket.IO connections
io.on("connection", (soc) => {
  // Log when a new socket connection is established
  console.log("socket server running");

  /**
   * Handle 'add_user' event when a customer connects
   * Adds the customer to the active users list for real-time communication
   */
  soc.on("add_user", (customerId, userInfo) => {
    // Add the connected user to the active customers array
    addUser(customerId, soc.id, userInfo);
    // Log current connected customers for debugging
    // console.log(allCustomer);
  });

  /**
   * Handle 'add_seller' event when a seller connects
   * Adds the seller to the active users list for real-time communication
   */
  soc.on("add_seller", (sellerId, userInfo) => {
    addSeller(sellerId, soc.id, userInfo);
  });

  /* Handle 'send_customer_message' event when a customer sends a message to a seller */
  soc.on("send_seller_message", (msg) => {
    const customer = findCustomer(msg.receiverId);
    if (customer !== undefined) {
      socket.to(customer.socketId).emit("seller_message", msg);
    }
  });
});

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

app.use("/api", require("./routes/home/customerAuthRoutes"));
app.use("/api", require("./routes/home/cartRoutes"));
app.use("/api", require("./routes/order/orderRoutes"));
app.use("/api", require("./routes/chatRoutes"));

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
// app.listen(port, () => console.log(`Server is running on port ${port}`));

// Start the HTTP server with Socket.IO support and have it listen on the specified port
// Log a message to the console once the server is running
// Note: Using server.listen() instead of app.listen() to support Socket.IO
server.listen(port, () => console.log(`Server is running on port ${port}`));

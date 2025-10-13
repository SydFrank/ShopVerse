const ChatController = require("../controllers/chat/chatController");
const { authMiddleware } = require("../middlewares/authMiddleware");

// Create a new Express Router instance to define route handlers
const router = require("express").Router();

// Define a POST route at '/admin-login' that uses the admin_login method from authControllers
router.post(
  "/chat/customer/add-customer-friend",
  ChatController.add_customer_friend
);

// Export the router to be used in the main server application
module.exports = router;

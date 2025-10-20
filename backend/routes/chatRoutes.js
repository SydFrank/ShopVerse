const ChatController = require("../controllers/chat/chatController");
const { authMiddleware } = require("../middlewares/authMiddleware");

// Create a new Express Router instance to define route handlers
const router = require("express").Router();

router.post(
  "/chat/customer/add-customer-friend",
  ChatController.add_customer_friend
);

router.post(
  "/chat/customer/send-message-to-seller",
  ChatController.send_message_to_seller
);

router.get(
  "/chat/seller/get-customers/:sellerId",
  ChatController.get_customers
);
// Export the router to be used in the main server application
module.exports = router;

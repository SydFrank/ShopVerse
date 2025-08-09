// Import the authentication controller module
const sellerController = require("../../controllers/dashboard/sellerController");
const { authMiddleware } = require("../../middlewares/authMiddleware");

// Create a new Express Router instance to define route handlers
const router = require("express").Router();

// Define a GET route at '/request-seller-get' that uses the add_Category method from categoryController
router.get(
  "/request-seller-get",
  authMiddleware,
  sellerController.request_seller_get
);

// Export the router to be used in the main server application
module.exports = router;

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

// Define a GET route at '/get-seller/:sellerId' that uses the add_Category method from categoryController
router.get(
  "/get-seller/:sellerId",
  authMiddleware,
  sellerController.get_seller
);

// Define a POST route at '/seller-status-update' that uses the sellerController.update_seller_status method
router.post(
  "/seller-status-update",
  authMiddleware,
  sellerController.seller_status_update
);

// Export the router to be used in the main server application
module.exports = router;

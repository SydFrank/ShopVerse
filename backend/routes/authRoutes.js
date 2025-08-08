// Import the authentication controller module
const authControllers = require("../controllers/authControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");

// Create a new Express Router instance to define route handlers
const router = require("express").Router();

// Define a POST route at '/admin-login' that uses the admin_login method from authControllers
router.post("/admin-login", authControllers.admin_login);

// Define a GET route at '/get-user' that uses the authMiddleware for authentication
router.get("/get-user", authMiddleware, authControllers.get_user);

// Define a POST route at '/seller-register' that uses the seller_register method from authControllers
router.post("/seller-register", authControllers.seller_register);

// Define a POST route at '/seller-login' that uses the seller_login method from authControllers
router.post("/seller-login", authControllers.seller_login);

// Define a POST route at '/profile-image-upload' that uses the authMiddleware for authentication
router.post(
  "/profile-image-upload",
  authMiddleware,
  authControllers.profile_image_upload
);

// Export the router to be used in the main server application
module.exports = router;

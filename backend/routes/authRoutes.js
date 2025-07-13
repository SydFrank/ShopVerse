// Import the authentication controller module
const authControllers = require("../controllers/authControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");

// Create a new Express Router instance to define route handlers
const router = require("express").Router();

// Define a POST route at '/admin-login' that uses the admin_login method from authControllers
router.post("/admin-login", authControllers.admin_login);

// Define a GET route at '/get-user' that uses the authMiddleware for authentication
router.get("/get-user", authMiddleware, authControllers.get_user);
// Export the router to be used in the main server application
module.exports = router;

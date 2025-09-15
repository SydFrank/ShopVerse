const cartControllers = require("../../controllers/home/cartController");
// Create a new Express Router instance to define route handlers
const router = require("express").Router();

// Define route handlers using the home controller
router.post("/home/product/add-to-cart", cartControllers.add_to_cart);

// Export the router to be used in the main server application
module.exports = router;

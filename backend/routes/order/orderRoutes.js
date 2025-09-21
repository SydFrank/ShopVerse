const orderControllers = require("../../controllers/order/orderController");
// Create a new Express Router instance to define route handlers
const router = require("express").Router();

// Define route handlers using the home controller
router.post("/home/order/place-order", orderControllers.place_order);

// Export the router to be used in the main server application
module.exports = router;

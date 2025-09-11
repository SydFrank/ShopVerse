const customerAuthControllers = require("../../controllers/home/customerAuthController");
// Create a new Express Router instance to define route handlers
const router = require("express").Router();

// Define route handlers using the home controller
router.post(
  "/customer/customer-register",
  customerAuthControllers.customer_register
);

router.post("/customer/customer-login", customerAuthControllers.customer_login);

// Export the router to be used in the main server application
module.exports = router;

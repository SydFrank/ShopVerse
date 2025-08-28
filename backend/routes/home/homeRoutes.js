// Import the home controller module
const homeControllers = require("../../controllers/home/homeController");

// Create a new Express Router instance to define route handlers
const router = require("express").Router();

// Define route handlers using the home controller
router.get("/get-categorys", homeControllers.get_categorys);

// Export the router to be used in the main server application
module.exports = router;

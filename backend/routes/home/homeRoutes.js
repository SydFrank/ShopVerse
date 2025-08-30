// Import the home controller module
const homeControllers = require("../../controllers/home/homeController");

// Create a new Express Router instance to define route handlers
const router = require("express").Router();

// Define route handlers using the home controller
router.get("/get-categorys", homeControllers.get_categorys);
router.get("/get-products", homeControllers.get_products);
router.get(
  "/price-range-latest-product",
  homeControllers.price_range_latest_product
);

// Export the router to be used in the main server application
module.exports = router;

// Import the authentication controller module
const productController = require("../../controllers/dashboard/productController");
const { authMiddleware } = require("../../middlewares/authMiddleware");

// Create a new Express Router instance to define route handlers
const router = require("express").Router();

// Define a POST route at '/product-add' that uses the add_Product method from productController
router.post("/product-add", authMiddleware, productController.add_product);
// Define a GET route at '/product-get' that uses the products_get method from productController
router.get("/product-get", authMiddleware, productController.products_get);

// Export the router to be used in the main server application
module.exports = router;

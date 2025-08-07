// Import the authentication controller module
const productController = require("../../controllers/dashboard/productController");
const { authMiddleware } = require("../../middlewares/authMiddleware");

// Create a new Express Router instance to define route handlers
const router = require("express").Router();

// Define a POST route at '/product-add' that uses the add_Product method from productController
router.post("/product-add", authMiddleware, productController.add_product);

// Define a GET route at '/products-get' that uses the products_get method from productController
router.get("/products-get", authMiddleware, productController.products_get);

// Define a GET route at '/product-get/:productId' that uses the product_get method from productController
// The ':productId' part of the URL is a route parameter that will be passed to the method
router.get(
  "/product-get/:productId",
  authMiddleware,
  productController.product_get
);

// Define a POST route at '/product-update' that uses the update_Product method from productController
router.post(
  "/product-update",
  authMiddleware,
  productController.product_update
);

// Define a POST route at '/product-update' that uses the update_Product method from productController
router.post(
  "/product-update",
  authMiddleware,
  productController.product_update
);

// Define a POST route at '/product-image-update' that uses the product_image_update method from productController
router.post(
  "/product-image-update",
  authMiddleware,
  productController.product_image_update
);

// Export the router to be used in the main server application
module.exports = router;

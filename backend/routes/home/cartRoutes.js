const cartControllers = require("../../controllers/home/cartController");
// Create a new Express Router instance to define route handlers
const router = require("express").Router();

// Define route handlers using the home controller
router.post("/home/product/add-to-cart", cartControllers.add_to_cart);

router.get(
  "/home/product/get-cart-products/:userId",
  cartControllers.get_cart_products
);

router.delete(
  "/home/product/delete-cart-product/:cart_id",
  cartControllers.delete_cart_product
);

router.put(
  "/home/product/quantity-increment/:cart_id",
  cartControllers.quantity_increment
);

router.put(
  "/home/product/quantity-decrement/:cart_id",
  cartControllers.quantity_decrement
);

router.post("/home/product/add-to-wishlist", cartControllers.add_to_wishlist);

router.get(
  "/home/product/get-wishlist-products/:userId",
  cartControllers.get_wishlist
);

router.delete(
  "/home/product/remove-wishlist-product/:wishlistId",
  cartControllers.remove_wishlist
);

// Export the router to be used in the main server application
module.exports = router;

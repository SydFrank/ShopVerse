const orderControllers = require("../../controllers/order/orderController");
// Create a new Express Router instance to define route handlers
const router = require("express").Router();

// Define route handlers using the home controller
router.post("/home/order/place-order", orderControllers.place_order);
router.get(
  "/home/customer/get-dashboard-data/:userId",
  orderControllers.get_customer_dashboard_data
);

router.get(
  "/home/customer/get-orders/:customerId/:status",
  orderControllers.get_orders
);

router.get(
  "/home/customer/get-orders-details/:orderId",
  orderControllers.get_orders_details
);

// Export the router to be used in the main server application
module.exports = router;

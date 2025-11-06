const orderControllers = require("../../controllers/order/orderController");
// Create a new Express Router instance to define route handlers
const router = require("express").Router();

// Customer
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

// Admin
router.get("/admin/orders", orderControllers.get_admin_orders);
router.get("/admin/order/:orderId", orderControllers.get_admin_order);
router.put(
  "/admin/order-status/update/:orderId",
  orderControllers.admin_order_status_update
);

// Seller

// Export the router to be used in the main server application
module.exports = router;

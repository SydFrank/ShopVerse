const { authMiddleware } = require("../../middlewares/authMiddleware");
const dashboardController = require("../../controllers/dashboard/dashboardController");
// Create a new Express Router instance to define route handlers
const router = require("express").Router();

router.get(
  "/admin/get-dashboard-data",
  authMiddleware,
  dashboardController.get_admin_dashboard_data
);

router.get(
  "/seller/get-dashboard-data",
  authMiddleware,
  dashboardController.get_seller_dashboard_data
);

// Export the router to be used in the main server application
module.exports = router;

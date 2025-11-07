const paymentController = require("../controllers/payment/paymentController");
const { authMiddleware } = require("../middlewares/authMiddleware");
// Create a new Express Router instance to define route handlers
const router = require("express").Router();

router.get(
  "/payment/create-stripe-connect-account",
  authMiddleware,
  paymentController.create_stripe_connect_account
);

router.put(
  "/payment/active-stripe-connect-account/:activeCode",
  authMiddleware,
  paymentController.active_stripe_connect_account
);

// Export the router to be used in the main server application
module.exports = router;

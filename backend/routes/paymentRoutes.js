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

router.get(
  "/payment/seller-payment-details/:sellerId",
  authMiddleware,
  paymentController.get_seller_payment_details
);

router.post(
  "/payment/withdrawal-request",
  authMiddleware,
  paymentController.withdrawal_request
);

router.get(
  "/payment/request",
  authMiddleware,
  paymentController.get_payment_request
);

router.post(
  "/payment/request-confirm",
  authMiddleware,
  paymentController.payment_request_confirm
);
// Export the router to be used in the main server application
module.exports = router;

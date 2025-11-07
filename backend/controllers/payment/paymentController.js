const stripeModel = require("../../models/stripeModel");
const sellerModel = require("../../models/sellerModel");
// UUID library to generate unique identifiers
const { v4: uuidv4 } = require("uuid");
const { responseReturn } = require("../../utils/response");
// Stripe library initialization with secret key
const stripe = require("stripe")(
  "sk_test_51SQZG9QqqlV3jHnTvxEbcBW0Y7aGFjLTf0Ou0BEIfDmWGMAY2afeFKyowvqP83yMQLIilArylgPZlnDlQ7aPDpiN00Izy5VP2g"
);

class paymentController {
  /**
   * Handles creating a Stripe Connect Express account for sellers.
   * This method creates a Stripe Express account that allows sellers to receive
   * payments directly. If a seller already has a Stripe account, it deletes the
   * existing one and creates a new one. Returns an onboarding URL for the seller
   * to complete their account setup with Stripe.
   *
   * @param {Object} req - Express request object, expects:
   *   - id: seller ID (from authentication middleware) (string)
   * @param {Object} res - Express response object
   */
  create_stripe_connect_account = async (req, res) => {
    // Extract seller ID from authenticated request (set by auth middleware)
    const { id } = req;
    // Generate a unique identifier for this account setup process
    const uid = uuidv4();

    try {
      // Check if the seller already has a Stripe account setup
      const stripeInfo = await stripeModel.findOne({ sellerId: id });

      if (stripeInfo) {
        // If seller already has a Stripe account, delete the existing record
        // This allows for re-creation if there were issues with the previous setup
        await stripeModel.deleteOne({ sellerId: id });

        // Create a new Stripe Express account for the seller
        const account = await stripe.accounts.create({
          type: "express", // Express account type for quick onboarding
        });

        // Create an account onboarding link for the seller to complete setup
        const accountLink = await stripe.accountLinks.create({
          account: account.id, // Stripe account ID
          refresh_url: "http://localhost:5174/refresh", // URL if seller needs to refresh
          return_url: `http://localhost:5174/success?activeCode=${uid}`, // Success URL with unique code
          type: "account_onboarding", // Link type for initial setup
        });

        // Store the new Stripe account information in database
        await stripeModel.create({
          sellerId: id, // Seller's ID from our system
          stripeId: account.id, // Stripe account ID
          code: uid, // Unique activation code for verification
        });

        // Return the onboarding URL for the seller to complete setup
        responseReturn(res, 200, { url: accountLink.url });
      } else {
        // If seller doesn't have a Stripe account, create a new one
        // Create a new Stripe Express account for the seller
        const account = await stripe.accounts.create({
          type: "express", // Express account type for quick onboarding
        });

        // Create an account onboarding link for the seller to complete setup
        const accountLink = await stripe.accountLinks.create({
          account: account.id, // Stripe account ID
          refresh_url: "http://localhost:5174/refresh", // URL if seller needs to refresh
          return_url: `http://localhost:5174/success?activeCode=${uid}`, // Success URL with unique code
          type: "account_onboarding", // Link type for initial setup
        });

        // Store the new Stripe account information in database
        await stripeModel.create({
          sellerId: id, // Seller's ID from our system
          stripeId: account.id, // Stripe account ID
          code: uid, // Unique activation code for verification
        });

        // Return the onboarding URL for the seller to complete setup
        responseReturn(res, 200, { url: accountLink.url });
      }
    } catch (error) {
      // Log error message with context for debugging purposes
      console.log("Stripe connect account error " + error.message);
      // Return error response if Stripe account creation fails
      responseReturn(res, 500, { error: "Failed to create Stripe account" });
    }
  };
  // End of create_stripe_connect_account method

  /**
   * Handles activating a seller's Stripe Connect account after onboarding completion.
   * This method is called when a seller completes the Stripe onboarding process
   * and returns to the success URL with an activation code. It verifies the
   * activation code and updates the seller's payment status to "active".
   *
   * @param {Object} req - Express request object, expects:
   *   - params.activeCode: unique activation code from Stripe onboarding (string)
   *   - id: seller ID (from authentication middleware) (string)
   * @param {Object} res - Express response object
   */
  active_stripe_connect_account = async (req, res) => {
    // Extract activation code from URL parameters
    const { activeCode } = req.params;
    // Extract seller ID from authenticated request (set by auth middleware)
    const { id } = req;
    try {
      // Find the Stripe account information using the activation code
      // This verifies that the activation code is valid and matches a pending account
      const userStripeInfo = await stripeModel.findOne({
        code: activeCode,
      });

      if (userStripeInfo) {
        // If activation code is valid, update the seller's payment status to active
        await sellerModel.findByIdAndUpdate(id, {
          payment: "active", // Enable payment functionality for this seller
        });

        // Return success response confirming activation
        responseReturn(res, 200, { message: "Payment Account Activated" });
      } else {
        // Return error response if activation code is invalid or not found
        responseReturn(res, 404, {
          message: "Activation Failed",
        });
      }
    } catch (error) {
      // Return error response if activation process fails
      responseReturn(res, 500, { message: "Internal Server Error" });
    }
  };
  // End of active_stripe_connect_account method
}

module.exports = new paymentController();

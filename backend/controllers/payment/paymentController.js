const stripeModel = require("../../models/stripeModel");
const sellerModel = require("../../models/sellerModel");
const sellerWallet = require("../../models/sellerWallet");
const withdrawRequest = require("../../models/withdrawRequest");

// UUID library to generate unique identifiers
const { v4: uuidv4 } = require("uuid");
const { responseReturn } = require("../../utils/response");
// Stripe library initialization with secret key
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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

  /**
   * Helper method to calculate the sum of amounts from an array of payment/withdrawal objects.
   * This utility function iterates through an array of financial records and sums up
   * the 'amount' field from each record. Used for calculating totals across multiple
   * payment or withdrawal transactions.
   *
   * @param {Array} data - Array of objects containing 'amount' field (payment/withdrawal records)
   * @returns {number} Total sum of all amounts in the array
   */
  sumAmount = (data) => {
    let sum = 0;
    // Iterate through each record and add its amount to the total
    for (let i = 0; i < data.length; i++) {
      sum = sum + data[i].amount;
    }
    return sum;
  };

  /**
   * Handles retrieving comprehensive payment details for a specific seller.
   * This method calculates and returns the seller's financial overview including
   * total earnings, pending withdrawals, successful withdrawals, and available balance.
   * Used for seller payment dashboard to show complete financial status and history.
   *
   * @param {Object} req - Express request object, expects params:
   *   - sellerId: ID of the seller whose payment details to retrieve (string)
   * @param {Object} res - Express response object
   */
  get_seller_payment_details = async (req, res) => {
    // Extract seller ID from request parameters
    const { sellerId } = req.params;

    try {
      // Fetch all payment records (earnings) for this seller
      // This includes all money earned from completed orders
      const payments = await sellerWallet.find({ sellerId });

      // Fetch all pending withdrawal requests for this seller
      // These are withdrawal requests that haven't been processed yet
      const pendingWithdrawals = await withdrawRequest.find({
        $and: [
          {
            sellerId: {
              $eq: sellerId, // Match seller ID
            },
          },
          {
            status: {
              $eq: "pending", // Only pending withdrawal requests
            },
          },
        ],
      });

      // Fetch all successful withdrawal requests for this seller
      // These are withdrawal requests that have been completed and paid out
      const successWithdrawals = await withdrawRequest.find({
        $and: [
          {
            sellerId: {
              $eq: sellerId, // Match seller ID
            },
          },
          {
            status: {
              $eq: "success", // Only successful withdrawal requests
            },
          },
        ],
      });

      // Calculate financial totals using the helper method
      const pendingAmount = this.sumAmount(pendingWithdrawals); // Total amount in pending withdrawals
      const withdrawalAmount = this.sumAmount(successWithdrawals); // Total amount successfully withdrawn
      const totalAmount = this.sumAmount(payments); // Total amount earned from sales

      // Calculate available balance for withdrawal
      let availableAmount = 0;

      if (totalAmount > 0) {
        // Available amount = Total earnings - (Pending withdrawals + Already withdrawn)
        // This ensures sellers can't withdraw more than they've earned
        availableAmount = totalAmount - (pendingAmount + withdrawalAmount);
      }

      // Return comprehensive payment details and transaction history
      responseReturn(res, 200, {
        totalAmount, // Total earnings from all sales
        pendingAmount, // Amount currently pending withdrawal
        withdrawalAmount, // Amount already successfully withdrawn
        availableAmount, // Amount available for new withdrawal requests
        pendingWithdrawals, // Array of pending withdrawal requests with details
        successWithdrawals, // Array of successful withdrawal requests with details
      });
    } catch (error) {
      // Log error message for debugging purposes
      console.log("Get seller payment details error " + error.message);
    }
  };
  // End of get_seller_payment_details method

  /**
   * Handles creating a withdrawal request for a seller.
   * This method allows a seller to request a withdrawal of funds from their available balance.
   * It creates a new withdrawal request record in the database with the specified amount
   * and marks it as "pending" for further processing by the admin or payment system.
   * @param {Object} req - Express request object, expects:
   *   - body.amount: amount to withdraw (number)
   *   - body.sellerId: ID of the seller making the request (string)
   * @param {Object} res - Express response object
   */
  withdrawal_request = async (req, res) => {
    const { amount, sellerId } = req.body;
    try {
      const withdrawal = await withdrawRequest.create({
        sellerId,
        amount: parseInt(amount),
      });
      responseReturn(res, 200, {
        withdrawal,
        message: "Withdrawal Request Submitted",
      });
    } catch (error) {
      responseReturn(res, 500, {
        message: "Internal Server Error",
      });
    }
  };
  // End of withdrawal_request method

  /**
   * Handles retrieving all pending payment withdrawal requests.
   * This method fetches and returns all withdrawal requests that are currently pending.
   * Used for admin or payment processing to review and manage withdrawal requests.
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  get_payment_request = async (req, res) => {
    try {
      const requests = await withdrawRequest.find({ status: "pending" });
      responseReturn(res, 200, { requests });
    } catch (error) {
      responseReturn(res, 500, {
        message: "Internal Server Error",
      });
    }
  };
  // End of get_payment_request method
}

module.exports = new paymentController();

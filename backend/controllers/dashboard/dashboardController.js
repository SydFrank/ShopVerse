// Import custom response utility for consistent API responses
const { responseReturn } = require("../../utils/response");
const myShopWallet = require("../../models/myShopWallet");
const productModel = require("../../models/productModel");
const customerOrder = require("../../models/customerOrder");
const sellerModel = require("../../models/sellerModel");
const adminSellerMessage = require("../../models/chat/adminSellerMessage");

class dashboardController {
  /**
   * Handles retrieving comprehensive dashboard statistics for admin view.
   * This method aggregates key platform metrics including total sales revenue,
   * product count, order count, seller count, recent messages, and recent orders.
   * Used to populate the admin dashboard with overview statistics and recent activity.
   *
   * @param {Object} req - Express request object, expects:
   *   - id: admin ID (from authentication middleware) (string)
   * @param {Object} res - Express response object
   */
  get_admin_dashboard_data = async (req, res) => {
    // Extract admin ID from authenticated request (set by auth middleware)
    const { id } = req;

    try {
      // Calculate total sales revenue across the entire platform using aggregation
      // This sums up all amounts in the platform wallet (myShopWallet collection)
      const totalSale = await myShopWallet.aggregate([
        {
          // Group all wallet entries together and sum their amounts
          $group: {
            _id: null, // Group all documents together (no grouping criteria)
            totalAmount: { $sum: "$amount" }, // Sum all 'amount' fields to get total revenue
          },
        },
      ]);

      // Count total number of products across all sellers in the platform
      const totalProduct = await productModel.find({}).countDocuments();

      // Count total number of orders placed by all customers
      const totalOrder = await customerOrder.find({}).countDocuments();

      // Count total number of registered sellers on the platform
      const totalSeller = await sellerModel.find({}).countDocuments();

      // Fetch the 3 most recent messages between admin and sellers
      // Used to display recent communication in the admin dashboard
      const messages = await adminSellerMessage.find({}).limit(3);

      // Fetch the 5 most recent customer orders for quick overview
      // Helps admin monitor latest order activity
      const recentOrders = await customerOrder.find({}).limit(5);

      // Return all dashboard statistics and recent activity data
      responseReturn(res, 200, {
        totalProduct, // Total number of products on platform
        totalOrder, // Total number of orders placed
        totalSeller, // Total number of registered sellers
        messages, // 3 most recent admin-seller messages
        recentOrders, // 5 most recent customer orders
        totalSale: totalSale.length > 0 ? totalSale[0].totalAmount : 0, // Total sales revenue (0 if no sales)
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  // End of get_admin_dashboard_data method
}

module.exports = new dashboardController();

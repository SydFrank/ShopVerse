// Import custom response utility for consistent API responses
const { responseReturn } = require("../../utils/response");
const myShopWallet = require("../../models/myShopWallet");
const productModel = require("../../models/productModel");
const customerOrder = require("../../models/customerOrder");
const sellerModel = require("../../models/sellerModel");
const adminSellerMessage = require("../../models/chat/adminSellerMessage");
const sellerWallet = require("../../models/sellerWallet");
const authOrder = require("../../models/authOrder");
const sellerCustomerMessage = require("../../models/chat/sellerCustomerMessage");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

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

  /**
   * Handles retrieving comprehensive dashboard statistics for seller view.
   * This method aggregates key seller-specific metrics including total sales revenue,
   * product count, order count, pending orders, recent messages, and recent orders.
   * Used to populate the seller dashboard with overview statistics and recent activity
   * specific to the authenticated seller.
   *
   * @param {Object} req - Express request object, expects:
   *   - id: seller ID (from authentication middleware) (string)
   * @param {Object} res - Express response object
   */
  get_seller_dashboard_data = async (req, res) => {
    // Extract seller ID from authenticated request (set by auth middleware)
    const { id } = req;

    try {
      // Calculate total sales revenue for this specific seller using aggregation
      // This sums up all amounts earned by this seller from their wallet entries
      const totalSale = await sellerWallet.aggregate([
        {
          // Filter wallet entries to only include this seller's earnings
          $match: {
            sellerId: {
              $eq: id, // Match only wallet entries for this seller
            },
          },
        },
        {
          // Group all filtered entries and sum their amounts
          $group: {
            _id: null, // Group all documents together (no grouping criteria)
            totalAmount: { $sum: "$amount" }, // Sum all 'amount' fields to get seller's total revenue
          },
        },
      ]);

      // Count total number of products created by this seller
      const totalProduct = await productModel
        .find({ sellerId: new ObjectId(id) }) // Find products belonging to this seller
        .countDocuments(); // Count the documents without loading them

      // Count total number of orders received by this seller
      const totalOrder = await authOrder
        .find({
          sellerId: new ObjectId(id), // Find orders assigned to this seller
        })
        .countDocuments(); // Count the documents without loading them

      // Count pending orders that need seller attention
      // These are orders that have been paid but not yet processed by the seller
      const totalPendingOrder = await authOrder
        .find({
          $and: [
            {
              sellerId: {
                $eq: new ObjectId(id), // Match this seller's orders
              },
            },
            {
              delivery_status: {
                $eq: "pending", // Filter for pending delivery status
              },
            },
          ],
        })
        .countDocuments(); // Count pending orders for quick overview

      // Fetch the 3 most recent messages involving this seller
      // This includes both messages sent by the seller and received by the seller
      const messages = await sellerCustomerMessage
        .find({
          $or: [
            {
              senderId: {
                $eq: id, // Messages sent by this seller
              },
            },
            {
              receiverId: {
                $eq: id, // Messages received by this seller
              },
            },
          ],
        })
        .limit(3); // Limit to 3 most recent messages

      // Fetch the 5 most recent orders for this seller
      // Used to show recent order activity in the dashboard
      const recentOrders = await authOrder
        .find({
          sellerId: new ObjectId(id), // Find orders for this seller
        })
        .limit(5); // Limit to 5 most recent orders

      // Return all seller-specific dashboard statistics and recent activity data
      responseReturn(res, 200, {
        totalProduct, // Total number of products by this seller
        totalOrder, // Total number of orders received
        totalPendingOrder, // Number of orders pending processing
        messages, // 3 most recent seller-customer messages
        recentOrders, // 5 most recent orders for this seller
        totalSale: totalSale.length > 0 ? totalSale[0].totalAmount : 0, // Total sales revenue (0 if no sales)
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  // End of get_seller_dashboard_data method
}

module.exports = new dashboardController();

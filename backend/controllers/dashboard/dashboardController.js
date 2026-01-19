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
const bannerModel = require("../../models/bannerModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
// Import the cloudinary library for image uploading and management
const cloudinary = require("cloudinary").v2;
// Import the formidable library for handling form data (multipart/form-data, file uploads)
const formidable = require("formidable");

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

  /**
   * Handles adding a new promotional banner for a specific product.
   * This method uploads a banner image to Cloudinary, creates a banner record
   * in the database with the product details, and returns the created banner.
   * Used for creating promotional banners that can be displayed on the homepage
   * or other marketing areas of the website.
   *
   * @param {Object} req - Express request object, expects form-data:
   *   - productId: ID of the product to create banner for (string)
   *   - mainban: banner image file to upload (file)
   * @param {Object} res - Express response object
   */
  add_banner = async (req, res) => {
    // Create a new formidable form instance to parse incoming form data
    const form = formidable({ multiples: true });

    // Parse the incoming form data (fields and files)
    form.parse(req, async (err, fields, files) => {
      // Extract product ID from the parsed form fields
      const { productId } = fields;
      // Extract banner image file from the parsed files
      const { mainban } = files;

      // Configure Cloudinary with credentials from environment variables
      cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret,
        secure: true,
      });

      try {
        // Retrieve product information to get the product slug for banner linking
        const { slug } = await productModel.findById(productId);

        // Upload the banner image to Cloudinary under the 'banners' folder
        const result = await cloudinary.uploader.upload(mainban.filepath, {
          folder: "banners", // Organize banner images in a specific folder
        });

        // Create a new banner record in the database
        const banner = await bannerModel.create({
          productId, // ID of the product this banner promotes
          banner: result.url, // URL of the uploaded banner image from Cloudinary
          link: slug, // Product slug for creating clickable banner links
        });

        // Return success response with the created banner details
        responseReturn(res, 200, {
          banner, // Created banner object with all details
          message: "Banner Added Successfully", // Success confirmation message
        });
      } catch (error) {
        // Return error response if banner creation fails
        responseReturn(res, 500, { error: error.message });
      }
    });
  };
  // End of add_banner method

  /**
   * Handles retrieving a promotional banner for a specific product.
   * This method fetches the banner record from the database based on the product ID.
   * Used to display the appropriate banner for a product on the frontend.
   * @param {Object} req - Express request object, expects:
   *   - productId: ID of the product to retrieve banner for (string, URL param)
   * @param {Object} res - Express response object
   */
  get_banner = async (req, res) => {
    const { productId } = req.params;

    try {
      const banner = await bannerModel.findOne({
        productId: new ObjectId(productId),
      });
      responseReturn(res, 200, { banner });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  // End of get_banner method

  /**
   * Updates an existing banner image by replacing the old image with a new one.
   * This method handles the complete banner update process including deletion of old image
   * from Cloudinary and uploading the new image, then updating the database record.
   * Used in admin dashboard for banner management functionality.
   *
   * @param {Object} req - Express request object, expects:
   *   - params.bannerId: ID of the banner to update (string)
   *   - files: multipart form data containing new banner image
   * @param {Object} res - Express response object
   */
  update_banner = async (req, res) => {
    // Extract banner ID from request parameters
    const { bannerId } = req.params;
    // Create formidable instance to parse multipart form data (file uploads)
    const form = formidable({});
    // Parse incoming request to extract file data
    form.parse(req, async (err, _, files) => {
      // Extract the main banner image file from uploaded files
      const { mainban } = files;
      // Configure Cloudinary with credentials from environment variables
      cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret,
        secure: true,
      });
      try {
        // Find the existing banner record in database
        let banner = await bannerModel.findById(bannerId);
        // Extract file path from banner URL to prepare for deletion
        let temp = banner.banner.split("/");
        temp = temp[temp.length - 1];
        // Extract image name (without extension) for Cloudinary deletion
        const imageName = temp.split(".")[0];
        // Delete old banner image from Cloudinary to free up storage
        await cloudinary.uploader.destroy(imageName);

        // Upload new banner image to Cloudinary and get the URL
        const { url } = await cloudinary.uploader.upload(mainban.filepath, {
          folder: "banners", // Organize banner images in a specific folder
        });

        // Update banner record in database with new image URL
        await bannerModel.findByIdAndUpdate(bannerId, { banner: url });

        // Retrieve updated banner data to return in response
        banner = await bannerModel.findById(bannerId);
        responseReturn(res, 200, {
          banner, // Created banner object with all details
          message: "Banner Updated Successfully", // Success confirmation message
        });
      } catch (error) {
        // Handle any errors during banner update process
        responseReturn(res, 500, { error: error.message });
      }
    });
  };
  // End of update_banner method
}

module.exports = new dashboardController();

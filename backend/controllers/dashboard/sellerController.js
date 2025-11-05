// Import the formidable library for handling form data (multipart/form-data, file uploads)
const formidable = require("formidable");
// Import custom response utility for consistent API responses
const { responseReturn } = require("../../utils/response");
// Import the cloudinary library for image uploading and management
const cloudinary = require("cloudinary").v2;
// Import the seller model for database operations
const sellerModel = require("../../models/sellerModel");

// Define the sellerController class to handle seller-related logic
class sellerController {
  /**
   * Handles fetching pending seller requests.
   * Supports pagination and (optionally) search functionality.
   * - If 'searchValue' is provided in the query, can be extended to perform a text search on sellers.
   * - Otherwise, fetches all sellers with status "pending".
   * - Results are paginated based on 'page' and 'parPage' query parameters.
   * - Returns both the list of sellers and the total count for pagination.
   *
   * @param {Object} req - Express request object, expects query params:
   *   - page: current page number (string or number)
   *   - parPage: number of items per page (string or number)
   *   - searchValue: optional search string for filtering sellers (currently not implemented)
   * @param {Object} res - Express response object
   */
  request_seller_get = async (req, res) => {
    // Optionally log the request query for debugging
    // console.log(req.query);

    // Extract pagination and search parameters from the request query
    const { page, searchValue, parPage } = req.query;
    // Calculate the number of documents to skip for pagination
    // Example: page=2, parPage=10 => skipPage = 10 * (2 - 1) = 10
    const skipPage = parseInt(parPage) * (parseInt(page) - 1);

    try {
      if (searchValue) {
        // Search functionality can be implemented here if needed
      } else {
        // Fetch sellers with status "pending", apply pagination and sort by creation date (descending)
        const sellers = await sellerModel
          .find({
            status: "pending", // Only fetch sellers with pending status
          })
          .skip(skipPage) // Skip documents for pagination
          .limit(parseInt(parPage)) // Limit the number of documents returned
          .sort({ createdAt: -1 }); // Sort by newest first

        // Count total number of sellers with status "pending" for pagination info
        const totalSeller = await sellerModel
          .find({
            status: "pending",
          })
          .countDocuments();

        // Return the paginated sellers and total count in the response
        responseReturn(res, 200, { sellers, totalSeller });
      }
    } catch (error) {
      // Return a 500 error response if any error occurs during database operation
      responseReturn(res, 500, { error: error.message });
    }
  };
  // End of request_seller_get method

  /**
   * Handles fetching a specific seller by their ID.
   * - Expects the seller ID in the request parameters.
   * - Returns the seller details if found.
   * - Returns a 404 error if the seller is not found.
   *
   * @param {Object} req - Express request object, expects params:
   *   - sellerId: ID of the seller to fetch (string)
   * @param {Object} res - Express response object
   */

  get_seller = async (req, res) => {
    // Extract sellerId from the request parameters
    const { sellerId } = req.params;

    try {
      // Find the seller by ID in the database
      const seller = await sellerModel.findById(sellerId);
      // Return the seller details in the response
      responseReturn(res, 200, { seller });
    } catch (error) {
      // Return a 500 error response if any error occurs during database operation
      responseReturn(res, 500, { error: error.message });
    }
  };
  // End of get_seller method

  /**
   * Handles updating the status of a seller.
   * - Expects the seller ID and new status in the request body.
   * - Updates the seller's status in the database.
   *
   * @param {Object} req - Express request object, expects body:
   *   - sellerId: ID of the seller to update (string)
   *   - status: new status for the seller (string)
   * @param {Object} res - Express response object
   */

  seller_status_update = async (req, res) => {
    // Extract sellerId and status from the request body
    const { sellerId, status } = req.body;
    try {
      await sellerModel.findByIdAndUpdate(sellerId, {
        status, // Update the seller's status
      });
      const seller = await sellerModel.findById(sellerId);
      // Return the updated seller details in the response
      responseReturn(res, 200, {
        seller,
        message: "Seller Status Updated Successfully",
      });
    } catch (error) {
      // Return a 500 error response if any error occurs during database operation
      responseReturn(res, 500, { error: error.message });
    }
  };
  // End of seller_status_update method

  /**
   * Handles fetching active sellers with pagination and optional search functionality.
   * - If 'searchValue' is provided in the query, performs a text search on active sellers.
   * - Returns the paginated list of sellers and the total count.
   *
   * @param {Object} req - Express request object, expects query:
   *   - page: current page number (number)
   *   - searchValue: optional search term for filtering sellers (string)
   *   - parPage: number of sellers per page (number)
   * @param {Object} res - Express response object
   */
  get_active_sellers = async (req, res) => {
    let { page, searchValue, parPage } = req.query;
    page = parseInt(page);
    parPage = parseInt(parPage);
    const skipPage = parPage * (page - 1);

    try {
      if (searchValue) {
        const sellers = await sellerModel
          .find({
            $text: { $search: searchValue },
            status: "active",
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalSeller = await sellerModel
          .find({
            $text: { $search: searchValue },
            status: "active",
          })
          .countDocuments();
        responseReturn(res, 200, { sellers, totalSeller });
      } else {
        const sellers = await sellerModel
          .find({
            status: "active",
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalSeller = await sellerModel
          .find({
            status: "active",
          })
          .countDocuments();
        responseReturn(res, 200, { sellers, totalSeller });
      }
    } catch (error) {
      console.error("active seller get " + error.message);
      // responseReturn(res, 500, { error: error.message });
    }
  };
  // End of get_active_sellers method

  /**
   * Handles fetching deactive sellers with pagination and optional search functionality.
   * - If 'searchValue' is provided in the query, performs a text search on deactive sellers.
   * - Returns the paginated list of sellers and the total count.
   *
   * @param {Object} req - Express request object, expects query:
   *   - page: current page number (number)
   *   - searchValue: optional search term for filtering sellers (string)
   *   - parPage: number of sellers per page (number)
   * @param {Object} res - Express response object
   */
  get_deactive_sellers = async (req, res) => {
    let { page, searchValue, parPage } = req.query;
    page = parseInt(page);
    parPage = parseInt(parPage);
    const skipPage = parPage * (page - 1);

    try {
      if (searchValue) {
        const sellers = await sellerModel
          .find({
            $text: { $search: searchValue },
            status: "deactive",
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalSeller = await sellerModel
          .find({
            $text: { $search: searchValue },
            status: "deactive",
          })
          .countDocuments();
        responseReturn(res, 200, { sellers, totalSeller });
      } else {
        const sellers = await sellerModel
          .find({
            status: "deactive",
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalSeller = await sellerModel
          .find({
            status: "deactive",
          })
          .countDocuments();
        responseReturn(res, 200, { sellers, totalSeller });
      }
    } catch (error) {
      console.error("active seller get " + error.message);
      // responseReturn(res, 500, { error: error.message });
    }
  };
  // End of get_deactive_sellers method
}

// Export instance of sellerController for use in routes
module.exports = new sellerController();

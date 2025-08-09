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
}

// Export instance of sellerController for use in routes
module.exports = new sellerController();

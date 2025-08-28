// Import the category model for database operations
const categoryModel = require("../../models/categoryModel");
// Import custom response utility for consistent API responses
const { responseReturn } = require("../../utils/response");

// Define the homeControllers class to handle home page related logic
class homeControllers {
  /**
   * Handles fetching all categories for the home page.
   * Retrieves all categories from the database without any filtering or pagination.
   * Used to display categories on the home page or similar public-facing pages.
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  get_categorys = async (req, res) => {
    try {
      // Fetch all categories from the database
      const categorys = await categoryModel.find({});
      // Return all categories in the response
      responseReturn(res, 200, {
        categorys,
      });
    } catch (error) {
      // Log error message to console for debugging purposes
      console.log(error.message);
    }
  };
  // End of get_categorys method
}

// Export instance of homeControllers for use in routes
module.exports = new homeControllers();

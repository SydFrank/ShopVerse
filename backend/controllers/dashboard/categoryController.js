// Import the formidable library for handling form data (multipart/form-data, file uploads)
const formidable = require("formidable");
// Import custom response utility for consistent API responses
const { responseReturn } = require("../../utils/response");
// Import the cloudinary library for image uploading and management
const cloudinary = require("cloudinary").v2;
// Import the category model for database operations
const categoryModel = require("../../models/categoryModel");

// Define the categoryController class to handle category-related logic
class categoryController {
  /**
   * Handles adding a new category.
   * Expects a multipart/form-data request with 'name' and 'image' fields.
   * Uploads the image to Cloudinary, creates a new category in the database,
   * and returns the created category in the response.
   */
  add_Category = async (req, res) => {
    // Create a new formidable form instance to parse incoming form data
    const form = formidable();
    // Parse the incoming form data (fields and files)
    form.parse(req, async (err, fields, files) => {
      // If an error occurs during parsing, return a 404 error response
      if (err) {
        responseReturn(res, 404, { error: "something went wrong" });
      } else {
        // Extract the 'name' field from the parsed data
        let { name } = fields;
        // Extract the 'image' file from the parsed files
        let { image } = files;
        // Trim whitespace from the category name
        name = name.trim();
        // Generate a slug by replacing spaces with hyphens in the name
        const slug = name.split(" ").join("-");

        // Configure Cloudinary with credentials from environment variables
        cloudinary.config({
          cloud_name: process.env.cloud_name,
          api_key: process.env.api_key,
          api_secret: process.env.api_secret,
          secure: true,
        });

        try {
          // Upload the image file to Cloudinary under the 'categorys' folder
          const result = await cloudinary.uploader.upload(image.filepath, {
            folder: "categorys",
          });
          // If the upload is successful, create a new category in the database
          if (result) {
            const category = await categoryModel.create({
              name, // Category name
              slug, // URL-friendly slug
              image: result.url, // URL of the uploaded image
            });
            // Return a success response with the created category
            responseReturn(res, 201, {
              category,
              message: "Category Added Successfully",
            });
          } else {
            // If image upload fails, return a 404 error response
            responseReturn(res, 404, { error: "Image Upload Failed" });
          }
        } catch (error) {
          // Handle any errors during image upload or database operation
          responseReturn(res, 500, { error: "Internal Server Error" });
        }
      }
    });
  };
  // End of add_Category method

  /**
   * Handles fetching categories from the database.
   * Supports pagination and search functionality.
   * - If 'searchValue' is provided in the query, performs a text search on categories.
   * - Otherwise, fetches all categories.
   * - Results are paginated based on 'page' and 'parPage' query parameters.
   * - Returns both the list of categories and the total count for pagination.
   *
   * @param {Object} req - Express request object, expects query params:
   *   - page: current page number (string or number)
   *   - parPage: number of items per page (string or number)
   *   - searchValue: optional search string for filtering categories
   * @param {Object} res - Express response object
   */
  get_Category = async (req, res) => {
    // Extract pagination and search parameters from the request query
    const { page, searchValue, parPage } = req.query;

    try {
      let skipPage = "";
      if (parPage && page) {
        // Calculate the number of documents to skip for pagination
        // Example: page=2, parPage=10 => skipPage = 10 * (2 - 1) = 10
        skipPage = parseInt(parPage) * (parseInt(page) - 1);
      }

      // If a search value is provided, perform a text search on categories
      if (searchValue && parPage && page) {
        // Find categories matching the search value, apply pagination and sort by creation date (descending)
        const categorys = await categoryModel
          .find({
            $text: { $search: searchValue }, // MongoDB text search
          })
          .skip(skipPage) // Skip documents for pagination
          .limit(parseInt(parPage)) // Limit the number of documents returned
          .sort({ createdAt: -1 }); // Sort by newest first

        // Count total number of categories matching the search for pagination info
        const totalCategory = await categoryModel
          .find({
            $text: { $search: searchValue },
          })
          .countDocuments();

        // Return the paginated categories and total count in the response
        responseReturn(res, 200, { categorys, totalCategory });
      } else if (searchValue === "" && parPage && page) {
        // If search value is empty but pagination parameters are provided,
        const categorys = await categoryModel
          .find({})
          .skip(skipPage) // Skip documents for pagination
          .limit(parseInt(parPage)) // Limit the number of documents returned
          .sort({ createdAt: -1 }); // Sort by newest first

        // Count total number of categories matching the search for pagination info
        const totalCategory = await categoryModel.find({}).countDocuments();
        // Return the paginated categories and total count in the response
        responseReturn(res, 200, { categorys, totalCategory });
      } else {
        // If no search value, fetch all categories with pagination and sorting
        const categorys = await categoryModel.find({}).sort({ createdAt: -1 });

        // Count total number of categories for pagination info
        const totalCategory = await categoryModel.find({}).countDocuments();

        // Return the paginated categories and total count in the response
        responseReturn(res, 200, { categorys, totalCategory });
      }
    } catch (error) {
      // Handle any errors during category retrieval
      console.log(error.message);
      responseReturn(res, 500, { error: "Internal Server Error" });
    }
  };
  // End of get_Category method
}

// Export instance of categoryController for use in routes
module.exports = new categoryController();

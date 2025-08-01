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
          responseReturn(res, 500, { error: "Internal Server Error 55555 " });
        }
      }
    });
  };
  // End of add_Category method

  /**
   * Handles fetching categories.
   * Currently only logs a message to the console (to be implemented).
   */
  get_Category = async (req, res) => {
    // console.log(req.query);
    const { page, searchValue, perPage } = req.query;
  };
  // End of get_Category method
}

// Export instance of categoryController for use in routes
module.exports = new categoryController();

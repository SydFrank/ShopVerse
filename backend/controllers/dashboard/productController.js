// Import the formidable library for handling form data (multipart/form-data, file uploads)
const formidable = require("formidable");
// Import custom response utility for consistent API responses
const { responseReturn } = require("../../utils/response");
// Import the cloudinary library for image uploading and management
const cloudinary = require("cloudinary").v2;

// Define the productController class to handle product-related logic
class productController {
  add_product = async (req, res) => {
    // Create a new instance of the formidable form parser that supports multiple file uploads
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      console.log(files.image);
      console.log(fields);
    });
  };
}

// Export instance of productController for use in routes
module.exports = new productController();

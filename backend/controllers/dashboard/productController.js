// Import the formidable library for handling form data (multipart/form-data, file uploads)
const formidable = require("formidable");
// Import custom response utility for consistent API responses
const { responseReturn } = require("../../utils/response");
// Import the cloudinary library for image uploading and management
const cloudinary = require("cloudinary").v2;
// Import the product model for database operations
const productModel = require("../../models/productModel");

// Define the productController class to handle product-related logic
class productController {
  /**
   * Handles adding a new product.
   * Expects a multipart/form-data request with product fields and multiple images.
   * Uploads all images to Cloudinary, creates a new product in the database,
   * and returns a success message in the response.
   *
   * @param {Object} req - Express request object, expects:
   *   - id: seller's ID (attached to req)
   *   - form-data fields: name, category, brand, price, stock, discount, description, shopName
   *   - form-data files: image (array of images)
   * @param {Object} res - Express response object
   */
  add_product = async (req, res) => {
    // Extract the seller's ID from the request (assumed to be attached by authentication middleware)
    const { id } = req;
    // Create a new instance of the formidable form parser that supports multiple file uploads
    const form = formidable({ multiples: true });
    // Parse the incoming form data (fields and files)
    form.parse(req, async (err, fields, files) => {
      // If needed, you can log files and fields for debugging
      // console.log(files.image);
      // console.log(fields);

      // Destructure product fields from the parsed form data
      let {
        name,
        category,
        brand,
        price,
        stock,
        discount,
        description,
        shopName,
      } = fields;
      // Extract the image files from the parsed files
      const { image } = files;
      // Trim whitespace from the product name
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
        // Initialize an array to store the URLs of all uploaded images
        let allImageUrl = [];
        // Loop through each image file and upload to Cloudinary
        for (let i = 0; i < image.length; i++) {
          // Upload the image to the 'products' folder in Cloudinary
          const result = await cloudinary.uploader.upload(image[i].filepath, {
            folder: "products",
          });
          // Add the uploaded image URL to the array
          allImageUrl = [...allImageUrl, result.url];
        }

        // Create a new product document in the database with the provided fields and image URLs
        await productModel.create({
          sellerId: id, // Seller's ID
          name, // Product name
          brand: brand.trim(), // Brand name (trimmed)
          slug, // URL-friendly slug
          shopName, // Shop name
          category: category.trim(), // Category name (trimmed)
          description: description.trim(), // Product description (trimmed)
          price: parseInt(price), // Product price (converted to integer)
          stock: parseInt(stock), // Product stock (converted to integer)
          discount: parseInt(discount), // Product discount (converted to integer)
          images: allImageUrl, // Array of image URLs
        });
        // Return a success response indicating the product was added
        responseReturn(res, 201, {
          message: "Product Added Successfully",
        });
      } catch (error) {
        // Log any errors that occur during image upload or database operation
        console.error("🔥 PRODUCT ADD ERROR:", error);
        // Return a 500 error response with the error message
        responseReturn(res, 500, {
          error: error.message,
        });
      }
    });
  };
  // End of add_product method
}

// Export instance of productController for use in routes
module.exports = new productController();

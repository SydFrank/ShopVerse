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
        // Extract image(s) from parsed files
        const rawImage = files.image;
        // Normalize to array (whether single or multiple)
        const images = Array.isArray(rawImage) ? rawImage : [rawImage];
        // Initialize an array to store the URLs of all uploaded images
        let allImageUrl = [];
        // Loop through each image file and upload to Cloudinary
        for (let i = 0; i < images.length; i++) {
          // Upload the image to the 'products' folder in Cloudinary
          const result = await cloudinary.uploader.upload(images[i].filepath, {
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
        // console.error("🔥 PRODUCT ADD ERROR:", error);
        // Return a 500 error response with the error message
        responseReturn(res, 500, {
          error: error.message,
        });
      }
    });
  };
  // End of add_product method

  /**
   * Handles fetching products for a specific seller.
   * Supports pagination and search functionality.
   * - If 'searchValue' is provided in the query, performs a text search on products.
   * - Otherwise, fetches all products for the seller.
   * - Results are paginated based on 'page' and 'parPage' query parameters.
   * - Returns both the list of products and the total count for pagination.
   *
   * @param {Object} req - Express request object, expects query params:
   *   - page: current page number (string or number)
   *   - parPage: number of items per page (string or number)
   *   - searchValue: optional search string for filtering products
   *   - id: seller's ID (attached to req)
   * @param {Object} res - Express response object
   */
  products_get = async (req, res) => {
    // Optionally log the request query and user ID for debugging
    // console.log(req.query);
    // console.log(req.id);
    // Extract pagination and search parameters from the request query
    const { page, searchValue, parPage } = req.query;
    const { id } = req;

    // Calculate the number of documents to skip for pagination
    // Example: page=2, parPage=10 => skipPage = 10 * (2 - 1) = 10
    const skipPage = parseInt(parPage) * (parseInt(page) - 1);

    try {
      // If a search value is provided, perform a text search on products
      if (searchValue) {
        // Find products matching the search value, apply pagination and sort by creation date (descending)
        const products = await productModel
          .find({
            $text: { $search: searchValue }, // MongoDB text search
            sellerId: id, // Filter by seller ID
          })
          .skip(skipPage) // Skip documents for pagination
          .limit(parseInt(parPage)) // Limit the number of documents returned
          .sort({ createdAt: -1 }); // Sort by newest first

        // Count total number of products matching the search for pagination info
        const totalProduct = await productModel
          .find({
            $text: { $search: searchValue },
            sellerId: id, // Filter by seller ID
          })
          .countDocuments();

        // Return the paginated products and total count in the response
        responseReturn(res, 200, { products, totalProduct });
      } else {
        // If search value is empty but pagination parameters are provided,
        const products = await productModel
          .find({
            sellerId: id, // Filter by seller ID
          })
          .skip(skipPage) // Skip documents for pagination
          .limit(parseInt(parPage)) // Limit the number of documents returned
          .sort({ createdAt: -1 }); // Sort by newest first

        // Count total number of products matching the search for pagination info
        const totalProduct = await productModel
          .find({
            sellerId: id, // Filter by seller ID
          })
          .countDocuments();
        // Return the paginated products and total count in the response
        responseReturn(res, 200, { products, totalProduct });
      }
    } catch (error) {
      // Return a 500 error response with the error message
      // console.log(error.message);
      responseReturn(res, 500, {
        error: error.message,
      });
    }
  };
  // End of products_get method

  /**
   * Handles fetching a single product by its ID.
   * Returns the product details if found, otherwise returns an error.
   *
   * @param {Object} req - Express request object, expects:
   *   - params: contains productId (string)
   * @param {Object} res - Express response object
   */
  product_get = async (req, res) => {
    const { productId } = req.params;
    // Optionally log the productId for debugging
    // console.log(productId);
    try {
      // Find the product by its ID in the database
      const product = await productModel.findById(productId);
      // Return the product details in the response
      responseReturn(res, 200, { product });
    } catch (error) {
      // Log any errors that occur during product retrieval
      //  console.log(error.message);
      // Return a 500 error response with the error message
      responseReturn(res, 500, {
        error: error.message,
      });
    }
  };
  // End of product_get method

  /**
   * Handles updating an existing product.
   * Updates product fields based on the provided data in the request body.
   * Returns the updated product details if successful, otherwise returns an error.
   *
   * @param {Object} req - Express request object, expects:
   *   - body: contains product fields to update and productId
   * @param {Object} res - Express response object
   */
  product_update = async (req, res) => {
    let { name, description, price, stock, discount, category, productId } =
      req.body;

    // Trim whitespace from the product name
    name = name.trim();
    // Generate a slug by replacing spaces with hyphens in the name
    const slug = name.split(" ").join("-");

    try {
      // Update the product in the database by its ID with the new fields
      await productModel.findByIdAndUpdate(productId, {
        name, // Updated product name
        description, // Updated description
        price, // Updated price
        stock, // Updated stock
        discount, // Updated discount
        category, // Updated category
        productId, // Product ID (redundant, but included)
        slug, // Updated slug
      });
      // Retrieve the updated product from the database
      const product = await productModel.findById(productId);
      // Return a success response with the updated product details
      responseReturn(res, 200, {
        message: "Product Updated Successfully",
        product,
      });
    } catch (error) {
      // Return a 500 error response with the error message
      responseReturn(res, 500, {
        error: error.message,
      });
    }
  };
  // End of product_update method
}

// Export instance of productController for use in routes
module.exports = new productController();

// Import the category model for database operations
const categoryModel = require("../../models/categoryModel");
// Import the product model for database operations
const productModel = require("../../models/productModel");
// Import custom response utility for consistent API responses
const { responseReturn } = require("../../utils/response");
// Import the queryProducts utility class for filtering and pagination
const queryProducts = require("../../utils/queryProducts");

// Define the homeControllers class to handle home page related logic
class homeControllers {
  /**
   * Formats products into groups of 3 for display purposes.
   * This utility function takes an array of products and groups them into smaller arrays
   * containing a maximum of 3 products each. This is typically used for UI layout purposes
   * where products need to be displayed in rows or grids.
   *
   * @param {Array} products - Array of product objects to be formatted
   * @returns {Array} Array of arrays, where each sub-array contains up to 3 products
   */
  formateProduct = (products) => {
    // Initialize an array to store the grouped products
    const productArray = [];
    // Initialize counter for outer loop
    let i = 0;
    // Loop through all products
    while (i < products.length) {
      // Initialize temporary array for current group
      let temp = [];
      // Set starting point for inner loop
      let j = i;
      // Group up to 3 products together
      while (j < i + 3) {
        // Check if product exists at current index
        if (products[j]) {
          // Add product to current group
          temp.push(products[j]);
        }
        // Move to next product
        j++;
      }
      // Add the current group to the main array
      productArray.push([...temp]);
      // Move to next group starting point
      i = j;
    }
    // Return the formatted product groups
    return productArray;
  };

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

  /**
   * Handles fetching various product collections for the home page.
   * Retrieves different sets of products based on various criteria:
   * - Latest products (sorted by creation date)
   * - Top-rated products (sorted by rating)
   * - Discounted products (sorted by discount percentage)
   * All product sets are formatted into groups of 3 for display purposes.
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  get_products = async (req, res) => {
    try {
      // Fetch the 12 most recent products from the database
      const products = await productModel.find({}).limit(12).sort({
        createdAt: -1, // Sort by creation date in descending order (newest first)
      });

      // Fetch the 9 most recent products for the latest products section
      const allProduct1 = await productModel.find({}).limit(9).sort({
        createdAt: -1, // Sort by creation date in descending order (newest first)
      });
      // Format the latest products into groups of 3
      const latest_product = this.formateProduct(allProduct1);

      // Fetch the 9 highest-rated products for the top-rated section
      const allProduct2 = await productModel.find({}).limit(9).sort({
        rating: -1, // Sort by rating in descending order (highest rated first)
      });
      // Format the top-rated products into groups of 3
      const topRated_product = this.formateProduct(allProduct2);

      // Fetch the 9 most discounted products for the discount section
      const allProduct3 = await productModel.find({}).limit(9).sort({
        discount: -1, // Sort by discount in descending order (highest discount first)
      });
      // Format the discounted products into groups of 3
      const discount_product = this.formateProduct(allProduct3);

      // Return all product collections in the response
      responseReturn(res, 200, {
        products, // General product list (12 items)
        latest_product, // Latest products grouped by 3
        topRated_product, // Top-rated products grouped by 3
        discount_product, // Discounted products grouped by 3
      });
    } catch (error) {
      // Log error message to console for debugging purposes
      console.log(error.message);
    }
  };
  // End of get_products method

  /**
   * Handles fetching latest products with price range information.
   * This method retrieves the 9 most recent products, formats them into groups of 3,
   * and also calculates the price range (lowest to highest) of all products in the database.
   * This is typically used for product filtering and display purposes on the frontend.
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  price_range_latest_product = async (req, res) => {
    try {
      // Initialize price range object with default values
      const priceRange = {
        low: 0, // Minimum price
        high: 0, // Maximum price
      };

      // Fetch the 9 most recent products from the database
      const products = await productModel.find({}).limit(9).sort({
        createdAt: -1, // Sort by creation date in descending order (newest first)
      });

      // Format the latest products into groups of 3 for display
      const latest_product = this.formateProduct(products);

      // Fetch all products sorted by price in ascending order to determine price range
      const getForPrice = await productModel.find({}).sort({
        price: 1, // Sort by price in ascending order (lowest first)
      });

      // If products exist, set the price range from lowest to highest
      if (getForPrice.length > 0) {
        priceRange.low = getForPrice[0].price; // First product has lowest price
        priceRange.high = getForPrice[getForPrice.length - 1].price; // Last product has highest price
      }

      // Optionally log the price range for debugging
      // console.log(priceRange);

      // Return the latest products and price range in the response
      responseReturn(res, 200, {
        latest_product, // Latest products grouped by 3
        priceRange, // Price range object with low and high values
      });
    } catch (error) {
      // Log error message to console for debugging purposes
      console.log(error.message);
    }
  };
  // End of price_range_latest_product method

  /**
   * Handles querying products based on various filters and pagination.
   * This method supports filtering by category, rating, and price range,
   * as well as sorting by price. Results are paginated using the queryProducts utility.
   * The method returns both the filtered/paginated products and the total count
   * of products that match the filter criteria (before pagination).
   *
   * @param {Object} req - Express request object, expects query params:
   *   - category: optional category filter (string)
   *   - rating: optional rating filter (string/number)
   *   - lowPrice: minimum price filter (string/number)
   *   - highPrice: maximum price filter (string/number)
   *   - sortPrice: optional price sorting ("low-to-high" or other)
   *   - pageNumber: current page number (string/number, defaults to 1)
   * @param {Object} res - Express response object
   */
  query_products = async (req, res) => {
    // Set fixed page size for consistent pagination
    const parPage = 9;
    // Add parPage to the query object for use in queryProducts
    req.query.parPage = parPage;

    // Optionally log the query parameters for debugging
    // console.log(req.query);

    try {
      // Fetch all products from the database sorted by creation date (newest first)
      const products = await productModel.find({}).sort({
        createdAt: -1,
      });

      // Calculate total product count after applying filters but before pagination
      // This is used for pagination controls on the frontend
      const totalProduct = new queryProducts(products, req.query)
        .categoryQuery() // Apply category filter
        .ratingQuery() // Apply rating filter
        .priceQuery() // Apply price range filter
        .sortByPrice() // Apply price sorting
        .countProducts(); // Get the count of filtered products

      // Apply all filters, sorting, and pagination to get the final result
      const result = new queryProducts(products, req.query)
        .categoryQuery() // Apply category filter
        .ratingQuery() // Apply rating filter
        .priceQuery() // Apply price range filter
        .sortByPrice() // Apply price sorting
        .paginate() // Apply pagination (skip and limit)
        .getProducts(); // Get the final filtered and paginated products

      // Return the filtered/paginated products along with pagination info
      responseReturn(res, 200, {
        products: result, // Array of products for current page
        totalProduct, // Total number of products matching filters
        parPage, // Number of products per page
      });
    } catch (error) {
      // Log error message to console for debugging purposes
      console.log(error.message);
    }
  };
  // End of query_products method
}

// Export instance of homeControllers for use in routes
module.exports = new homeControllers();

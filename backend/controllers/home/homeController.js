const categoryModel = require("../../models/categoryModel");
const productModel = require("../../models/productModel");
// Import custom response utility for consistent API responses
const { responseReturn } = require("../../utils/response");
const queryProducts = require("../../utils/queryProducts");
const reviewModel = require("../../models/reviewModel");
// Import moment library for date formatting
const moment = require("moment");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

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
        .searchQuery() // Apply search filter
        .sortByPrice() // Apply price sorting
        .countProducts(); // Get the count of filtered products

      // Apply all filters, sorting, and pagination to get the final result
      const result = new queryProducts(products, req.query)
        .categoryQuery() // Apply category filter
        .ratingQuery() // Apply rating filter
        .priceQuery() // Apply price range filter
        .searchQuery() // Apply search filter
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

  /**
   * Handles fetching detailed information for a specific product.
   * This method retrieves complete product details using the product slug,
   * along with related products from the same category and more products
   * from the same seller. Used for product detail pages.
   *
   * @param {Object} req - Express request object, expects params:
   *   - slug: unique product slug identifier (string)
   * @param {Object} res - Express response object
   */
  product_details = async (req, res) => {
    // Extract product slug from request parameters
    const { slug } = req.params;

    try {
      // Find the main product by its unique slug
      const product = await productModel.findOne({ slug });

      // Find related products from the same category, excluding the current product
      const relatedProducts = await productModel
        .find({
          $and: [
            {
              _id: {
                $ne: product._id, // Exclude the current product by ID
              },
            },
            {
              category: product.category, // Match products in the same category
            },
          ],
        })
        .limit(12); // Limit to 12 related products

      // Find more products from the same seller, excluding the current product
      const moreProducts = await productModel
        .find({
          $and: [
            {
              _id: {
                $ne: product._id, // Exclude the current product by ID
              },
            },
            {
              sellerId: {
                $eq: product.sellerId, // Match products from the same seller
              },
            },
          ],
        })
        .limit(3); // Limit to 3 more products from the same seller

      // Return the product details along with related and more products
      responseReturn(res, 200, {
        product, // Main product details
        relatedProducts, // Array of related products from same category (max 12)
        moreProducts, // Array of more products from same seller (max 3)
      });
    } catch (error) {
      // Log error message to console for debugging purposes
      console.log(error.message);
      // Return error response if product retrieval fails
      responseReturn(res, 500, { error: "Internal Server Error" });
    }
  };
  // End of product_details method

  /**
   * Handles submitting a customer review for a product.
   * This method creates a new review entry, recalculates the product's average rating
   * based on all reviews, and updates the product's rating in the database.
   * Used when customers want to leave feedback and ratings for purchased products.
   *
   * @param {Object} req - Express request object, expects body:
   *   - productId: ID of the product being reviewed (string)
   *   - rating: numerical rating given by customer (number, typically 1-5)
   *   - name: name of the reviewer (string)
   *   - review: text content of the review (string)
   * @param {Object} res - Express response object
   */
  submit_review = async (req, res) => {
    // Extract review details from request body
    const { productId, rating, name, review } = req.body;

    try {
      // Create a new review entry in the database
      await reviewModel.create({
        productId, // Product being reviewed
        rating, // Numerical rating (1-5)
        name, // Reviewer's name
        review, // Review text content
        date: moment(Date.now()).format("LL"), // Formatted review date
      });

      // Initialize variable to calculate total rating sum
      let rat = 0;
      // Fetch all reviews for this specific product
      const reviews = await reviewModel.find({ productId });

      // Calculate sum of all ratings for this product
      for (let i = 0; i < reviews.length; i++) {
        rat = rat + reviews[i].rating; // Add each rating to total
      }

      // Initialize variable for calculated average rating
      let productRating = 0;
      // Calculate average rating if reviews exist
      if (reviews.length !== 0) {
        productRating = (rat / reviews.length).toFixed(1); // Average rounded to 1 decimal place
      }

      // Update the product's rating in the database with the new calculated average
      await productModel.findByIdAndUpdate(productId, {
        rating: productRating, // Updated average rating
      });

      // Return success response confirming review submission
      responseReturn(res, 201, { message: "Review Added Successfully" });
    } catch (error) {
      // Log error message to console for debugging purposes
      console.log(error.message);
      // Return error response if review submission fails
      responseReturn(res, 500, { error: "Internal Server Error" });
    }
  };
  // End of submit_review method

  /**
   * Handles fetching product reviews with pagination and rating statistics.
   * This method retrieves reviews for a specific product with pagination support,
   * calculates rating distribution (how many 1-star, 2-star, etc. reviews),
   * and returns both the paginated reviews and rating breakdown statistics.
   * Used for product review pages and rating displays.
   *
   * @param {Object} req - Express request object, expects:
   *   - params.productId: ID of the product to get reviews for (string)
   *   - query.pageNumber: current page number for pagination (string/number)
   * @param {Object} res - Express response object
   */
  get_reviews = async (req, res) => {
    // Extract product ID from request parameters
    const { productId } = req.params;
    // Extract and parse page number from query parameters
    let { pageNumber } = req.query;
    pageNumber = parseInt(pageNumber);

    // Set pagination parameters
    const limit = 5; // Number of reviews per page
    const skipPage = limit * (pageNumber - 1); // Calculate how many reviews to skip

    try {
      // Aggregate reviews to get rating distribution using MongoDB aggregation pipeline
      let getRating = await reviewModel.aggregate([
        {
          // Match reviews for the specific product with valid ratings
          $match: {
            productId: {
              $eq: new ObjectId(productId), // Convert string to ObjectId for matching
            },
            rating: {
              $not: {
                $size: 0, // Exclude reviews with empty rating arrays
              },
            },
          },
        },
        {
          // Unwind rating array to separate each rating value
          $unwind: "$rating",
        },
        {
          // Group by rating value and count occurrences
          $group: {
            _id: "$rating", // Group by rating value (1, 2, 3, 4, 5)
            count: {
              $sum: 1, // Count how many reviews for each rating
            },
          },
        },
      ]);

      // Initialize rating distribution array with default values
      let rating_review = [
        {
          rating: 5, // 5-star reviews
          sum: 0, // Initialize count to 0
        },
        {
          rating: 4, // 4-star reviews
          sum: 0, // Initialize count to 0
        },
        {
          rating: 3, // 3-star reviews
          sum: 0, // Initialize count to 0
        },
        {
          rating: 2, // 2-star reviews
          sum: 0, // Initialize count to 0
        },
        {
          rating: 1, // 1-star reviews
          sum: 0, // Initialize count to 0
        },
      ];

      // Map aggregation results to rating distribution array
      for (let i = 0; i < rating_review.length; i++) {
        for (let j = 0; j < getRating.length; j++) {
          // If rating matches, update the count
          if (rating_review[i].rating === getRating[j]._id) {
            rating_review[i].sum = getRating[j].count;
            break; // Exit inner loop once match is found
          }
        }
      }

      // Get total count of all reviews for this product (for pagination info)
      const getAll = await reviewModel.find({
        productId,
      });

      // Get paginated reviews for current page, sorted by newest first
      const reviews = await reviewModel
        .find({
          productId, // Filter by product ID
        })
        .skip(skipPage) // Skip reviews for previous pages
        .limit(limit) // Limit to specified number per page
        .sort({ createdAt: -1 }); // Sort by creation date (newest first)

      // Return paginated reviews and rating statistics
      responseReturn(res, 200, {
        reviews, // Array of reviews for current page
        totalReview: getAll.length, // Total number of reviews (for pagination)
        rating_review, // Rating distribution statistics
      });
    } catch (error) {
      // Log error message to console for debugging purposes
      console.log(error.message);
    }
  };
  // End of get_reviews method
}

// Export instance of homeControllers for use in routes
module.exports = new homeControllers();

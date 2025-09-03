/**
 * QueryProducts utility class for filtering, sorting, and paginating products.
 * This class provides a chainable API for applying various filters and operations
 * on product arrays. It supports category filtering, rating filtering, price range
 * filtering, sorting by price, and pagination.
 */
class queryProducts {
  // Array to store the products being processed
  products = [];
  // Object to store query parameters for filtering and pagination
  query = {};

  /**
   * Constructor to initialize the queryProducts instance.
   *
   * @param {Array} products - Array of product objects to be filtered/processed
   * @param {Object} query - Query parameters object containing filter criteria
   */
  constructor(products, query) {
    this.products = products;
    this.query = query;
  }

  /**
   * Filters products by category.
   * If a category is specified in the query, filters products to only include
   * those matching the specified category. Otherwise, returns all products unchanged.
   *
   * @returns {queryProducts} Returns this instance for method chaining
   */
  categoryQuery = () => {
    this.products = this.query.category
      ? this.products.filter((c) => c.category === this.query.category)
      : this.products;
    return this;
  };

  /**
   * Filters products by rating range.
   * If a rating is specified in the query, filters products to include only those
   * with ratings within the specified range (rating <= product.rating < rating + 1).
   * This creates a rating bracket (e.g., 4-5 stars for rating=4).
   *
   * @returns {queryProducts} Returns this instance for method chaining
   */
  ratingQuery = () => {
    this.products = this.query.rating
      ? this.products.filter(
          (c) =>
            parseInt(this.query.rating) <= c.rating &&
            c.rating < parseInt(this.query.rating) + 1
        )
      : this.products;
    return this;
  };

  /**
   * Filters products by price range.
   * Filters products to include only those within the specified price range.
   * Uses parseInt to convert string values to numbers, with fallbacks:
   * - lowPrice defaults to 0 if not provided or invalid
   * - highPrice defaults to Infinity if not provided or invalid
   *
   * @returns {queryProducts} Returns this instance for method chaining
   */
  priceQuery = () => {
    // Parse low price with fallback to 0
    const low = parseInt(this.query.lowPrice) || 0;
    // Parse high price with fallback to Infinity (no upper limit)
    const high = parseInt(this.query.highPrice) || Infinity;
    // Filter products within the price range
    this.products = this.products.filter(
      (p) => p.price >= low && p.price <= high
    );
    return this;
  };

  /**
   * Sorts products by price.
   * If sortPrice is specified in the query, sorts products either:
   * - "low-to-high": ascending order (cheapest first)
   * - any other value: descending order (most expensive first)
   * If no sortPrice is specified, products remain in their current order.
   *
   * @returns {queryProducts} Returns this instance for method chaining
   */
  sortByPrice = () => {
    if (this.query.sortPrice) {
      if (this.query.sortPrice === "low-to-high") {
        // Sort products from lowest to highest price
        this.products = this.products.sort((a, b) => a.price - b.price);
      } else {
        // Sort products from highest to lowest price
        this.products = this.products.sort((a, b) => b.price - a.price);
      }
    }
    return this;
  };

  /**
   * Applies pagination to the products array.
   * Slices the products array to return only the items for the specified page.
   * Uses pageNumber and parPage from the query parameters:
   * - pageNumber: current page number (defaults to 1)
   * - parPage: number of items per page (defaults to 6)
   *
   * @returns {queryProducts} Returns this instance for method chaining
   */
  paginate = () => {
    // Parse page number with fallback to 1 (first page)
    const pageNumber = parseInt(this.query.pageNumber) || 1;
    // Parse items per page with fallback to 9
    const parPage = parseInt(this.query.parPage) || 9;

    // Calculate starting index for the current page
    const start = (pageNumber - 1) * parPage;
    // Calculate ending index for the current page
    const end = start + parPage;

    // Slice the products array to get only the items for this page
    this.products = this.products.slice(start, end);
    return this;
  };

  /**
   * Returns the current products array.
   * This is typically called at the end of a method chain to retrieve
   * the final filtered/sorted/paginated results.
   *
   * @returns {Array} The current products array after all applied operations
   */
  getProducts = () => {
    return this.products;
  };

  /**
   * Returns the count of products in the current array.
   * Useful for pagination calculations and displaying total results.
   * Should typically be called on a filtered set before pagination is applied.
   *
   * @returns {number} The number of products in the current array
   */
  countProducts = () => {
    return this.products.length;
  };
}

// Export the queryProducts class
module.exports = queryProducts;

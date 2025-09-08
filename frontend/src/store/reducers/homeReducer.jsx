/**
 * Home Reducer - State Management for Homepage Data
 *
 * Manages the Redux state for homepage-related data in the ShopVerse
 * e-commerce application. It handles fetching and storing categories, products,
 * banners, and other home page content using Redux Toolkit's createSlice and
 * createAsyncThunk for efficient state management and asynchronous operations.
 *
 * Key Features:
 * - Asynchronous data fetching with createAsyncThunk
 * - Immutable state updates with Redux Toolkit
 * - Category management for homepage display
 * - Multiple product type management (latest, top-rated, discount)
 * - Price range filtering support for Shop page
 * - Error handling for API requests
 * - Extensible architecture for additional home page data
 *
 * Complete State Structure:
 * - categorys: Array of product categories for navigation and filtering
 * - products: General products array for main content sections
 * - latest_product: Newest products for carousel display
 * - topRated_product: Highest-rated products for carousel display
 * - discount_product: Discounted products for carousel display
 * - priceRange: Object with min/max price boundaries for filtering
 *
 * API Integration:
 * - GET /home/get-categorys: Fetches product categories
 * - GET /home/get-products: Fetches all product arrays
 * - GET /home/price-range-latest-product: Fetches price range and latest products
 *
 * Usage in Components:
 * - Home.jsx: Main consumer of all state data
 * - Shop.jsx: Uses categorys, priceRange, and latest_product
 * - Header.jsx: Uses categorys for navigation menu
 * - Products.jsx: Uses product arrays for carousel displays
 *
 * @module HomeReducer
 */

// Redux Toolkit imports for modern state management
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API client import for making HTTP requests
import api from "../../api/api"; // Configured Axios instance for backend communication

/**
 * Async Thunk: Get Categories
 *
 * Fetches product categories from the backend API for display on the homepage.
 * Uses createAsyncThunk to handle the asynchronous API request and automatically
 * generate pending, fulfilled, and rejected action types.
 *
 * API Endpoint: GET /home/get-categorys
 *
 * @async
 * @function get_category
 * @param {void} _ - No parameters required for this action
 * @param {Object} thunkAPI - Redux Toolkit thunk API utilities
 * @returns {Promise} Promise resolving to categories data or handling errors
 */
export const get_category = createAsyncThunk(
  "product/get_category", // Action type prefix for Redux DevTools
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      // Make API request to fetch categories
      const { data } = await api.get("/home/get-categorys");
      // console.log(data); // Debugging output (commented for production)

      // Return successful response data
      return fulfillWithValue(data);
    } catch (error) {
      // Log error for debugging purposes
      console.log(error.response);
      return rejectWithValue(error);
    }
  }
);
// End of get_category method

/**
 * Async Thunk: Get Products
 *
 * Fetches product data from the backend API for display on the homepage.
 * This includes multiple product categories: general products, latest products,
 * top-rated products, and discount products for different homepage sections.
 *
 * API Endpoint: GET /home/get-products
 *
 * Expected Response Data:
 * - products: Array of general products for main display
 * - latest_product: Array of newest products (sorted by creation date)
 * - topRated_product: Array of highest-rated products (sorted by rating)
 * - discount_product: Array of discounted products (sorted by discount percentage)
 *
 * @async
 * @function get_products
 * @param {void} _ - No parameters required for this action
 * @param {Object} thunkAPI - Redux Toolkit thunk API utilities
 * @param {Function} thunkAPI.fulfillWithValue - Function to return successful data
 * @returns {Promise} Promise resolving to products data or handling errors
 */
export const get_products = createAsyncThunk(
  "product/get_products", // Action type prefix for Redux DevTools
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      // Make API request to fetch all product categories
      const { data } = await api.get("/home/get-products");
      // console.log(data); // Debugging output to view API response structure

      // Return successful response data containing all product arrays
      return fulfillWithValue(data);
    } catch (error) {
      // Log error for debugging purposes
      console.log(error.response);
      return rejectWithValue(error);
    }
  }
);
// End of get_products method

/**
 * Async Thunk: Get Price Range and Latest Products
 *
 * Fetches price range data and latest products from the backend API.
 * This combined endpoint provides both the minimum/maximum price range
 * for filtering purposes and the latest products for display.
 *
 * API Endpoint: GET /home/price-range-latest-product
 *
 * Expected Response Data:
 * - priceRange: Object containing min/max price values
 *   - low: Number representing minimum product price
 *   - high: Number representing maximum product price
 * - latest_product: Array of newest products for homepage display
 *
 * Used by:
 * - Shop page: Price range for filter slider boundaries
 * - Homepage: Latest products for promotional sections
 *
 * @async
 * @function price_range_product
 * @param {void} _ - No parameters required for this action
 * @param {Object} thunkAPI - Redux Toolkit thunk API utilities
 * @param {Function} thunkAPI.fulfillWithValue - Function to return successful data
 * @returns {Promise} Promise resolving to price range and product data
 */
export const price_range_product = createAsyncThunk(
  "product/price_range_product", // Action type prefix for Redux DevTools
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      // Make API request to fetch price range and latest products
      const { data } = await api.get("/home/price-range-latest-product");

      // Return successful response data
      return fulfillWithValue(data);
    } catch (error) {
      // Log error for debugging purposes
      console.log(error.response);
      return rejectWithValue(error);
    }
  }
);
// End of price_range_product method

/**
 * Async Thunk: Query Products with Filters
 *
 * Fetches filtered and sorted products from the backend API based on user-selected
 * criteria. This is the main search and filter function used by the Shop page to
 * provide dynamic product browsing with real-time filtering capabilities.
 *
 * API Endpoint: GET /home/query-products
 *
 * Query Parameters:
 * - category: Selected product category for filtering (empty string for all categories)
 * - rating: Minimum star rating filter (1-5 stars, empty for no filter)
 * - lowPrice: Minimum price filter from price range slider
 * - highPrice: Maximum price filter from price range slider
 * - sortPrice: Sort order ("low-to-high", "high-to-low", or empty for default)
 * - pageNumber: Current page number for pagination (1-based indexing)
 *
 * Expected Response Data:
 * - products: Array of filtered products matching the criteria
 * - totalProduct: Total number of products matching filters (for pagination)
 * - parPage: Number of products per page (configured by backend)
 *
 * Used by:
 * - Shop.jsx: Primary consumer for product listing with filters
 * - Real-time filtering and sorting functionality
 * - Pagination navigation between product pages
 *
 * @async
 * @function query_products
 * @param {Object} query - Filter parameters object containing search criteria
 * @param {string} query.category - Selected category name or empty string
 * @param {string|number} query.rating - Minimum rating filter or empty string
 * @param {number} query.low - Minimum price filter value
 * @param {number} query.high - Maximum price filter value
 * @param {string} query.sortPrice - Price sort order preference
 * @param {number} query.pageNumber - Current pagination page number
 * @param {Object} thunkAPI - Redux Toolkit thunk API utilities
 * @param {Function} thunkAPI.fulfillWithValue - Function to return successful data
 * @param {Function} thunkAPI.rejectWithValue - Function to handle error responses
 * @returns {Promise} Promise resolving to filtered products data or error handling
 */
export const query_products = createAsyncThunk(
  "product/query_products", // Action type prefix for Redux DevTools
  async (query, { fulfillWithValue, rejectWithValue }) => {
    try {
      // Make API request to fetch products based on filters
      // Note: Using && as parameter separator as required by backend API
      const { data } = await api.get(
        `/home/query-products?category=${query.category}&&rating=${
          query.rating
        }&&lowPrice=${query.low}&&highPrice=${query.high}&&sortPrice=${
          query.sortPrice
        }&&pageNumber=${query.pageNumber}&&searchValue=${
          query.searchValue ? query.searchValue : ""
        }`
      );

      // console.log(data); // Debugging output to view API response structure

      // Return successful response data
      return fulfillWithValue(data);
    } catch (error) {
      // Log error for debugging purposes
      console.log(error.response);
      return rejectWithValue(error);
    }
  }
);
// End of query_products method

/**
 * Home Redux Slice
 *
 * Creates a Redux slice for managing home page state using Redux Toolkit's createSlice.
 * This slice handles the state updates for categories and other homepage-related data.
 *
 * Slice Configuration:
 * - name: 'home' - Used for action type prefixes and state key in store
 * - initialState: Default state structure when the application starts
 * - reducers: Synchronous state update functions (currently empty)
 * - extraReducers: Handles async thunk action responses
 */
export const homeReducer = createSlice({
  // Slice name - used in action types and Redux DevTools
  name: "home",
  initialState: {
    categorys: [], // Array of product categories for homepage display and shop filtering
    products: [], // General products array for main shop content and search results
    totalProduct: 0, // Total number of products matching current filters (pagination support)
    parPage: 3, // Products per page for pagination (updated from backend response)
    latest_product: [], // Newest products for "Latest Product" homepage carousel section
    topRated_product: [], // Top-rated products for "Top Rated Product" homepage carousel section
    discount_product: [], // Discounted products for "Discount Product" homepage carousel section
    priceRange: {
      low: 0, // Minimum price boundary (updated from backend, used for price slider)
      high: 100, // Maximum price boundary (updated from backend, used for price slider)
    },
  },

  /**
   * Synchronous Reducers
   *
   * Currently empty as all state updates are handled by async thunks.
   * Future synchronous actions could be added here for immediate state changes
   * like UI toggles, temporary state updates, or client-side filtering.
   */
  reducers: {},

  /**
   * Extra Reducers for Async Thunks
   *
   * Handles state updates from async thunk actions (pending, fulfilled, rejected).
   * Uses builder pattern for type-safe action handling and automatic action type matching.
   */
  extraReducers: (builder) => {
    // Handle successful category fetch
    builder
      .addCase(get_category.fulfilled, (state, { payload }) => {
        // Update categories array with fetched data from API
        // This data is used for navigation menus and category filtering
        state.categorys = payload.categorys;
      })
      // Handle successful product fetch
      .addCase(get_products.fulfilled, (state, { payload }) => {
        // Update general products array for main content display
        state.products = payload.products;

        // Update specialized product arrays for different homepage sections
        // These arrays are used by the Products component with different titles
        state.latest_product = payload.latest_product; // For "Latest Product" carousel
        state.topRated_product = payload.topRated_product; // For "Top Rated Product" carousel
        state.discount_product = payload.discount_product; // For "Discount Product" carousel
      })
      // Handle successful price range and latest products fetch
      .addCase(price_range_product.fulfilled, (state, { payload }) => {
        // Update price range boundaries for filter components
        // Used by Shop page price slider to set min/max values
        state.priceRange = payload.priceRange;

        // Update latest products array (alternative source)
        // This provides fresh latest product data alongside price range
        state.latest_product = payload.latest_product; // For "Latest Product" carousel
      })

      // Handle Successful Product Query with Filters
      .addCase(query_products.fulfilled, (state, { payload }) => {
        // Update main products array with filtered results from Shop page
        state.products = payload.products;

        // Update pagination metadata for Shop page navigation
        state.totalProduct = payload.totalProduct; // Total products matching current filters
        state.parPage = payload.parPage; // Products displayed per page (backend setting)
      });
  },
});

// Export the reducer function for use in the root reducer
export default homeReducer.reducer;

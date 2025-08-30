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
  async (_, { fulfillWithValue }) => {
    try {
      // Make API request to fetch categories
      const { data } = await api.get("/home/get-categorys");
      // console.log(data); // Debugging output (commented for production)

      // Return successful response data
      return fulfillWithValue(data);
    } catch (error) {
      // Log error for debugging purposes
      console.log(error.response);

      // Note: Consider using rejectWithValue for proper error handling
      // return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
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
  async (_, { fulfillWithValue }) => {
    try {
      // Make API request to fetch all product categories
      const { data } = await api.get("/home/get-products");
      console.log(data); // Debugging output to view API response structure

      // Return successful response data containing all product arrays
      return fulfillWithValue(data);
    } catch (error) {
      // Log error for debugging purposes
      console.log(error.response);

      // Note: Consider using rejectWithValue for proper error handling
      // return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
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
  async (_, { fulfillWithValue }) => {
    try {
      // Make API request to fetch price range and latest products
      const { data } = await api.get("/home/price-range-latest-product");

      // Return successful response data
      return fulfillWithValue(data);
    } catch (error) {
      // Log error for debugging purposes
      console.log(error.response);

      // Note: Consider using rejectWithValue for proper error handling
      // return rejectWithValue(error.response?.data?.message || 'Failed to fetch price range');
    }
  }
);
// End of price_range_product method

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

  /**
   * Initial State Structure
   *
   * Defines the default state shape for the home slice.
   * This state is used when the application first loads and before
   * any API data is fetched. All arrays start empty and are populated
   * through async thunk actions.
   *
   * State Properties:
   * - categorys: Array of product categories for navigation and filtering
   * - products: Array of general products for main display sections
   * - latest_product: Array of newest products (recently added to inventory)
   * - topRated_product: Array of highest-rated products (based on customer reviews)
   * - discount_product: Array of products with active discounts and sales
   * - priceRange: Object containing price filtering boundaries
   *   - low: Minimum product price in the database
   *   - high: Maximum product price in the database
   *
   * Data Flow:
   * 1. Component mounts and dispatches async thunks
   * 2. API requests fetch data from backend
   * 3. Successful responses update these state arrays and objects
   * 4. Components re-render with updated product data
   *
   * Price Range Usage:
   * - Used by Shop page price filter slider for min/max boundaries
   * - Dynamically updated from backend to reflect current inventory
   * - Default values (0-100) are placeholders until API data loads
   */
  initialState: {
    categorys: [], // Array of product categories for homepage display
    products: [], // General products array for main content sections
    latest_product: [], // Newest products for "Latest Product" section
    topRated_product: [], // Top-rated products for "Top Rated Product" section
    discount_product: [], // Discounted products for "Discount Product" section
    priceRange: {
      low: 0, // Minimum price boundary (default placeholder)
      high: 100, // Maximum price boundary (default placeholder)
    },
  },

  /**
   * Synchronous Reducers
   *
   * Standard reducer functions for handling synchronous state updates.
   * Currently empty - all state updates are handled by async thunks.
   *
   * Example of how to add synchronous reducers:
   * setCategorys: (state, action) => {
   *   state.categorys = action.payload;
   * },
   * clearCategories: (state) => {
   *   state.categorys = [];
   * }
   */
  reducers: {},

  /**
   * Extra Reducers for Async Thunks
   *
   * Handles state updates from async thunk actions (pending, fulfilled, rejected).
   * Uses builder pattern for type-safe action handling and automatic action type matching.
   *
   * Handled Actions:
   * - get_category.fulfilled: Updates categories when API request succeeds
   * - get_products.fulfilled: Updates all product arrays when API request succeeds
   * - price_range_product.fulfilled: Updates price range and latest products
   *
   * Future Enhancement Opportunities:
   * - Add pending states for loading indicators
   * - Add rejected states for error handling
   * - Add loading and error properties to state
   * - Implement optimistic updates for better UX
   *
   * Example of enhanced error handling:
   * .addCase(get_products.pending, (state) => {
   *   state.loading = true;
   *   state.error = null;
   * })
   * .addCase(get_products.rejected, (state, action) => {
   *   state.loading = false;
   *   state.error = action.payload;
   * })
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
      });
  },
});

// Export the reducer function for use in the root reducer
export default homeReducer.reducer;

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
 * - Error handling for API requests
 * - Extensible architecture for additional home page data
 *
 * State Structure:
 * - categorys: Array of product categories for navigation and filtering
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
   * This state is used when the application first loads.
   *
   * State Properties:
   * - categorys: Empty array to store fetched product categories
   */
  initialState: {
    categorys: [], // Array of product categories for homepage display
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
   * Uses builder pattern for type-safe action handling.
   *
   * Handled Actions:
   * - get_category.fulfilled: Updates categories when API request succeeds
   *
   */
  extraReducers: (builder) => {
    // Handle successful category fetch
    builder.addCase(get_category.fulfilled, (state, { payload }) => {
      // Update categories array with fetched data from API
      state.categorys = payload.categorys;
    });
  },
});

// Export the reducer function for use in the root reducer
export default homeReducer.reducer;

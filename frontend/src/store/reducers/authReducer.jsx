/**
 * Authentication Reducer - User authentication state management
 *
 * Purpose:
 * Manages all authentication-related state including user registration,
 * login status, loading states, and error/success message handling.
 *
 * Features:
 * - Customer registration with async API calls
 * - JWT token storage in localStorage
 * - Loading state management for UI feedback
 * - Error and success message handling
 * - Message clearing functionality
 *
 * State Structure:
 * - loader: Boolean for loading state during API calls
 * - userInfo: User information after successful authentication
 * - errorMessage: Error messages for failed operations
 * - successMessage: Success messages for completed operations
 */

// Redux Toolkit imports for modern state management
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../api/api"; // Configured Axios instance for backend communication
import { jwtDecode } from "jwt-decode"; // Library to decode JWT tokens

/**
 * Async thunk for customer registration
 * Handles API call to register new customer account
 *
 * @param {Object} info - Customer registration data (name, email, password, etc.)
 * @param {Object} thunkAPI - Redux Toolkit thunk API helpers
 * @returns {Promise} - Resolved with user data or rejected with error
 */
export const customer_register = createAsyncThunk(
  "auth/customer_register", // Action type prefix for Redux DevTools
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      // Make API request to register a new customer
      const { data } = await api.post("/customer/customer-register", info);

      localStorage.setItem("customerToken", data.token); // Store JWT token in localStorage for persistence
      return fulfillWithValue(data);
    } catch (error) {
      // Return error data for proper error handling in UI
      return rejectWithValue(error.response.data);
    }
  }
);
// End of customer_register thunk

/**
 * Async thunk for customer login
 * Handles API call to login existing customer account
 *
 * @param {Object} info - Customer login data (email, password)
 * @param {Object} thunkAPI - Redux Toolkit thunk API helpers
 * @returns {Promise} - Resolved with user data or rejected with error
 */
export const customer_login = createAsyncThunk(
  "auth/customer_login", // Action type prefix for Redux DevTools
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      // Make API request to login the customer
      const { data } = await api.post("/customer/customer-login", info);

      localStorage.setItem("customerToken", data.token); // Store JWT token in localStorage for persistence
      return fulfillWithValue(data);
    } catch (error) {
      // Return error data for proper error handling in UI
      return rejectWithValue(error.response.data);
    }
  }
);
// End of customer_login thunk

/**
 * JWT Token Decoder Utility Function
 * Safely decodes JWT token to extract user information for authentication state
 *
 * @param {string|null} token - JWT token from localStorage or API response
 * @returns {Object|string} - Decoded user information object or empty string if no token
 *
 * Purpose:
 * - Validates token existence before decoding
 * - Extracts user data (id, name, email, etc.) from JWT payload
 * - Provides fallback for missing or invalid tokens
 * - Used for both initial state hydration and post-login state updates
 */
const decodeToken = (token) => {
  if (token) {
    const userInfo = jwtDecode(token); // Decode JWT to extract user information
    return userInfo;
  } else {
    return ""; // Return empty string if no token exists
  }
};
// End of decodeToken function

/**
 * Authentication slice configuration
 * Defines initial state, reducers, and async action handlers
 *
 * Architecture:
 * - Uses Redux Toolkit's createSlice for simplified reducer logic
 * - Combines synchronous actions (messageClear) with async thunks
 * - Handles all authentication lifecycle states (pending, fulfilled, rejected)
 */
export const authReducer = createSlice({
  name: "auth", // Slice name - used in action types and Redux DevTools

  // Initial state structure for authentication
  // Hydrates userInfo from localStorage to persist login across browser sessions
  initialState: {
    loader: false, // Loading state during API operations
    userInfo: decodeToken(localStorage.getItem("customerToken")), // Restore user session from stored JWT
    errorMessage: "", // Error messages for failed operations
    successMessage: "", // Success messages for completed operations
  },

  // Synchronous reducers for immediate state updates
  reducers: {
    /**
     * Message Clear Action
     * Resets both error and success messages to empty strings
     *
     * Usage:
     * - Called after displaying toast notifications
     * - Prevents messages from persisting across component re-renders
     * - Ensures clean slate for subsequent API operations
     */
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },

  // Handle async action states (pending, fulfilled, rejected)
  // Uses builder pattern for type-safe reducer case handling
  extraReducers: (builder) => {
    builder
      // === Customer Registration Lifecycle ===

      // Customer registration pending state
      .addCase(customer_register.pending, (state) => {
        state.loader = true; // Show loading indicator during API call
      })

      // Customer registration success state
      .addCase(customer_register.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message; // Display success message
        const userInfo = decodeToken(payload.token); // Extract user data from JWT
        state.userInfo = userInfo; // Update state with authenticated user info
      })

      // Customer registration error state
      .addCase(customer_register.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error; // Display error message from API
      })

      // === Customer Login Lifecycle ===

      // Customer login pending state
      .addCase(customer_login.pending, (state) => {
        state.loader = true; // Show loading indicator during API call
      })

      // Customer login success state
      .addCase(customer_login.fulfilled, (state, { payload }) => {
        const userInfo = decodeToken(payload.token); // Extract user data from JWT
        state.userInfo = userInfo; // Update state with authenticated user info
        state.loader = false;
        state.successMessage = payload.message; // Display success message
      })

      // Customer login error state
      .addCase(customer_login.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error; // Display error message from API
      });
  },
});

/**
 * Exported Action Creators
 * Available for use in React components via useDispatch hook
 *
 * - messageClear: Synchronous action to reset error/success messages
 * - customer_register: Async thunk for user registration
 * - customer_login: Async thunk for user authentication
 */
export const { messageClear } = authReducer.actions;

/**
 * Default Export - Reducer Function
 * Used in store configuration (rootReducer.js) to handle auth state slice
 * Compatible with Redux Toolkit's configureStore function
 */
export default authReducer.reducer;

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

/**
 * Authentication slice configuration
 * Defines initial state, reducers, and async action handlers
 */
export const authReducer = createSlice({
  name: "auth", // Slice name - used in action types and Redux DevTools

  // Initial state structure for authentication
  initialState: {
    loader: false, // Loading state during API operations
    userInfo: "", // Authenticated user information
    errorMessage: "", // Error messages for failed operations
    successMessage: "", // Success messages for completed operations
  },

  // Synchronous reducers for immediate state updates
  reducers: {
    // Clear all messages (error and success)
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },

  // Handle async action states (pending, fulfilled, rejected)
  extraReducers: (builder) => {
    builder
      // Customer registration pending state
      .addCase(customer_register.pending, (state) => {
        state.loader = true; // Show loading indicator
      })
      // Customer registration success state
      .addCase(customer_register.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message; // Display success message
      })
      // Customer registration error state
      // Customer registration error state
      .addCase(customer_register.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error; // Display error message from API
      });
  },
});

// Export action creators for use in components
export const { messageClear } = authReducer.actions;

// Export reducer function for store configuration
export default authReducer.reducer;

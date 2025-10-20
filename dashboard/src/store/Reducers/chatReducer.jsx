import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./../../api/api";

/**
 * Async Thunk: Get Customers
 * ------------------------
 * Fetches the list of customers for a specific seller from the backend.
 * Used in chat functionality to get customers that the seller can communicate with.
 *
 * @param {string} sellerId - The ID of the seller to get customers for
 * @param {Function} rejectWithValue - Dispatches a rejected action with custom error
 * @param {Function} fulfillWithValue - Dispatches a fulfilled action with custom payload
 * @returns {Object} Response data or error
 */
export const get_customers = createAsyncThunk(
  "chat/get_customers",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      // Make a GET request to fetch customers for the specified seller
      const { data } = await api.get(`/chat/seller/get-customers/${sellerId}`, {
        withCredentials: true, // Include cookies for authentication/session
      });
      // On success, dispatch the fulfilled action with the server's response data
      return fulfillWithValue(data);
    } catch (error) {
      // On error, dispatch the rejected action with the backend error message
      return rejectWithValue(error.response.data);
    }
  }
);
// End of get_customers thunk

/**
 * Chat Redux Slice
 * ----------------
 * Manages the chat state including customers, messages, active users, and sellers.
 * Handles chat-related actions and state updates for the messaging functionality.
 */
const chatReducer = createSlice({
  name: "chat",
  initialState: {
    successMessage: "", // Stores success status messages
    errorMessage: "", // Stores backend errors or rejection reasons
    customers: [], // List of customers for the seller
    messages: [], // Chat messages
    activeCustomer: [], // Currently active customers
    activeSeller: [], // Currently active sellers
    activeAdmin: "", // Currently active admin
    friends: [], // Friend list for chat
    seller_admin_message: [], // Messages between seller and admin
    currentSeller: {}, // Current seller information
    currentCustomer: {}, // Current customer information
    sellers: [], // List of sellers
  },

  reducers: {
    /**
     * Clears error and success messages from the state.
     * Typically used after displaying messages to the user.
     */
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle get_customers fulfilled action
      .addCase(get_customers.fulfilled, (state, { payload }) => {
        state.customers = payload.customers; // Update customers list with fetched data
      });
  },
});

export const { messageClear } = chatReducer.actions;
export default chatReducer.reducer;

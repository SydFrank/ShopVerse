import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./../../api/api";

/**
 * Async Thunk: Get Seller Request
 * ------------------------
 * Sends a request to the backend to fetch seller data.
 * Uses axios (via `api`) to get seller data.
 * Automatically generates pending, fulfilled, and rejected action types.
 *
 * @param {Object} info - Seller payload (e.g. { name, image }).
 * @param {Function} rejectWithValue - Dispatches a rejected action with custom error.
 * @param {Function} fulfillWithValue - Dispatches a fulfilled action with custom payload.
 * @returns {Object} Response data or error.
 */

export const get_seller_request = createAsyncThunk(
  "seller/get_seller_request",
  // This thunk asynchronously fetches seller data from the backend.
  async (
    { parPage, page, searchValue }, // Destructure pagination and search parameters from the payload
    { rejectWithValue, fulfillWithValue } // Helper functions for custom fulfilled/rejected payloads
  ) => {
    try {
      // Make a GET request to the backend API with pagination and search parameters
      const { data } = await api.get(
        `/request-seller-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        {
          withCredentials: true, // Include cookies for authentication/session
        }
      );
      console.log(data); // Log the response data for debugging
      // On success, dispatch the fulfilled action with the server's response data
      return fulfillWithValue(data);
    } catch (error) {
      // On error, dispatch the rejected action with the backend error message
      // error.response.data contains the error details sent from the server
      // console.log(error.response.data); // Uncomment for error debugging
      return rejectWithValue(error.response.data);
    }
  }
);
//End of get_seller_request async thunk

/**
 * Async Thunk: Get Seller Details
 * ------------------------
 * Sends a request to the backend to fetch seller data.
 * Uses axios (via `api`) to get seller data.
 * Automatically generates pending, fulfilled, and rejected action types.
 *
 * @param {string} sellerId - The ID of the seller to fetch.
 * @param {Function} rejectWithValue - Dispatches a rejected action with custom error.
 * @param {Function} fulfillWithValue - Dispatches a fulfilled action with custom payload.
 * @returns {Object} Response data or error.
 */

export const get_seller = createAsyncThunk(
  "seller/get_seller",
  // This thunk asynchronously fetches seller data from the backend.
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      // Make a GET request to the backend API with pagination and search parameters
      const { data } = await api.get(`/get-seller/${sellerId}`, {
        withCredentials: true, // Include cookies for authentication/session
      });
      console.log(data); // Log the response data for debugging
      // On success, dispatch the fulfilled action with the server's response data
      return fulfillWithValue(data);
    } catch (error) {
      // On error, dispatch the rejected action with the backend error message
      // error.response.data contains the error details sent from the server
      // console.log(error.response.data); // Uncomment for error debugging
      return rejectWithValue(error.response.data);
    }
  }
);
//End of get_seller async thunk

/**
 * Async Thunk: Seller Status Update
 * ------------------------
 * Sends a request to the backend to update the seller's status.
 * Uses axios (via `api`) to send the update request.
 * Automatically generates pending, fulfilled, and rejected action types.
 *
 * @param {string} sellerId - The ID of the seller to update.
 * @param {string} status - The new status to set for the seller.
 * @param {Function} rejectWithValue - Dispatches a rejected action with custom error.
 * @param {Function} fulfillWithValue - Dispatches a fulfilled action with custom payload.
 * @returns {Object} Response data or error.
 */

export const seller_status_update = createAsyncThunk(
  "seller/seller_status_update",
  // This thunk asynchronously updates the seller's status in the backend.
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      // Make a POST request to the backend API to update the seller's status
      const { data } = await api.post(`/seller-status-update`, info, {
        withCredentials: true, // Include cookies for authentication/session
      });
      console.log(data); // Log the response data for debugging
      // On success, dispatch the fulfilled action with the server's response data
      return fulfillWithValue(data);
    } catch (error) {
      // On error, dispatch the rejected action with the backend error message
      // error.response.data contains the error details sent from the server
      // console.log(error.response.data); // Uncomment for error debugging
      return rejectWithValue(error.response.data);
    }
  }
);
//End of seller_status_update async thunk

/**
 * The `seller` slice of the global Redux state.
 *
 * - `name`: Unique name for the slice.
 * - `initialState`: Defines the default values for the seller state.
 * - `reducers`: Synchronous reducers will be added here (e.g. logout, clearErrors).
 * - `extraReducers`: Place to handle async actions like `get_seller_request` and `get_seller`.
 */

const sellerSlice = createSlice({
  name: "seller",
  initialState: {
    successMessage: "", // Stores success status (e.g. "Login successful")
    errorMessage: "", // Stores backend errors or rejection reasons
    loader: false, // Indicates if login request is in progress
    sellers: [], // Stores sellers fetched from the backend
    totalSeller: 0, // Total number of sellers for pagination
    seller: "", // Stores a single seller's details (e.g. for editing)
  },

  reducers: {
    /**
     * Clears error messages from the state, typically used on component unmount
     * or before submitting a new request.
     */
    messageClear: (state, _) => {
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle the pending state of the get_seller_request action
      .addCase(get_seller_request.fulfilled, (state, { payload }) => {
        state.sellers = payload.sellers; // Update sellers with fetched data
        state.totalSeller = payload.totalSeller;
        state.successMessage = payload.message;
      })
      // Handle the pending state of the get_seller action
      .addCase(get_seller.fulfilled, (state, { payload }) => {
        state.seller = payload.seller; // Update seller with fetched data
      })
      // Handle the pending state of the seller_status_update action
      .addCase(seller_status_update.fulfilled, (state, { payload }) => {
        state.seller = payload.seller; // Update seller with fetched data
        state.successMessage = payload.message; // Store success message
      });
  },
});

export const sellerReducer = sellerSlice.reducer;
export const { messageClear } = sellerSlice.actions;
export default sellerReducer;

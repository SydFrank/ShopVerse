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
 * The `auth` slice of the global Redux state.
 *
 * - `name`: Unique name for the slice.
 * - `initialState`: Defines the default values for the auth state.
 * - `reducers`: Synchronous reducers will be added here (e.g. logout, clearErrors).
 * - `extraReducers`: Place to handle async actions (e.g. login via createAsyncThunk).
 */

const sellerSlice = createSlice({
  name: "seller",
  initialState: {
    successMessage: "", // Stores success status (e.g. "Login successful")
    errorMessage: "", // Stores backend errors or rejection reasons
    loader: false, // Indicates if login request is in progress
    sellers: [], // Stores sellers fetched from the backend
    totalSeller: 0, // Total number of sellers for pagination
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
      // Handle the pending state of the get_seller action
      .addCase(get_seller_request.fulfilled, (state, { payload }) => {
        state.sellers = payload.sellers; // Update sellers with fetched data
        state.totalSeller = payload.totalSeller;
        state.successMessage = payload.message;
      });
  },
});

export const sellerReducer = sellerSlice.reducer;
export const { messageClear } = sellerSlice.actions;
export default sellerReducer;

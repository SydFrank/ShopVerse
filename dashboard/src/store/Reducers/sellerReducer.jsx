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
      return fulfillWithValue(data);
    } catch (error) {
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
      return fulfillWithValue(data);
    } catch (error) {
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
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//End of seller_status_update async thunk

/**
 * Async Thunk: Get Active Sellers
 * ------------------------
 * Sends a request to the backend to fetch active seller data.
 * Uses axios (via `api`) to get active seller data.
 * Automatically generates pending, fulfilled, and rejected action types.
 * @param {Object} info - Seller payload (e.g. { name, image }).
 * @param {Function} rejectWithValue - Dispatches a rejected action with custom error.
 * @param {Function} fulfillWithValue - Dispatches a fulfilled action with custom payload.
 * @returns {Object} Response data or error.
 */
export const get_active_sellers = createAsyncThunk(
  "seller/get_active_sellers",
  // This thunk asynchronously fetches seller data from the backend.
  async (
    { page, searchValue, parPage },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/get-sellers?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        {
          withCredentials: true, // Include cookies for authentication/session
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End of get_active_sellers async thunk

/**
 * Async Thunk: Get Deactive Sellers
 * ------------------------
 * Sends a request to the backend to fetch deactive seller data.
 * Uses axios (via `api`) to get deactive seller data.
 * Automatically generates pending, fulfilled, and rejected action types.
 * @param {Object} info - Seller payload (e.g. { name, image }).
 * @param {Function} rejectWithValue - Dispatches a rejected action with custom error.
 * @param {Function} fulfillWithValue - Dispatches a fulfilled action with custom payload.
 * @returns {Object} Response data or error.
 */
export const get_deactive_sellers = createAsyncThunk(
  "seller/get_deactive_sellers",
  // This thunk asynchronously fetches seller data from the backend.
  async (
    { page, searchValue, parPage },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/get-deactive-sellers?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        {
          withCredentials: true, // Include cookies for authentication/session
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End of get_deactive_sellers async thunk

/** * Async Thunk: Create Stripe Connect Account
 * ------------------------
 * Sends a request to the backend to create a Stripe Connect account.
 * Uses axios (via `api`) to send the request.
 * Automatically generates pending, fulfilled, and rejected action types.
 *
 * @returns {Object} Redirects to Stripe onboarding URL or logs error.
 */
export const create_stripe_connect_account = createAsyncThunk(
  "seller/create_stripe_connect_account",
  // This thunk asynchronously fetches seller data from the backend.
  async () => {
    try {
      const {
        data: { url },
      } = await api.get("/payment/create-stripe-connect-account", {
        withCredentials: true, // Include cookies for authentication/session
      });
      // Redirect the user to the Stripe onboarding URL
      window.location.href = url;
    } catch (error) {
      console.log(error);
    }
  }
);
// End of create_stripe_connect_account async thunk

/** * Async Thunk: Activate Stripe Connect Account
 * ------------------------
 * Sends a request to the backend to activate a Stripe Connect account.
 * Uses axios (via `api`) to send the request.
 * Automatically generates pending, fulfilled, and rejected action types.
 * @param {string} activeCode - The activation code for the Stripe Connect account.
 * @param {Function} rejectWithValue - Dispatches a rejected action with custom error.
 * @param {Function} fulfillWithValue - Dispatches a fulfilled action with custom payload.
 * @returns {Object} Response data or error.
 */
export const active_stripe_connect_account = createAsyncThunk(
  "seller/active_stripe_connect_account",
  // This thunk asynchronously fetches seller data from the backend.
  async (activeCode, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(
        `/payment/active-stripe-connect-account/${activeCode}`,
        {},
        {
          withCredentials: true, // Include cookies for authentication/session
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End of active_stripe_connect_account async thunk

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
      state.successMessage = "";
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
      })
      // Handle the pending state of the get_active_sellers action
      .addCase(get_active_sellers.fulfilled, (state, { payload }) => {
        state.sellers = payload.sellers;
        state.totalSeller = payload.totalSeller;
      })
      // Handle the pending state of the get_deactive_sellers action
      .addCase(get_deactive_sellers.fulfilled, (state, { payload }) => {
        state.sellers = payload.sellers;
        state.totalSeller = payload.totalSeller;
      })
      // Handle the different states of the active_stripe_connect_account action
      .addCase(active_stripe_connect_account.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(active_stripe_connect_account.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.message;
      })
      .addCase(
        active_stripe_connect_account.fulfilled,
        (state, { payload }) => {
          state.loader = false;
          state.successMessage = payload.message;
        }
      );
  },
});

export const sellerReducer = sellerSlice.reducer;
export const { messageClear } = sellerSlice.actions;
export default sellerReducer;

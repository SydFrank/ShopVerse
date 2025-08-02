import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../api/api";

/**
 * Async Thunk:  Product Add
 * ------------------------
 * Sends a request to the backend to add a new product.
 * Uses axios (via `api`) to post product data.
 * Automatically generates pending, fulfilled, and rejected action types.
 *
 * @param {Object} product - Product payload (e.g. { name, image, ... }).
 * @param {Function} rejectWithValue - Dispatches a rejected action with custom error.
 * @param {Function} fulfillWithValue - Dispatches a fulfilled action with custom payload.
 * @returns {Object} Response data or error.
 */
export const add_product = createAsyncThunk(
  "product/add_product",
  // The async function receives the product data and helper functions for handling fulfilled/rejected actions
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      // Make a POST request to the backend API to add a new product
      // The product object should contain all necessary fields (e.g. name, image, price, etc.)
      // withCredentials: true ensures cookies (for authentication/session) are included in the request
      const { data } = await api.post("/product-add", product, {
        withCredentials: true,
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
// End of add_product async thunk

/**
 * Async Thunk: Get Product
 * ------------------------
 * Sends a request to the backend to fetch category data.
 * Uses axios (via `api`) to get category data.
 * Automatically generates pending, fulfilled, and rejected action types.
 *
 * @param {Object} info - Product payload (e.g. { name, image }).
 * @param {Function} rejectWithValue - Dispatches a rejected action with custom error.
 * @param {Function} fulfillWithValue - Dispatches a fulfilled action with custom payload.
 * @returns {Object} Response data or error.
 */

export const get_product = createAsyncThunk(
  "product/get_product",
  // This thunk asynchronously fetches product data from the backend.
  async (
    { parPage, page, searchValue }, // Destructure pagination and search parameters from the payload
    { rejectWithValue, fulfillWithValue } // Helper functions for custom fulfilled/rejected payloads
  ) => {
    try {
      // Make a GET request to the backend API with pagination and search parameters
      const { data } = await api.get(
        `/category-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
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
//End of get_category async thunk

/**
 * The `auth` slice of the global Redux state.
 *
 * - `name`: Unique name for the slice.
 * - `initialState`: Defines the default values for the auth state.
 * - `reducers`: Synchronous reducers will be added here (e.g. logout, clearErrors).
 * - `extraReducers`: Place to handle async actions (e.g. login via createAsyncThunk).
 */

const productSlice = createSlice({
  name: "product",
  initialState: {
    successMessage: "", // Stores success status (e.g. "Login successful")
    errorMessage: "", // Stores backend errors or rejection reasons
    loader: false, // Indicates if login request is in progress
    products: [], // Stores products fetched from the backend
    totalProduct: 0,
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
      .addCase(add_product.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(add_product.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error; // Set error message from backend
      })
      .addCase(add_product.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.products = [...state.products, payload.product]; // Append new product to existing list
      })
      .addCase(get_product.fulfilled, (state, { payload }) => {
        state.totalProduct = payload.totalProduct;
        state.successMessage = payload.message;
        state.products = payload.products; // Update products with fetched data
      });
  },
});
// End of productSlice

export const productReducer = productSlice.reducer;
export const { messageClear } = productSlice.actions;
export default productReducer;

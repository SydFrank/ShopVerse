import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./../../api/api";

/**
 * Asynchronous thunk action to add a new banner.
 * Sends a POST request to the server with banner information.
 * @param {Object} info - The banner information to be sent to the server.
 * @returns {Object} - The server response data on success.
 * @throws {Object} - The error response data on failure.
 */
export const add_banner = createAsyncThunk(
  "banner/add_banner",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/banner/add`, info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//End of add_banner async thunk

/**
 * Asynchronous thunk action to get a banner by product ID.
 * Sends a GET request to the server to retrieve banner information.
 * @param {string} productId - The ID of the product whose banner is to be retrieved.
 * @returns {Object} - The server response data on success.
 * @throws {Object} - The error response data on failure.
 */
export const get_banner = createAsyncThunk(
  "banner/get_banner",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/banner/get/${productId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End of get_banner async thunk

/**
 * Asynchronous thunk action to update an existing banner.
 * Sends a PUT request to the server with updated banner information.
 * @param {Object} param0 - An object containing bannerId and info.
 * @param {string} param0.bannerId - The ID of the banner to be updated.
 * @param {Object} param0.info - The updated banner information.
 * @returns {Object} - The server response data on success.
 * @throws {Object} - The error response data on failure.
 */
export const update_banner = createAsyncThunk(
  "banner/update_banner",
  async ({ bannerId, info }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/banner/update/${bannerId}`, info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End of update_banner async thunk

const bannerReducer = createSlice({
  name: "banner",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    banners: [],
    banner: "",
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
      // Handle add_banner async thunk states
      .addCase(add_banner.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(add_banner.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(add_banner.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.banner = payload.banner;
      })
      // Handle get_banner async thunk states
      .addCase(get_banner.fulfilled, (state, { payload }) => {
        state.banner = payload.banner;
      })
      // Handle update_banner async thunk states
      .addCase(update_banner.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(update_banner.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(update_banner.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.banner = payload.banner;
      });
  },
});

export const { messageClear } = bannerReducer.actions;
export default bannerReducer.reducer;

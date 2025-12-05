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
      });
  },
});

export const { messageClear } = bannerReducer.actions;
export default bannerReducer.reducer;

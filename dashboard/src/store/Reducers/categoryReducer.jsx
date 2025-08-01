import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./../../api/api";

/**
 * Async Thunk: Category Add
 * ------------------------
 * Sends category data to the backend and handles the add category flow.
 * Uses axios (via `api`) to post category data.
 * Automatically generates pending, fulfilled, and rejected action types.
 *
 * @param {Object} info - Category payload (e.g. { name, image }).
 * @param {Function} rejectWithValue - Dispatches a rejected action with custom error.
 * @param {Function} fulfillWithValue - Dispatches a fulfilled action with custom payload.
 * @returns {Object} Response data or error.
 */

export const categoryAdd = createAsyncThunk(
  "category/categoryAdd",
  // This thunk asynchronously adds a new category with a name and image.
  async ({ name, image }, { rejectWithValue, fulfillWithValue }) => {
    try {
      // Create a new FormData object to send form fields and files as multipart/form-data.
      const formData = new FormData();
      formData.append("name", name); // Append the category name to the form data.
      formData.append("image", image); // Append the image file to the form data.
      console.log("FormData debug:", name, image);
      // Make a POST request to the /category-add endpoint, sending the FormData.
      // withCredentials: true ensures that cookies (for authentication/session) are included in the request.
      const { data } = await api.post("/category-add", formData, {
        withCredentials: true,
      });
      console.log(data);
      // On success, dispatch the fulfilled action with the server's response data.
      return fulfillWithValue(data);
    } catch (error) {
      // On error, dispatch the rejected action with the backend error message.
      // error.response.data contains the error details sent from the server.
      // console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * The `auth` slice of the global Redux state.
 *
 * - `name`: Unique name for the slice.
 * - `initialState`: Defines the default values for the auth state.
 * - `reducers`: Synchronous reducers will be added here (e.g. logout, clearErrors).
 * - `extraReducers`: Place to handle async actions (e.g. login via createAsyncThunk).
 */

const categorySlice = createSlice({
  name: "category",
  initialState: {
    successMessage: "", // Stores success status (e.g. "Login successful")
    errorMessage: "", // Stores backend errors or rejection reasons
    loader: false, // Indicates if login request is in progress
    category: [], // Stores categories fetched from the backend
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
      // Handles category add async flow
      .addCase(categoryAdd.pending, (state) => {
        state.loader = true; // Start loader when add category is in progress
      })
      .addCase(categoryAdd.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error; // Store backend error
      })
      .addCase(categoryAdd.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      });
  },
});

export const categoryReducer = categorySlice.reducer;
export const { messageClear } = categorySlice.actions;
export default categoryReducer;

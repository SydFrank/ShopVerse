import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./../../api/api";

/**
 * Async Thunk: Admin Login
 * ------------------------
 * Sends login credentials to the backend and handles the login flow.
 * Uses axios (via `api`) to post credentials.
 * Automatically generates pending, fulfilled, and rejected action types.
 *
 * @param {Object} info - Login payload (e.g. { email, password }).
 * @param {Function} rejectWithValue - Dispatches a rejected action with custom error.
 * @param {Function} fulfillWithValue - Dispatches a fulfilled action with custom payload.
 * @returns {Object} Response data or error.
 */

export const admin_login = createAsyncThunk(
  "auth/admin_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    try {
      const { data } = await api.post("/admin-login", info, {
        withCredentials: true, // Include cookies for authentication/session
      });
      // Store access token in localStorage to persist authentication across sessions
      localStorage.setItem("accessToken", data.token);
      // console.log(data);
      return fulfillWithValue(data); // Dispatch success
    } catch (error) {
      // console.log(error.response.data);
      return rejectWithValue(error.response.data); // Return backend error message
    }
  }
);

/**
 * Async Thunk: Seller Register
 * ------------------------
 * Sends registration credentials to the backend and handles the registration flow.
 * Uses axios (via `api`) to post credentials.
 * Automatically generates pending, fulfilled, and rejected action types.
 *
 * @param {Object} info - Registration payload (e.g. { email, password }).
 * @param {Function} rejectWithValue - Dispatches a rejected action with custom error.
 * @param {Function} fulfillWithValue - Dispatches a fulfilled action with custom payload.
 * @returns {Object} Response data or error.
 */

export const seller_register = createAsyncThunk(
  "auth/seller_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    try {
      const { data } = await api.post("/seller-register", info, {
        withCredentials: true, // Include cookies for authentication/session
      });
      // Store access token in localStorage to persist authentication across sessions
      localStorage.setItem("accessToken", data.token);
      // console.log(data);
      return fulfillWithValue(data); // Dispatch success
    } catch (error) {
      // console.log(error.response.data);
      return rejectWithValue(error.response.data); // Return backend error message
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

const authSlice = createSlice({
  name: "auth",
  initialState: {
    successMessage: "", // Stores success status (e.g. "Login successful")
    errorMessage: "", // Stores backend errors or rejection reasons
    loader: false, // Indicates if login request is in progress
    userInfo: "", // Can later be used to store admin data (e.g. token, name)
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
      .addCase(admin_login.pending, (state) => {
        state.loader = true; // Start loader when login is in progress
      })
      .addCase(admin_login.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error; // Store backend error
      })
      .addCase(admin_login.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })
      .addCase(seller_register.pending, (state) => {
        state.loader = true; // Start loader when login is in progress
      })
      .addCase(seller_register.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error; // Store backend error
      })
      .addCase(seller_register.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      });
  },
});

export const authReducer = authSlice.reducer;
export const { messageClear } = authSlice.actions;
export default authReducer;

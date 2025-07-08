import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/**
 * Async Thunk - Admin Login
 * --------------------------
 * Sends login credentials to the backend for admin authentication.
 * Automatically dispatches pending, fulfilled, and rejected actions.
 */

export const admin_login = createAsyncThunk(
  "auth/admin_login",
  async (info) => {
    console.log(info);
    try {
      // const data = await api.post("/admin-login", info, {
      //   withCredentials: true,
      // });
      // console.log(data);
    } catch (error) {}
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

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    userInfo: "",
  },

  reducers: {},
  extraReducers: () => {},
});

export default authReducer.reducer;

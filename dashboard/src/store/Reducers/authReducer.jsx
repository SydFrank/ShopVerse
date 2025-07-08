import { createSlice } from "@reduxjs/toolkit";

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

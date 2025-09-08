// Redux Toolkit imports for modern state management
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../api/api"; // Configured Axios instance for backend communication

export const authReducer = createSlice({
  // Slice name - used in action types and Redux DevTools
  name: "auth",
  initialState: {
    loader: false,
    userInfo: "",
    errorMessage: "",
    successMessage: "",
  },

  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },

  extraReducers: (builder) => {},
});

// Export the reducer function for use in the root reducer
export const { messageClear } = authReducer.actions;
export default authReducer.reducer;

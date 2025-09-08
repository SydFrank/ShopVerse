// Redux Toolkit imports for modern state management
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../api/api"; // Configured Axios instance for backend communication

export const customer_register = createAsyncThunk(
  "auth/customer_register", // Action type prefix for Redux DevTools
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      // Make API request to register a new customer
      const { data } = await api.post("/customer/customer-register", info);

      localStorage.setItem("customerToken", data.token); // Store user info in local storage

      // console.log(data);

      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      // return rejectWithValue(error);
    }
  }
);
// End of customer_register method

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

// Redux Toolkit imports for modern state management
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../api/api"; // Configured Axios instance for backend communication

export const dashboardReducer = createSlice({
  name: "dashboard",
  initialState: {
    recentOrders: [],
    errorMessage: "",
    successMessage: "",
    totalOrder: 0,
    pendingOrder: 0,
    cancelledOrder: 0,
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(customer_register.fulfilled, (state, { payload }) => {
    //   state.loader = false;
    //   state.successMessage = payload.message; // Display success message
    //   const userInfo = decodeToken(payload.token); // Extract user data from JWT
    //   state.userInfo = userInfo; // Update state with authenticated user info
    // });
  },
});

export const { messageClear } = dashboardReducer.actions;
export default dashboardReducer.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// Fetch dashboard data including orders and statistics
export const get_dashboard_index_data = createAsyncThunk(
  "dashboard/get_dashboard_index_data",
  async (userId, { fulfillWithValue, rejectWithValue }) => {
    try {
      // Get user dashboard data from API
      const { data } = await api.get(
        `/home/customer/get-dashboard-data/${userId}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const dashboardReducer = createSlice({
  name: "dashboard",

  // Initial state for dashboard data
  initialState: {
    recentOrders: [], // Recent order history
    errorMessage: "", // Error messages for dashboard operations
    successMessage: "", // Success messages for dashboard operations
    totalOrder: 0, // Total number of orders
    pendingOrder: 0, // Number of pending orders
    cancelledOrder: 0, // Number of cancelled orders
  },

  // Synchronous actions
  reducers: {
    // Clear all messages
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },

  // Handle async actions
  extraReducers: (builder) => {
    builder
      // Handle successful dashboard data fetch
      .addCase(get_dashboard_index_data.fulfilled, (state, { payload }) => {
        state.recentOrders = payload.recentOrders;
        state.totalOrder = payload.totalOrder;
        state.pendingOrder = payload.pendingOrder;
        state.cancelledOrder = payload.cancelledOrder;
      });
  },
});

// Export actions for component usage
export const { messageClear } = dashboardReducer.actions;

// Export reducer for store configuration
export default dashboardReducer.reducer;

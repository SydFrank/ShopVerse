import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./../../api/api";

/**
 * Async Thunk: Get Admin Dashboard Data
 * ----------------------------------------
 * Fetches key metrics and recent activity data for the admin dashboard from the backend.
 * This includes total sales, orders, products, sellers, and recent orders/messages.
 *
 * @param {Function} rejectWithValue - Dispatches a rejected action with custom error
 * * @param {Function} fulfillWithValue - Dispatches a fulfilled action with custom payload
 * @returns {Object} Response data containing dashboard metrics, or error
 */
export const get_admin_dashboard_data = createAsyncThunk(
  "dashboard/get_admin_dashboard_data",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/admin/get-dashboard-data", {
        withCredentials: true, // Include cookies for authentication/session
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End of get_admin_dashboard_data async thunk

const dashboardReducer = createSlice({
  name: "dashboard",
  initialState: {
    totalSale: 0,
    totalOrder: 0,
    totalProduct: 0,
    totalPendingOrder: 0,
    totalSeller: 0,
    recentOrder: [],
    recentMessage: [],
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
    builder.addCase(
      get_admin_dashboard_data.fulfilled,
      (state, { payload }) => {
        state.totalSale = payload.totalSale;
        state.totalOrder = payload.totalOrder;
        state.totalProduct = payload.totalProduct;
        state.totalSeller = payload.totalSeller;
        state.recentOrder = payload.recentOrders;
        state.recentMessage = payload.messages;
      }
    );
  },
});

export const { messageClear } = dashboardReducer.actions;
export default dashboardReducer.reducer;

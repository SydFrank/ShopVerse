// Redux Toolkit imports for modern state management
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api"; // Configured Axios instance for backend communication

export const get_dashboard_index_data = createAsyncThunk(
  "dashboard/get_dashboard_index_data", // Action type prefix for Redux DevTools
  async (userId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/get-dashboard-data/${userId}`
      );
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End of get_dashboard_index_data thunk

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
    builder
      // Get dashboard index data
      .addCase(get_dashboard_index_data.fulfilled, (state, { payload }) => {
        state.recentOrders = payload.recentOrders;
        state.totalOrder = payload.totalOrder;
        state.pendingOrder = payload.pendingOrder;
        state.cancelledOrder = payload.cancelledOrder;
      });
  },
});

export const { messageClear } = dashboardReducer.actions;
export default dashboardReducer.reducer;

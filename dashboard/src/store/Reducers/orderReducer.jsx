import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./../../api/api";

/**
 * Asynchronous thunk action to fetch admin orders with pagination and search functionality.
 *
 * This thunk makes an API call to retrieve a list of orders for the admin panel, supporting pagination and search filtering.
 * @param {Object} params - The parameters for fetching orders.
 * @param {number} params.parPage - Number of orders to fetch per page.
 * @param {number} params.page - The current page number.
 * @param {string} params.searchValue - The search keyword to filter orders.
 * @returns {Object} The fulfilled value containing the fetched orders data.
 */
export const get_admin_orders = createAsyncThunk(
  "order/get_admin_orders",
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/admin/orders?page=${page}&searchValue=${searchValue}&parPage=${parPage}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End of get_admin_orders async thunk

/**
 * Asynchronous thunk action to fetch details of a specific admin order by ID.
 * @param {Object} params - The parameters for fetching the order.
 * @param {string} params.orderId - The ID of the order to fetch.
 * @returns {Object} The fulfilled value containing the fetched order details.
 */
export const get_admin_order = createAsyncThunk(
  "order/get_admin_order",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/order/${orderId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End of get_admin_order async thunk

/**
 * Asynchronous thunk action to update the status of a specific admin order.
 * @param {Object} params - The parameters for updating the order status.
 * @param {string} params.orderId - The ID of the order to update.
 * @param {Object} params.info - The information containing the new status.
 * @returns {Object} The fulfilled value containing the update confirmation message.
 */
export const admin_order_status_update = createAsyncThunk(
  "order/admin_order_status_update",
  async ({ orderId, info }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(
        `/admin/order-status/update/${orderId}`,
        info,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/** Asynchronous thunk action to fetch seller orders with pagination and search functionality.
 *
 * This thunk makes an API call to retrieve a list of orders for a specific seller, supporting pagination and search filtering.
 * @param {Object} params - The parameters for fetching orders.
 * @param {number} params.parPage - Number of orders to fetch per page.
 * @param {number} params.page - The current page number.
 * @param {string} params.searchValue - The search keyword to filter orders.
 * @param {string} params.sellerId - The ID of the seller whose orders are to be fetched.
 * @returns {Object} The fulfilled value containing the fetched orders data.
 */
export const get_seller_orders = createAsyncThunk(
  "order/get_seller_orders",
  async (
    { parPage, page, searchValue, sellerId },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/seller/orders/${sellerId}?page=${page}&searchValue=${searchValue}&parPage=${parPage}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * Order Reducer
 * Manages the state related to orders, including fetching order lists,
 * fetching individual order details, and updating order statuses.
 */
const orderReducer = createSlice({
  name: "order",
  initialState: {
    successMessage: "",
    errorMessage: "",
    totalOrder: 0,
    order: {},
    myOrders: [],
  },

  reducers: {
    /**
     * Clears error messages from the state, typically used on component unmount
     * or before submitting a new request.
     */
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fulfilled state of get_admin_orders thunk
      .addCase(get_admin_orders.fulfilled, (state, { payload }) => {
        state.myOrders = payload.orders;
        state.totalOrder = payload.totalOrder;
      })
      // Handle fulfilled state of get_admin_order thunk
      .addCase(get_admin_order.fulfilled, (state, { payload }) => {
        state.order = payload.order;
      })
      // Handle fulfilled state of admin_order_status_update thunk
      .addCase(admin_order_status_update.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })
      // Handle rejected state of admin_order_status_update thunk
      .addCase(admin_order_status_update.rejected, (state, { payload }) => {
        state.errorMessage = payload.message;
      })
      // Handle fulfilled state of get_seller_orders thunk
      .addCase(get_seller_orders.fulfilled, (state, { payload }) => {
        state.myOrders = payload.orders;
        state.totalOrder = payload.totalOrder;
      });
  },
});

// export const orderReducer = orderReducer.reducer;
export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;

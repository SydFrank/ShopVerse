import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// Place order and navigate to payment page
export const place_order = createAsyncThunk(
  "order/place_order",
  async ({
    price,
    products,
    shipping_fee,
    items,
    shippingInfo,
    userId,
    navigate,
  }) => {
    try {
      // Send order data to API
      const { data } = await api.post("/home/order/place-order", {
        price,
        products,
        shipping_fee,
        items,
        shippingInfo,
        userId,
        navigate,
      });

      // Navigate to payment with order details
      navigate("/payment", {
        state: {
          price: price + shipping_fee,
          items: items,
          orderId: data.orderId,
        },
      });
      // console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);
// End of place_order thunk

// Fetch user orders with optional status filtering
export const get_orders = createAsyncThunk(
  "order/get_orders",
  async ({ customerId, status }, { fulfillWithValue, rejectWithValue }) => {
    try {
      // Request orders from API with customer ID and status filter
      // Status can be: 'all', 'placed', 'pending', 'cancelled', 'warehouse'
      const { data } = await api.get(
        `/home/customer/get-orders/${customerId}/${status}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const orderReducer = createSlice({
  name: "order",

  // Initial state for order management
  initialState: {
    myOrders: [], // User's order history
    errorMessage: "", // Error messages for order operations
    successMessage: "", // Success messages for order operations
    myOrder: {}, // Current order details
  },

  // Synchronous actions
  reducers: {
    // Clear all messages
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },

  // Handle async action states
  extraReducers: (builder) => {
    // Handle successful order fetch - update myOrders with filtered results
    builder.addCase(get_orders.fulfilled, (state, { payload }) => {
      state.myOrders = payload.orders;
    });
  },
});

// Export actions for component usage
export const { messageClear } = orderReducer.actions;

// Export reducer for store configuration
export default orderReducer.reducer;

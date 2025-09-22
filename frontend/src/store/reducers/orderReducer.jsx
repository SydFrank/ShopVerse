// Redux Toolkit imports for modern state management
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api"; // Configured Axios instance for backend communication

export const place_order = createAsyncThunk(
  "order/place_order", // Action type prefix for Redux DevTools
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
      const { data } = await api.post("/home/order/place-order", {
        price,
        products,
        shipping_fee,
        items,
        shippingInfo,
        userId,
        navigate,
      });
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);
// End of placeOrder thunk

export const orderReducer = createSlice({
  name: "order", // Slice name - used in action types and Redux DevTools

  // Initial state structure for cart management
  initialState: {
    myOrders: [], // Array to hold user's past orders
    errorMessage: "", // Error messages for failed cart operations
    successMessage: "", // Success messages for completed cart operations
    myOrder: {}, // Details of a single order
  },

  // Synchronous reducers for immediate state updates
  reducers: {
    /**
     * Message Clear Action
     * Resets both error and success messages to empty strings
     *
     * Usage:
     * - Called after displaying toast notifications for order operations
     * - Prevents messages from persisting across component re-renders
     * - Ensures clean slate for subsequent order API operations
     */
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },

  // Handle async action states (pending, fulfilled, rejected)
  extraReducers: (builder) => {},
});

/**
 * Exported Action Creators
 * Available for use in React components via useDispatch hook
 */
export const { messageClear } = orderReducer.actions;

/**
 * Default Export - Reducer Function
 * Used in store configuration (rootReducer.js) to handle cart state slice
 * Compatible with Redux Toolkit's configureStore function
 */
export default orderReducer.reducer;

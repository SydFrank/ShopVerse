/**
 * Cart Reducer - Shopping cart and wishlist state management
 *
 * Purpose:
 * Manages all cart-related state including cart items, wishlist items,
 * pricing calculations, shipping fees, and inventory tracking.
 *
 * Features:
 * - Add products to cart with quantity management
 * - Cart item count tracking for UI indicators
 * - Wishlist functionality for saved items
 * - Price calculations including shipping fees
 * - Out-of-stock product handling
 * - Error and success message management
 *
 * State Structure:
 * - cart_products: Array of items in shopping cart
 * - cart_product_count: Total number of items in cart
 * - wishlist: Array of saved/favorite products
 * - wishlist_count: Total number of wishlist items
 * - price: Total cart price calculation
 * - shipping_fee: Calculated shipping cost
 * - outofstock_products: Array of unavailable items
 */

// Redux Toolkit imports for modern state management
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api"; // Configured Axios instance for backend communication

/**
 * Async thunk for adding products to shopping cart
 * Handles API call to add product with specified quantity to user's cart
 *
 * @param {Object} info - Product information including productId, quantity, userId
 * @param {string} info.productId - Unique identifier for the product
 * @param {number} info.quantity - Number of items to add to cart
 * @param {string} info.userId - Customer's unique identifier
 * @param {Object} thunkAPI - Redux Toolkit thunk API helpers
 * @returns {Promise} - Resolved with cart data or rejected with error
 */
export const add_to_cart = createAsyncThunk(
  "cart/add_to_cart", // Action type prefix for Redux DevTools
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      // Make API request to add product to cart
      const { data } = await api.post("/home/product/add-to-cart", info);
      return fulfillWithValue(data);
    } catch (error) {
      // Return error data for proper error handling in UI
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * Cart slice configuration
 * Defines initial state, reducers, and async action handlers for shopping cart
 *
 * Architecture:
 * - Uses Redux Toolkit's createSlice for simplified reducer logic
 * - Manages both cart and wishlist functionality in single slice
 * - Handles pricing calculations and inventory management
 */
export const cartReducer = createSlice({
  name: "cart", // Slice name - used in action types and Redux DevTools

  // Initial state structure for cart management
  initialState: {
    cart_products: [], // Array of products currently in shopping cart
    cart_product_count: 0, // Total count of items in cart (for badge display)
    wishlist_count: 0, // Total count of items in wishlist
    wishlist: [], // Array of products saved to wishlist
    price: 0, // Total price of all cart items
    errorMessage: "", // Error messages for failed cart operations
    successMessage: "", // Success messages for completed cart operations
    shipping_fee: 0, // Calculated shipping cost based on cart total
    outofstock_products: [], // Array of products that are out of stock
  },

  // Synchronous reducers for immediate state updates
  reducers: {
    /**
     * Message Clear Action
     * Resets both error and success messages to empty strings
     *
     * Usage:
     * - Called after displaying toast notifications for cart operations
     * - Prevents messages from persisting across component re-renders
     * - Ensures clean slate for subsequent cart API operations
     */
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },

  // Handle async action states (pending, fulfilled, rejected)
  extraReducers: (builder) => {
    builder

      // Add to cart success state
      .addCase(add_to_cart.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message; // Display success message to user
        state.cart_product_count = payload.cart_product_count + 1; // Update cart badge count
      })

      // Add to cart error state
      .addCase(add_to_cart.rejected, (state, { payload }) => {
        state.errorMessage = payload.error; // Display error message from API
      });
  },
});

/**
 * Exported Action Creators
 * Available for use in React components via useDispatch hook
 */
export const { messageClear } = cartReducer.actions;

/**
 * Default Export - Reducer Function
 * Used in store configuration (rootReducer.js) to handle cart state slice
 * Compatible with Redux Toolkit's configureStore function
 */
export default cartReducer.reducer;

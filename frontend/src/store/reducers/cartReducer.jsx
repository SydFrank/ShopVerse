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
// End of add_to_cart thunk

/**
 * Get Cart Products - Fetch user's cart items from backend
 * Retrieves all products in user's shopping cart with quantities and pricing
 *
 * @param {string} userId - Customer's unique identifier
 * @param {Object} thunkAPI - Redux Toolkit thunk API helpers
 * @returns {Promise} - Resolved with cart products array or rejected with error
 */
export const get_cart_products = createAsyncThunk(
  "cart/get_cart_products", // Action type prefix for Redux DevTools
  async (userId, { fulfillWithValue, rejectWithValue }) => {
    try {
      // Make API request to get cart products for specific user
      const { data } = await api.get(
        `/home/product/get-cart-products/${userId}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      // Return error data for proper error handling in UI
      return rejectWithValue(error.response.data);
    }
  }
);
// End of get_cart_products thunk

/**
 * Delete Cart Product - Remove specific item from user's shopping cart
 * Handles API call to delete a product from cart and update cart state
 *
 * @param {string} cart_id - Unique identifier for the cart item to be removed
 * @param {Object} thunkAPI - Redux Toolkit thunk API helpers
 * @returns {Promise} - Resolved with success message or rejected with error
 */
export const delete_cart_product = createAsyncThunk(
  "cart/delete_cart_product",
  async (cart_id, { fulfillWithValue, rejectWithValue }) => {
    try {
      // Make API request to delete specific cart product
      const { data } = await api.delete(
        `/home/product/delete-cart-product/${cart_id}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      // Return error data for proper error handling in UI
      return rejectWithValue(error.response.data);
    }
  }
);
// End of delete_cart_product thunk

/**
 * Quantity Increment - Increase cart item quantity by 1
 * Updates cart item quantity on server and recalculates totals
 *
 * @param {string} cart_id - Unique identifier for the cart item
 * @param {Object} thunkAPI - Redux Toolkit thunk API helpers
 * @returns {Promise} - Resolved with updated cart data or rejected with error
 */
export const quantity_increment = createAsyncThunk(
  "cart/quantity_increment",
  async (cart_id, { fulfillWithValue, rejectWithValue }) => {
    try {
      // Make API request to increment cart item quantity
      const { data } = await api.put(
        `/home/product/quantity-increment/${cart_id}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      // Return error data for proper error handling in UI
      return rejectWithValue(error.response.data);
    }
  }
);
// End of quantity_increment thunk

/**
 * Quantity Decrement - Decrease cart item quantity by 1
 * Updates cart item quantity on server and recalculates totals
 *
 * @param {string} cart_id - Unique identifier for the cart item
 * @param {Object} thunkAPI - Redux Toolkit thunk API helpers
 * @returns {Promise} - Resolved with updated cart data or rejected with error
 */
export const quantity_decrement = createAsyncThunk(
  "cart/quantity_decrement",
  async (cart_id, { fulfillWithValue, rejectWithValue }) => {
    try {
      // Make API request to decrement cart item quantity
      const { data } = await api.put(
        `/home/product/quantity-decrement/${cart_id}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      // Return error data for proper error handling in UI
      return rejectWithValue(error.response.data);
    }
  }
);
// End of quantity_decrement thunk

/**
 * Add to Wishlist - Save product to user's wishlist for later purchase
 * Handles API call to add product to wishlist and updates wishlist count
 *
 * @param {Object} info - Product information including productId and userId
 * @param {string} info.productId - Unique identifier for the product to save
 * @param {string} info.userId - Customer's unique identifier
 * @param {Object} thunkAPI - Redux Toolkit thunk API helpers
 * @returns {Promise} - Resolved with success message or rejected with error
 */
export const add_to_wishlist = createAsyncThunk(
  "wishlist/add_to_wishlist",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      // Make API request to add product to user's wishlist
      const { data } = await api.post("/home/product/add-to-wishlist", info);
      return fulfillWithValue(data);
    } catch (error) {
      // Return error data for proper error handling in UI
      return rejectWithValue(error.response.data);
    }
  }
);
// End of add_to_wishlist thunk

/**
 * Get Wishlist Products - Fetch user's saved wishlist items from backend
 * Retrieves all products in user's wishlist with product details and count
 *
 * @param {string} userId - Customer's unique identifier
 * @param {Object} thunkAPI - Redux Toolkit thunk API helpers
 * @returns {Promise} - Resolved with wishlist products array and count or rejected with error
 */
export const get_wishlist_products = createAsyncThunk(
  "wishlist/get_wishlist_products",
  async (userId, { fulfillWithValue, rejectWithValue }) => {
    try {
      // Make API request to get user's wishlist products for specific user
      const { data } = await api.get(
        `/home/product/get-wishlist-products/${userId}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      // Return error data for proper error handling in UI
      return rejectWithValue(error.response.data);
    }
  }
);
// End of get_wishlist_products thunk

/**
 * Remove from Wishlist - Delete specific product from user's wishlist
 * Handles API call to remove product from wishlist and updates wishlist count
 *
 * @param {string} wishlistId - Unique identifier for the wishlist item to be removed
 * @param {Object} thunkAPI - Redux Toolkit thunk API helpers
 * @returns {Promise} - Resolved with success message or rejected with error
 */
export const remove_wishlist = createAsyncThunk(
  "wishlist/remove_wishlist",
  async (wishlistId, { fulfillWithValue, rejectWithValue }) => {
    try {
      // Make API request to remove specific product from user's wishlist
      const { data } = await api.delete(
        `/home/product/remove-wishlist-product/${wishlistId}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      // Return error data for proper error handling in UI
      return rejectWithValue(error.response.data);
    }
  }
);
// End of remove_wishlist thunk

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
    buy_product_item: 0, // Specific item to buy (for direct purchase flow)
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
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },

    /**
     * Reset Count Action
     * Resets cart product count and wishlist count to zero
     *
     * Usage:
     * - Called during user logout to clear cart/wishlist indicators
     * - Ensures accurate counts when a new user logs in
     */
    reset_count: (state, _) => {
      state.cart_product_count = 0;
      state.wishlist_count = 0;
    },
  },

  // Handle async action states (pending, fulfilled, rejected)
  extraReducers: (builder) => {
    builder

      // Add to cart success state
      .addCase(add_to_cart.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message; // Display success message to user
        state.cart_product_count = state.cart_product_count + 1; // Update cart badge count
      })

      // Add to cart error state
      .addCase(add_to_cart.rejected, (state, { payload }) => {
        state.errorMessage = payload.error; // Display error message from API
      })

      // Get cart products success state
      .addCase(get_cart_products.fulfilled, (state, { payload }) => {
        state.cart_products = payload.cart_products; // Update cart products array
        state.price = payload.price; // Update total cart price
        state.cart_product_count = payload.cart_product_count; // Update cart item count
        state.shipping_fee = payload.shipping_fee; // Update shipping fee
        state.outofstock_products = payload.outOfStockProduct; // Update out-of-stock items
        state.buy_product_item = payload.buy_product_item; // Update buy product item
      })

      // Delete cart product success state
      .addCase(delete_cart_product.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message; // Display success message to user
      })
      // Quantity increment success state
      .addCase(quantity_increment.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message; // Display success message to user
      })
      // Quantity decrement success state
      .addCase(quantity_decrement.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message; // Display success message to user
      })

      // Add to wishlist success state
      .addCase(add_to_wishlist.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message; // Display success message to user
        state.wishlist_count =
          state.wishlist_count > 0 ? state.wishlist_count + 1 : 1; // Update wishlist badge count
      })

      // Add to wishlist error state
      .addCase(add_to_wishlist.rejected, (state, { payload }) => {
        state.errorMessage = payload.error; // Display error message from API
      })

      // Get wishlist products success state
      .addCase(get_wishlist_products.fulfilled, (state, { payload }) => {
        state.wishlist = payload.wishlists;
        state.wishlist_count = payload.wishlistCount; // Update wishlist products array and count
      })
      // Remove from wishlist success state
      .addCase(remove_wishlist.fulfilled, (state, { payload }) => {
        state.wishlist = state.wishlist.filter(
          (p) => p._id !== payload.wishlistId
        );
        state.successMessage = payload.message;
        state.wishlist_count = state.wishlist_count - 1; // Update wishlist products array and count
      });
  },
});

/**
 * Exported Action Creators
 * Available for use in React components via useDispatch hook
 */
export const { messageClear, reset_count } = cartReducer.actions;

/**
 * Default Export - Reducer Function
 * Used in store configuration (rootReducer.js) to handle cart state slice
 * Compatible with Redux Toolkit's configureStore function
 */
export default cartReducer.reducer;

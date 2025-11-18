import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./../../api/api";

/**
 * Async Thunk: Get Seller Payment Details
 * ----------------------------------------
 * Fetches comprehensive payment information for a specific seller from the backend.
 * Retrieves withdrawal history, payment amounts, and account balances.
 *
 * @param {string} sellerId - The ID of the seller to get payment details for
 * @param {Function} rejectWithValue - Dispatches a rejected action with custom error
 * @param {Function} fulfillWithValue - Dispatches a fulfilled action with custom payload
 * @returns {Object} Response data containing payment details, or error
 */
export const get_seller_payment_details = createAsyncThunk(
  "seller/get_seller_payment_details",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      // Make a GET request to fetch payment details for the specified seller
      const { data } = await api.get(
        `payment/seller-payment-details/${sellerId}`,
        {
          withCredentials: true, // Include cookies for authentication/session
        }
      );
      // On success, dispatch the fulfilled action with the server's response data
      // Response typically contains: { pendingWithdrawals, successWithdrawals, totalAmount, etc. }
      return fulfillWithValue(data);
    } catch (error) {
      // On error, dispatch the rejected action with the backend error message
      return rejectWithValue(error.response.data);
    }
  }
);
//End of get_seller_payment_details async thunk

/**
 * Async Thunk: Send Withdrawal Request
 * ---------------------------------
 * Submits a withdrawal request for a specified amount on behalf of the seller.
 * @param {Object} info - Object containing withdrawal amount and sellerId
 * @param {Function} rejectWithValue - Dispatches a rejected action with custom error
 * @param {Function} fulfillWithValue - Dispatches a fulfilled action with custom payload
 * @returns {Object} Response data confirming the withdrawal request, or error
 */
export const send_withdrawal_request = createAsyncThunk(
  "seller/send_withdrawal_request",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/payment/withdrawal-request", info, {
        withCredentials: true, // Include cookies for authentication/session
      });
      // On success, dispatch the fulfilled action with the server's response data
      // Response typically contains: { pendingWithdrawals, successWithdrawals, totalAmount, etc. }
      return fulfillWithValue(data);
    } catch (error) {
      // On error, dispatch the rejected action with the backend error message
      return rejectWithValue(error.response.data);
    }
  }
);
// End of send_withdrawal_request async thunk

/**
 * Async Thunk: Get Payment Requests
 * --------------------------------
 * Fetches all payment withdrawal requests made by sellers from the backend.
 * This is typically used by admin users to review and manage withdrawal requests.
 *
 * @param {Function} rejectWithValue - Dispatches a rejected action with custom error
 * * @param {Function} fulfillWithValue - Dispatches a fulfilled action with custom payload
 * @returns {Object} Response data containing the list of payment requests, or error
 */
export const get_payment_request = createAsyncThunk(
  "seller/get_payment_request",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/payment/request", {
        withCredentials: true, // Include cookies for authentication/session
      });
      // On success, dispatch the fulfilled action with the server's response data
      return fulfillWithValue(data);
    } catch (error) {
      // On error, dispatch the rejected action with the backend error message
      return rejectWithValue(error.response.data);
    }
  }
);

// Payment Reducer Slice
const paymentReducer = createSlice({
  name: "payment",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    pendingWithdrawals: [],
    successWithdrawals: 0,
    totalAmount: 0,
    withdrawalAmount: 0,
    pendingAmount: 0,
    availableAmount: 0,
  },

  // Reducers for handling synchronous actions
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

  // Extra reducers for handling asynchronous actions
  extraReducers: (builder) => {
    builder
      // Start of get_seller_payment_details extra reducers
      .addCase(get_seller_payment_details.fulfilled, (state, { payload }) => {
        state.pendingWithdrawals = payload.pendingWithdrawals;
        state.successWithdrawals = payload.successWithdrawals;
        state.totalAmount = payload.totalAmount;
        state.withdrawalAmount = payload.withdrawalAmount;
        state.pendingAmount = payload.pendingAmount;
        state.availableAmount = payload.availableAmount;
      })
      // Handle pending state for send_withdrawal_request
      .addCase(send_withdrawal_request.pending, (state, { payload }) => {
        state.loader = true;
      })
      // Handle rejected state for send_withdrawal_request
      .addCase(send_withdrawal_request.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.message;
      })
      // Handle fulfilled state for send_withdrawal_request
      .addCase(send_withdrawal_request.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.pendingWithdrawals = [
          ...state.pendingWithdrawals,
          payload.withdrawal,
        ];
        state.availableAmount =
          state.availableAmount - payload.withdrawal.amount;
        state.pendingAmount = state.pendingAmount + payload.withdrawal.amount;
      })
      // Handle fulfilled state for get_payment_request
      .addCase(get_payment_request.fulfilled, (state, { payload }) => {
        state.pendingWithdrawals = payload.requests;
      });
  },
});

export const { messageClear } = paymentReducer.actions;
export default paymentReducer.reducer;

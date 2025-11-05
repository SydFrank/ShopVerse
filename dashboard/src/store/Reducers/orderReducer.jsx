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
        `/admin/orders?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
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
    builder;

    // .addCase(get_deactive_sellers.fulfilled, (state, { payload }) => {
    //   state.sellers = payload.sellers;
    //   state.totalSeller = payload.totalSeller;
    // });
  },
});

export const { messageClear } = orderReducer.actions;
export default orderReducer;

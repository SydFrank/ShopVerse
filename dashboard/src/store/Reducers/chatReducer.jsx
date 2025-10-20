import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./../../api/api";

const chatReducer = createSlice({
  name: "chat",
  initialState: {
    successMessage: "",
    errorMessage: "",
    customers: [],
    messages: [],
    activeCustomer: [],
    activeSeller: [],
    activeAdmin: "",
    friends: [],
    seller_admin_message: [],
    currentSeller: {},
    currentCustomer: {},
    sellers: [],
  },

  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder;

    // .addCase(admin_login.fulfilled, (state, { payload }) => {
    //   state.loader = false;
    //   state.successMessage = payload.message;
    //   state.token = payload.token; // Store JWT token
    //   state.role = returnRole(payload.token); // Update role based on token
    // });
  },
});

export const { messageClear } = chatReducer.actions;
export default chatReducer.reducer;

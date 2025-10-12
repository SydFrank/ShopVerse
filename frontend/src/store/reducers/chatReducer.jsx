// Redux Toolkit imports for modern state management
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api"; // Configured Axios instance for backend communication

export const chatReducer = createSlice({
  name: "chat",
  initialState: {
    my_friends: [],
    fb_messages: [],
    currentFd: "",
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    /**
     * Message Clear Action
     * Resets both error and success messages to empty strings
     *
     * Usage:
     * - Called after displaying toast notifications
     * - Prevents messages from persisting across component re-renders
     * - Ensures clean slate for subsequent API operations
     */
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(customer_register.fulfilled, (state, { payload }) => {
    //     state.loader = false;
    //     state.successMessage = payload.message; // Display success message
    //     const userInfo = decodeToken(payload.token); // Extract user data from JWT
    //     state.userInfo = userInfo; // Update state with authenticated user info
    //   });
  },
});

export const { messageClear } = chatReducer.actions;
export default chatReducer.reducer;

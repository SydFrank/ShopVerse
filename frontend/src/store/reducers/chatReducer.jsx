// Redux Toolkit imports for modern state management
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api"; // Configured Axios instance for backend communication

/**
 * Async thunk to add a new friend to customer's friend list
 * Used for establishing chat connections between customers and sellers
 *
 * @async
 * @function add_friend
 * @param {Object} info - Friend information object
 * @param {string} info.sellerId - Unique identifier of the seller to add as friend
 * @param {string} info.sellerName - Display name of the seller
 * @returns {Promise<Object>} Promise resolving to:
 *   - messages: Array of existing chat messages with the friend
 *   - currentFriend: ID of the newly added friend
 *   - MyFriends: Updated list of all customer's friends
 * @throws {Object} API error response with error details
 */
export const add_friend = createAsyncThunk(
  "chat/add_friend",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        "/chat/customer/add-customer-friend",
        info
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End of add_friend thunk

/**
 * Async thunk to send a message to a seller
 * Used for customer-to-seller communication in the chat system
 *
 * @async
 * @function send_message
 * @param {Object} info - Message information object
 * @param {string} info.senderId - ID of the customer sending the message
 * @param {string} info.receiverId - ID of the seller receiving the message
 * @param {string} info.message - Text content of the message
 * @param {string} info.senderName - Display name of the sender
 * @returns {Promise<Object>} Promise resolving to:
 *   - message: The sent message object with timestamp and IDs
 * @throws {Object} API error response with error details
 */
export const send_message = createAsyncThunk(
  "chat/send_message",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        "/chat/customer/send-message-to-seller",
        info
      );
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End of send_message thunk

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
    // Action to update messages in the state
    updateMessage: (state, { payload }) => {
      state.fb_messages = [...state.fb_messages, payload];
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle add_friend action states
      .addCase(add_friend.fulfilled, (state, { payload }) => {
        state.fb_messages = payload.messages; // Display success message
        state.currentFd = payload.currentFriend; // Update state with current friend ID
        state.my_friends = payload.MyFriends; // Update friends list
      })
      // Handle send_message action states
      .addCase(send_message.fulfilled, (state, { payload }) => {
        let tempFriends = state.my_friends;
        let index = tempFriends.findIndex(
          (f) => f.fdId === payload.message.receiverId
        );
        while (index > 0) {
          let temp = tempFriends[index];
          tempFriends[index] = tempFriends[index - 1];
          tempFriends[index - 1] = temp;
          index--;
        }

        state.my_friends = tempFriends;
        state.fb_messages = [...state.fb_messages, payload.message];
        state.successMessage = "Message Sent Successfully"; // Display success message
      });
  },
});

export const { messageClear, updateMessage } = chatReducer.actions;
export default chatReducer.reducer;

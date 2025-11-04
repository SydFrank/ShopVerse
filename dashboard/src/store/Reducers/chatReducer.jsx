import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./../../api/api";

/**
 * Async Thunk: Get Customers
 * ------------------------
 * Fetches the list of customers for a specific seller from the backend.
 * Used in chat functionality to get customers that the seller can communicate with.
 *
 * @param {string} sellerId - The ID of the seller to get customers for
 * @param {Function} rejectWithValue - Dispatches a rejected action with custom error
 * @param {Function} fulfillWithValue - Dispatches a fulfilled action with custom payload
 * @returns {Object} Response data or error
 */
export const get_customers = createAsyncThunk(
  "chat/get_customers",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      // Make a GET request to fetch customers for the specified seller
      const { data } = await api.get(`/chat/seller/get-customers/${sellerId}`, {
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
// End of get_customers thunk

/**
 * Async Thunk: Get Customer Message
 * ------------------------
 * Fetches chat messages between a seller and a specific customer from the backend.
 * Used to load the conversation history when a seller clicks on a customer in the chat interface.
 *
 * @param {string} customerId - The ID of the customer to get messages for
 * @param {Function} rejectWithValue - Dispatches a rejected action with custom error
 * @param {Function} fulfillWithValue - Dispatches a fulfilled action with custom payload
 * @returns {Object} Response data containing messages and customer info, or error
 */
export const get_customer_message = createAsyncThunk(
  "chat/get_customer_message",
  async (customerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      // Make a GET request to fetch chat messages between seller and the specified customer
      const { data } = await api.get(
        `/chat/seller/get-customer-message/${customerId}`,
        {
          withCredentials: true, // Include cookies for authentication/session
        }
      );
      // On success, dispatch the fulfilled action with the server's response data
      // Response typically contains: { messages: [], currentCustomer: {} }
      return fulfillWithValue(data);
    } catch (error) {
      // On error, dispatch the rejected action with the backend error message
      return rejectWithValue(error.response.data);
    }
  }
);
// End of get_customer_message thunk

/**
 * Async Thunk: Send Message
 * ------------------------
 * Sends a chat message from a seller to a customer through the backend API.
 * Used when a seller types and sends a message in the chat interface.
 *
 * @param {Object} info - Message information object containing:
 *   - senderId: ID of the seller sending the message
 *   - receiverId: ID of the customer receiving the message
 *   - text: The message content/text
 *   - senderName: Name of the seller
 * @param {Function} rejectWithValue - Dispatches a rejected action with custom error
 * @param {Function} fulfillWithValue - Dispatches a fulfilled action with custom payload
 * @returns {Object} Response data containing the sent message, or error
 */
export const send_message = createAsyncThunk(
  "chat/send_message",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      // Make a POST request to send a chat message from seller to customer
      const { data } = await api.post(
        `/chat/seller/send-message-to-customer`,
        info,
        {
          withCredentials: true, // Include cookies for authentication/session
        }
      );
      // On success, dispatch the fulfilled action with the server's response data
      // Response typically contains: { message: { id, text, senderId, receiverId, createdAt, ... } }
      return fulfillWithValue(data);
    } catch (error) {
      // On error, dispatch the rejected action with the backend error message
      return rejectWithValue(error.response.data);
    }
  }
);
// End of send_message thunk

/**
 * Async Thunk: Get Sellers
 * Fetches the list of sellers for the admin from the backend.
 * Used in chat functionality to get sellers that the admin can communicate with.
 *
 * @param {Function} rejectWithValue - Dispatches a rejected action with custom error
 * @param {Function} fulfillWithValue - Dispatches a fulfilled action with custom payload
 * @returns {Object} Response data or error
 */
export const get_sellers = createAsyncThunk(
  "chat/get_sellers",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      // Make a GET request to fetch sellers for the specified customer
      const { data } = await api.get(`/chat/admin/get-sellers`, {
        withCredentials: true, // Include cookies for authentication/session
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End of get_sellers thunk

/**
 * Async Thunk: Send Message Seller Admin
 * ------------------------
 * Sends a chat message from admin to a seller through the backend API.
 * Used when an admin types and sends a message in the chat interface.
 * @param {Object} info - Message information object containing:
 *  - senderId: ID of the admin sending the message
 * - receiverId: ID of the seller receiving the message
 * - message: The message content/text
 * - senderName: Name of the admin
 * @param {Function} rejectWithValue - Dispatches a rejected action with custom error
 * @param {Function} fulfillWithValue - Dispatches a fulfilled action with custom payload
 * @returns {Object} Response data containing the sent message, or error
 */
export const send_message_seller_admin = createAsyncThunk(
  "chat/send_message_seller_admin",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      // Make a POST request to send a message from seller to admin
      const { data } = await api.post(`/chat/message-send-seller-admin`, info, {
        withCredentials: true, // Include cookies for authentication/session
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End of send_message_seller_admin thunk

/**
 * Async Thunk: Get Admin Message
 * ------------------------
 * Fetches chat messages between admin and a specific seller from the backend.
 * Used to load the conversation history when an admin clicks on a seller in the chat interface.
 * @param {string} receiverId - The ID of the seller to get messages for
 * @param {Function} rejectWithValue - Dispatches a rejected action with custom error
 * @param {Function} fulfillWithValue - Dispatches a fulfilled action with custom payload
 * @returns {Object} Response data containing messages and seller info, or error
 */
export const get_admin_message = createAsyncThunk(
  "chat/get_admin_message",
  async (receiverId, { rejectWithValue, fulfillWithValue }) => {
    try {
      // Make a GET request to fetch chat messages between seller and admin
      const { data } = await api.get(`/chat/get-admin-messages/${receiverId}`, {
        withCredentials: true, // Include cookies for authentication/session
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End of get_admin_message thunk

/**
 * Async Thunk: Get Seller Message
 * ------------------------
 * Fetches chat messages between seller and admin from the backend.
 * Used to load the conversation history for the seller in the chat interface.
 * @param {Function} rejectWithValue - Dispatches a rejected action with custom error
 * @param {Function} fulfillWithValue - Dispatches a fulfilled action with custom payload
 * @returns {Object} Response data containing messages, or error
 */
export const get_seller_message = createAsyncThunk(
  "chat/get_seller_message",
  async (receiverId, { rejectWithValue, fulfillWithValue }) => {
    try {
      // Make a GET request to fetch chat messages between seller and admin
      const { data } = await api.get(`/chat/get-seller-messages`, {
        withCredentials: true, // Include cookies for authentication/session
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End of get_seller_message thunk

/**
 * Chat Redux Slice
 * ----------------
 * Manages the chat state including customers, messages, active users, and sellers.
 * Handles chat-related actions and state updates for the messaging functionality.
 */
const chatReducer = createSlice({
  name: "chat",
  initialState: {
    successMessage: "", // Stores success status messages
    errorMessage: "", // Stores backend errors or rejection reasons
    customers: [], // List of customers for the seller
    messages: [], // Chat messages
    activeCustomer: [], // Currently active customers
    activeSeller: [], // Currently active sellers
    activeAdmin: "", // Currently active admin
    friends: [], // Friend list for chat
    seller_admin_message: [], // Messages between seller and admin
    currentSeller: {}, // Current seller information
    currentCustomer: {}, // Current customer information
    sellers: [], // List of sellers
  },

  reducers: {
    /**
     * Clears error and success messages from the state.
     * Typically used after displaying messages to the user.
     */
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    // New reducer to update messages with incoming message
    updateMessage: (state, { payload }) => {
      state.messages = [...state.messages, payload];
    },
    // New reducer to update sellers list
    updateSellers: (state, { payload }) => {
      state.activeSeller = payload;
    },
    // New reducer to update customers list
    updateCustomer: (state, { payload }) => {
      state.activeCustomer = payload;
    },
    // New reducer to update messages with incoming message
    updateAdminMessage: (state, { payload }) => {
      state.seller_admin_message = [...state.seller_admin_message, payload];
    },
    // New reducer to update messages with incoming message
    updateSellerMessage: (state, { payload }) => {
      state.seller_admin_message = [...state.seller_admin_message, payload];
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle get_customers fulfilled action
      .addCase(get_customers.fulfilled, (state, { payload }) => {
        state.customers = payload.customers; // Update customers list with fetched data
      })
      // Handle get_customer_message fulfilled action
      .addCase(get_customer_message.fulfilled, (state, { payload }) => {
        state.messages = payload.messages;
        state.currentCustomer = payload.currentCustomer;
      })
      // Handle send_message fulfilled action
      .addCase(send_message.fulfilled, (state, { payload }) => {
        let tempFriends = state.customers;
        let index = tempFriends.findIndex(
          (f) => f.fdId === payload.message.receiverId
        );
        while (index > 0) {
          let temp = tempFriends[index];
          tempFriends[index] = tempFriends[index - 1];
          tempFriends[index - 1] = temp;
          index--;
        }

        state.customers = tempFriends;
        state.messages = [...state.messages, payload.message];
        state.successMessage = "Message Sent Successfully"; // Display success message
      })
      // Handle get_sellers fulfilled action
      .addCase(get_sellers.fulfilled, (state, { payload }) => {
        state.sellers = payload.sellers;
      })
      // Handle send_message_seller_admin fulfilled action
      .addCase(send_message_seller_admin.fulfilled, (state, { payload }) => {
        state.seller_admin_message = [
          ...state.seller_admin_message,
          payload.message,
        ];
        state.successMessage = "Message Sent Successfully"; // Display success message
      })
      // Handle get_admin_message fulfilled action
      .addCase(get_admin_message.fulfilled, (state, { payload }) => {
        state.seller_admin_message = payload.messages;
        state.currentSeller = payload.currentSeller;
      })
      // Handle get_seller_message fulfilled action
      .addCase(get_seller_message.fulfilled, (state, { payload }) => {
        state.seller_admin_message = payload.messages;
      });
  },
});

export const {
  messageClear,
  updateMessage,
  updateSellers,
  updateCustomer,
  updateAdminMessage,
  updateSellerMessage,
} = chatReducer.actions;
export default chatReducer.reducer;

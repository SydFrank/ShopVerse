import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./../../api/api";
import { jwtDecode } from "jwt-decode";
/**
 * Async Thunk: Admin Login
 * ------------------------
 * Sends login credentials to the backend and handles the login flow.
 * Uses axios (via `api`) to post credentials.
 * Automatically generates pending, fulfilled, and rejected action types.
 *
 * @param {Object} info - Login payload (e.g. { email, password }).
 * @param {Function} rejectWithValue - Dispatches a rejected action with custom error.
 * @param {Function} fulfillWithValue - Dispatches a fulfilled action with custom payload.
 * @returns {Object} Response data or error.
 */

export const admin_login = createAsyncThunk(
  "auth/admin_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/admin-login", info, {
        withCredentials: true, // Include cookies for authentication/session
      });
      // Store access token in localStorage to persist authentication across sessions
      localStorage.setItem("accessToken", data.token);
      // console.log(data);
      return fulfillWithValue(data); // Dispatch success
    } catch (error) {
      // console.log(error.response.data);
      return rejectWithValue(error.response.data); // Return backend error message
    }
  },
);
// End of admin_login async thunk

/**
 * Async Thunk: Seller Login
 * ------------------------
 * Sends login credentials to the backend and handles the login flow.
 * Uses axios (via `api`) to post credentials.
 * Automatically generates pending, fulfilled, and rejected action types.
 *
 * @param {Object} info - Login payload (e.g. { email, password }).
 * @param {Function} rejectWithValue - Dispatches a rejected action with custom error.
 * @param {Function} fulfillWithValue - Dispatches a fulfilled action with custom payload.
 * @returns {Object} Response data or error.
 */

export const seller_login = createAsyncThunk(
  "auth/seller_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/seller-login", info, {
        withCredentials: true, // Include cookies for authentication/session
      });
      // Store access token in localStorage to persist authentication across sessions
      localStorage.setItem("accessToken", data.token);
      // console.log(data);
      return fulfillWithValue(data); // Dispatch success
    } catch (error) {
      // console.log(error.response.data);
      return rejectWithValue(error.response.data); // Return backend error message
    }
  },
);
// End of seller_login async thunk

/**
 * Async Thunk: Seller Register
 * ------------------------
 * Sends registration credentials to the backend and handles the registration flow.
 * Uses axios (via `api`) to post credentials.
 * Automatically generates pending, fulfilled, and rejected action types.
 *
 * @param {Object} info - Registration payload (e.g. { email, password }).
 * @param {Function} rejectWithValue - Dispatches a rejected action with custom error.
 * @param {Function} fulfillWithValue - Dispatches a fulfilled action with custom payload.
 * @returns {Object} Response data or error.
 */

export const seller_register = createAsyncThunk(
  "auth/seller_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/seller-register", info, {
        withCredentials: true, // Include cookies for authentication/session
      });
      // Store access token in localStorage to persist authentication across sessions
      console.log(data);
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data); // Dispatch success
    } catch (error) {
      // console.log(error.response.data);
      return rejectWithValue(error.response.data); // Return backend error message
    }
  },
);
// End of seller_register async thunk

/**
 * Async Thunk: Get User Info
 * ------------------------
 * Fetches user information from the backend.
 * Uses axios (via `api`) to get user data.
 * Automatically generates pending, fulfilled, and rejected action types.
 *
 * @param {Object} info - Login payload (e.g. { email, password }).
 * @param {Function} rejectWithValue - Dispatches a rejected action with custom error.
 * @param {Function} fulfillWithValue - Dispatches a fulfilled action with custom payload.
 * @returns {Object} Response data or error.
 */

export const get_user_info = createAsyncThunk(
  "auth/get_user_info",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    // console.log(info);
    try {
      const { data } = await api.get("/get-user", {
        withCredentials: true, // Include cookies for authentication/session
      });
      // Store access token in localStorage to persist authentication across sessions
      // localStorage.setItem("accessToken", data.token);
      // console.log(data);
      return fulfillWithValue(data); // Dispatch success
    } catch (error) {
      // console.log(error.response.data);
      return rejectWithValue(error.response.data); // Return backend error message
    }
  },
);
// End of get_user_info async thunks

/**
 * Async Thunk: Profile Image Upload
 * ------------------------
 * Uploads a profile image to the backend.
 * Uses axios (via `api`) to post the image data.
 * Automatically generates pending, fulfilled, and rejected action types.
 *
 * @param {Object} info - Profile image data (e.g. { imageFile }).
 * @param {Function} rejectWithValue - Dispatches a rejected action with custom error.
 * @param {Function} fulfillWithValue - Dispatches a fulfilled action with custom payload.
 * @returns {Object} Response data or error.
 */

export const profile_image_upload = createAsyncThunk(
  "auth/profile_image_upload",
  async (image, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/profile-image-upload", image, {
        withCredentials: true, // Include cookies for authentication/session
      });
      return fulfillWithValue(data); // Dispatch success
    } catch (error) {
      return rejectWithValue(error.response.data); // Return backend error message
    }
  },
);
// End of profile_image_upload async thunks

/**
 * Async Thunk: profile Info add
 * ------------------------
 * Adds or updates user profile information.
 * Uses axios (via `api`) to post the user info.
 * Automatically generates pending, fulfilled, and rejected action types.
 *
 * @param {Object} info - Profile form data (e.g. shopname,
    division,district,sub_district).
 * @param {Function} rejectWithValue - Dispatches a rejected action with custom error.
 * @param {Function} fulfillWithValue - Dispatches a fulfilled action with custom payload.
 * @returns {Object} Response data or error.
 */

export const profile_info_add = createAsyncThunk(
  "auth/profile_info_add",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/profile-info-add", info, {
        withCredentials: true, // Include cookies for authentication/session
      });
      return fulfillWithValue(data); // Dispatch success
    } catch (error) {
      return rejectWithValue(error.response.data); // Return backend error message
    }
  },
);
// End of profile_info_add async thunks

/**
 * Helper function: returnRole
 * ---------------------------
 * Decodes a JWT token to determine the user's role and checks if the token is expired.
 * If expired, removes token from localStorage and returns an empty string.
 * Otherwise, returns the user's role (e.g. "admin", "seller").
 *
 * @param {string} token - JWT token string.
 * @returns {string} User role or empty string if invalid/expired.
 */

const returnRole = (token) => {
  if (token) {
    const decodeToken = jwtDecode(token);
    const expireTime = new Date(decodeToken.exp * 1000);
    // Check if token is expired
    if (new Date() > expireTime) {
      localStorage.removeItem("accessToken");
      return ""; // Return empty if token is expired
    } else {
      return decodeToken.role; // Return role if token is valid
    }
  } else {
    return ""; // Return empty if no token is present
  }
};
// End of returnRole function

/**
 * Async Thunk: Logout
 * ------------------------
 * Logs out the user by calling the backend logout endpoint.
 * Uses axios (via `api`) to get the logout request.
 * Automatically generates pending, fulfilled, and rejected action types.
 * @param {Object} navigate - Navigation function to redirect user after logout.
 * @param {string} role - User role to determine redirect path.
 * @param {Function} rejectWithValue - Dispatches a rejected action with custom error.
 * @param {Function} fulfillWithValue - Dispatches a fulfilled action with custom payload.
 * @returns {Object} Response data or error.
 */
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/logout", {
        withCredentials: true, // Include cookies for authentication/session
      });
      localStorage.removeItem("accessToken");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

/**
 * Async Thunk: Change Password
 * ------------------------
 * Changes the user's password by sending the old and new passwords to the backend.
 * Uses axios (via `api`) to post the password change request.
 * Automatically generates pending, fulfilled, and rejected action types.
 * @param {Object} info - Password change data (e.g. { old_password, new_password }).
 * @param {Function} rejectWithValue - Dispatches a rejected action with custom error.
 * @param {Function} fulfillWithValue - Dispatches a fulfilled action with custom payload.
 * @returns {Object} Response data or error.
 */
export const change_password = createAsyncThunk(
  "auth/change_password",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/change-password", info, {
        withCredentials: true, // Include cookies for authentication/session
      });
      return fulfillWithValue(data.message); // Dispatch success
    } catch (error) {
      return rejectWithValue(error.response.data.message); // Return backend error message
    }
  },
);
// End of change_password async thunk

/**
 * The `auth` slice of the global Redux state.
 *
 * - `name`: Unique name for the slice.
 * - `initialState`: Defines the default values for the auth state.
 * - `reducers`: Synchronous reducers will be added here (e.g. logout, clearErrors).
 * - `extraReducers`: Place to handle async actions (e.g. login via createAsyncThunk).
 */

const authSlice = createSlice({
  name: "auth",
  initialState: {
    successMessage: "", // Stores success status (e.g. "Login successful")
    errorMessage: "", // Stores backend errors or rejection reasons
    loader: false, // Indicates if login request is in progress
    userInfo: "", // Can later be used to store admin data (e.g. token, name)
    role: returnRole(localStorage.getItem("accessToken")), // User role (e.g. admin, seller)
    token: localStorage.getItem("accessToken"), // Stores JWT token for authenticated requests
  },

  reducers: {
    /**
     * Clears error messages from the state, typically used on component unmount
     * or before submitting a new request.
     */
    messageClear: (state, _) => {
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Handles admin login async flow
      .addCase(admin_login.pending, (state) => {
        state.loader = true; // Start loader when login is in progress
      })
      .addCase(admin_login.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error; // Store backend error
      })
      .addCase(admin_login.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.token = payload.token; // Store JWT token
        state.role = returnRole(payload.token); // Update role based on token
      })
      // Handles seller registration async flow
      .addCase(seller_register.pending, (state) => {
        state.loader = true; // Start loader when login is in progress
      })
      .addCase(seller_register.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error; // Store backend error
      })
      .addCase(seller_register.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.token = payload.token; // Store JWT token
        state.role = returnRole(payload.token); // Update role based on token
      })
      // Handles seller login async flow
      .addCase(seller_login.pending, (state) => {
        state.loader = true; // Start loader when login is in progress
      })
      .addCase(seller_login.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error; // Store backend error
      })
      .addCase(seller_login.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.token = payload.token; // Store JWT token
        state.role = returnRole(payload.token); // Update role based on token
      })
      // Handles user info fetch async flow
      .addCase(get_user_info.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.userInfo; // Store user info from backend
      })
      // Handles profile image upload async flow
      .addCase(profile_image_upload.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(profile_image_upload.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.userInfo; // Store user info from backend
        state.successMessage = payload.message;
      })
      // Handles profile info add async flow
      .addCase(profile_info_add.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(profile_info_add.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.userInfo; // Store user info from backend
        state.successMessage = payload.message;
      })
      // Handles change password async flow
      .addCase(change_password.pending, (state) => {
        state.loader = true;
        state.errorMessage = null;
      })
      .addCase(change_password.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload; // Store backend error message
      })
      .addCase(change_password.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload;
      });
    // Handles logout async flow
    // .addCase(logout.fulfilled, (state) => {
    //   state.userInfo = "";
    //   state.role = "";
    //   state.token = null;
    //   state.successMessage = "";
    //   state.errorMessage = "";
    //   state.loader = false;
    // });
  },
});

export const authReducer = authSlice.reducer;
export const { messageClear } = authSlice.actions;
export default authReducer;

/**
 * Redux Store Configuration - Central State Management for ShopVerse
 *
 * This file configures the Redux store for the ShopVerse e-commerce application.
 * It uses Redux Toolkit's configureStore function to create a centralized store
 * that manages the application's state across all components. The store includes
 * middleware configuration, development tools integration, and root reducer setup.
 *
 * Key Features:
 * - Redux Toolkit integration for simplified state management
 * - Custom middleware configuration with serializability checks disabled
 * - Development tools integration for debugging and time-travel debugging
 * - Root reducer composition for modular state management
 * - Production-ready store configuration with optimizations
 *
 * @module Store
 */

// Redux Toolkit imports for modern Redux store configuration
import { configureStore } from "@reduxjs/toolkit"; // Modern Redux store configuration utility

// Root reducer import that combines all feature reducers
import rootReducer from "./rootReducer"; // Combined reducer containing all application state slices

/**
 * Redux Store Configuration
 * Creates and configures the main Redux store for the ShopVerse application.
 *
 * Store Configuration:
 * - Uses root reducer to manage all application state
 * - Disables serializable check for complex data types (files, dates, etc.)
 * - Enables Redux DevTools for development debugging
 * - Applies default middleware with custom configurations
 */
const store = configureStore({
  // Root reducer that combines all feature-specific reducers
  reducer: rootReducer,

  // Middleware configuration function
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      // Disable serializable check to allow non-serializable values
      // (useful for file uploads, dates, and other complex objects)
      serializableCheck: false,
    });
  },

  // Enable Redux DevTools for development debugging and time-travel
  devTools: true,
});

// Export the configured store for use in the application
export default store;

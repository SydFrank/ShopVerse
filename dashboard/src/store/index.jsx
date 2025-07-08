/**
 * Redux Store Configuration
 * --------------------------
 * This file sets up the centralized Redux store using Redux Toolkit's
 * `configureStore` utility. It integrates all root-level reducers,
 * applies necessary middleware configurations, and enables Redux DevTools
 * for easier debugging during development.
 */

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducers";

/**
 * Create the Redux store instance.
 *
 * - `reducer`: The root reducer that combines all feature reducers.
 * - `middleware`: Customizes default middleware to disable serializable checks,
 *    which may be necessary when using non-serializable values like FormData, Date, etc.
 * - `devTools`: Enables Redux DevTools extension support for development debugging.
 */

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
  devTools: true,
});

export default store;

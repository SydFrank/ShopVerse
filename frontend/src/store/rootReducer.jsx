/**
 * Root Reducer Configuration - Central State Management Composition
 *
 * This file serves as the central hub for combining all feature-specific reducers
 * in the ShopVerse e-commerce application. It creates a unified state tree by
 * composing individual reducers into a single root reducer object. This modular
 * approach allows for organized state management where each feature has its own
 * dedicated reducer while maintaining a cohesive application state structure.
 *
 * Key Features:
 * - Modular state management through feature-specific reducers
 * - Centralized state tree composition for the entire application
 * - Scalable architecture that supports easy addition of new reducers
 * - Clear separation of concerns between different application features
 * - Type-safe state structure with predictable state shape
 *
 * @module RootReducer
 */

// Feature-specific reducer imports
import homeReducer from "./reducers/homeReducer";
import authReducer from "./reducers/authReducer";
import cartReducer from "./reducers/cartReducer";

/**
 * Root Reducer Object
 * Combines all feature-specific reducers into a single state tree.
 * Each key represents a slice of the application state, and its corresponding
 * reducer manages that specific portion of the state.
 * To add new reducers:
 * 1. Import the new reducer
 * 2. Add it as a new key-value pair in the rootReducer object
 * 3. The state will be automatically available as state.keyName in components
 */

const rootReducer = {
  home: homeReducer,
  auth: authReducer,
  cart: cartReducer,
};

// Export the composed root reducer for use in store configuration
export default rootReducer;

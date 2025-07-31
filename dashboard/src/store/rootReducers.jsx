/**
 * Root Reducer Configuration
 * ---------------------------
 * This file defines the root-level reducer object by combining
 * all individual slice reducers. Each key in this object represents
 * a top-level field in the global Redux state tree.
 *
 * Example:
 * {
 *   auth: authReducer,
 *   // otherFeature: otherReducer,
 * }
 */

import { authReducer } from "./Reducers/authReducer";
import categoryReducer from "./Reducers/categoryReducer";

/**
 * Combines all feature slice reducers into a single root reducer object.
 *
 * - `auth`: Handles authentication-related state (e.g., user info, login status, messages).
 *
 * You can add additional reducers here as your application grows.
 */

const rootReducer = {
  auth: authReducer,
  category: categoryReducer,
};

export default rootReducer;

/**
 * Main Application Entry Point - ShopVerse E-commerce Frontend
 *
 * This file serves as the main entry point for the ShopVerse React application.
 * It initializes the React application with all necessary providers, configurations,
 * and global components. The file sets up the Redux store provider for state management,
 * React Suspense for code splitting and lazy loading, and toast notifications for
 * user feedback throughout the application.
 *
 * Key Integrations:
 * - React 18 with createRoot API for improved performance
 * - Redux Provider for centralized state management
 * - React Suspense for lazy loading and code splitting
 * - React Hot Toast for user notifications and feedback
 * - Global CSS styles import for application-wide styling
 * - Production-ready configuration for deployment
 *
 * @module MainEntry
 */

// React core imports for application initialization
import { Suspense } from "react"; // React Suspense for lazy loading and code splitting
import { createRoot } from "react-dom/client"; // React 18 createRoot API for improved rendering

// Global styles import
import "./index.css"; // Application-wide CSS styles and Tailwind CSS configuration

// Main application component
import App from "./App.jsx"; // Root application component containing all routes and layout

// Redux imports for state management
import { Provider } from "react-redux"; // Redux Provider component for state management context
import store from "./store/index.jsx"; // Configured Redux store with all reducers and middleware

// Toast notification system
import { Toaster } from "react-hot-toast"; // Toast notification component for user feedback

/**
 * Application Initialization and Rendering
 *
 * Creates the React root using the new React 18 createRoot API and renders
 * the complete application with all necessary providers and configurations.
 *
 * Component Tree Structure:
 * - Provider: Redux state management context
 *   - Suspense: Code splitting and lazy loading wrapper
 *     - App: Main application component with routing
 *     - Toaster: Global toast notification system
 */
createRoot(document.getElementById("root")).render(
  // Redux Provider wraps the entire application for state management access
  <Provider store={store}>
    {/* Suspense wrapper enables code splitting and lazy loading throughout the app */}
    <Suspense>
      {/* Main application component containing all routes and layouts */}
      <App />

      {/* Global toast notification system with custom styling */}
      <Toaster
        toastOptions={{
          position: "top-right", // Position toasts in the top-right corner
          style: {
            background: "#283046", // Dark background for better visibility
            color: "white", // White text for good contrast
          },
        }}
      />
    </Suspense>
  </Provider>
);

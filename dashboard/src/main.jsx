/**
 * Application Entry Point
 * ------------------------
 * This file serves as the entry point for the React application.
 * It initializes the root DOM node and wraps the entire app with:
 *
 * - `BrowserRouter` for client-side routing
 * - `Provider` for Redux global state management
 * - `Suspense` for code-splitting with lazy-loaded components
 * - `Toaster` for global toast notifications
 */

import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.jsx";
import { Toaster } from "react-hot-toast";

// lazy load
const App = lazy(() => import("./App.jsx"));

// Mount the React app to the root DOM node
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense>
        <App />
        <Toaster
          toastOptions={{
            position: "top-right",
            style: {
              background: "#283046",
              color: "white",
            },
          }}
        />
      </Suspense>
    </Provider>
  </BrowserRouter>
);

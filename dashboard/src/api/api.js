/**
 * API Configuration - Centralized HTTP Client for ShopVerse
 *
 * This file configures and exports a centralized Axios instance for making HTTP requests
 * to the ShopVerse backend API. It provides a consistent base configuration for all
 * API calls throughout the application, including the base URL, default headers,
 * and any necessary interceptors for request/response handling.
 *
 * Key Features:
 * - Centralized API configuration for consistent HTTP requests
 * - Base URL configuration for backend server communication
 * - Reusable Axios instance for all API calls in the application
 * - Extensible configuration for adding interceptors, headers, and middleware
 * - Environment-specific configuration support for development and production
 *
 * Usage:
 * - Import this configured API instance in service files or components
 * - Use standard Axios methods: api.get(), api.post(), api.put(), api.delete()
 * - Base URL is automatically prepended to all requests
 *
 * @module APIClient
 */

// Axios import for HTTP client functionality
import axios from "axios"; // Popular HTTP client library for making API requests

// Local development server URL for testing and development
const local = "http://localhost:5000";

// Production server URL - update this with actual production domain
// Example: "https://api.shopverse.com" or "https://your-domain.com"

const production = "https://shopverse-backend-udx5.onrender.com";

let api_url = "";
let mode = "pro";
if (mode === "pro") {
  api_url = production;
} else {
  api_url = local;
}

const api = axios.create({
  baseURL: `${api_url}/api`,
  withCredentials: true, // Include cookies in requests for authentication
});

export default api;

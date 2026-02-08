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

/**
 * Configured Axios Instance
 *
 * Creates a pre-configured Axios instance with base settings for the ShopVerse API.
 * This instance can be used throughout the application for consistent API communication.
 *
 * Configuration:
 * - baseURL: Points to the local development server on port 5000
 * - Future enhancements: Can include default headers, timeout, interceptors
 *
 * Development vs Production:
 * - Currently configured for local development (localhost:5000)
 * - Should be updated with environment variables for production deployment
 * - Consider using process.env.REACT_APP_API_BASE_URL for flexibility
 */

/**
 * Environment Configuration Variables
 *
 * Defines base URLs for different deployment environments to enable
 * easy switching between development, staging, and production servers.
 */

// Local development server URL for testing and development
const local = "http://localhost:5000";

// Production server URL - update this with actual production domain
// Example: "https://api.shopverse.com" or "https://your-domain.com"
// eslint-disable-next-line no-unused-vars
// Note: Currently set to localhost for testing, should be updated for production
const production = "https://backend-shopverse.onrender.com";

// Variable to hold the selected API base URL based on the environment
let api_url = "";
let mode = "pro";
// Determine the API base URL based on the current environment
if (mode === "pro") {
  api_url = production;
} else {
  api_url = local;
}

/**
 * Configured Axios Instance
 *
 * Creates a pre-configured Axios instance with base settings for the ShopVerse API.
 * This instance can be used throughout the application for consistent API communication.
 *
 * Configuration:
 * - baseURL: Dynamically set based on environment (currently using local)
 * - Future enhancements: Can include default headers, timeout, interceptors
 *
 * Environment Switching:
 * - Development: Uses local variable (localhost:5000)
 * - Production: Should use production variable when deployed
 * - Consider using process.env.NODE_ENV for automatic environment detection
 */
const api = axios.create({
  // Base URL for all API requests - dynamically constructed from environment variables
  // Currently uses local development server, switch to production for deployment
  baseURL: `${api_url}/api`,

  // Additional configuration options can be added here:
  // timeout: 10000, // Request timeout in milliseconds
  // headers: { 'Content-Type': 'application/json' }, // Default headers
  // withCredentials: true, // Include cookies in cross-origin requests
});

// Export the configured API instance for use throughout the application
export default api;

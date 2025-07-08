/**
 * Creates an Axios instance to encapsulate API requests.
 *
 * Configuration details:
 * - baseURL: The base URL for all requests, allowing centralized management of the API endpoint.
 *   Here, it is set to the local development server at "http://localhost:5173/api".
 *
 * Usage:
 * - Use this instance to send HTTP requests throughout the project, avoiding repetition of full URLs.
 * - Allows easy extension for adding interceptors, timeout settings, and other configurations in the future.
 */

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5173/api",
});

export default api;

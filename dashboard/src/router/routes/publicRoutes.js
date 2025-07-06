/**
 * Public Routes Configuration
 * ---------------------------
 * This module exports an array of route objects representing
 * all publicly accessible routes in the application.
 * These routes do not require user authentication.
 *
 * Each route object contains:
 *  - path: the URL path string
 *  - element: the React component to render for the route
 *
 * Used by the router to define which components render on specific URLs.
 */

import Login from "./../../views/auth/Login";

const publicRoutes = [
  {
    path: "/login", // URL path for the login page
    element: <Login />, // React component render whrn this route is matched
  },
  {
    path: "/register", //  URL path for the register page
    element: <Register />, // React component render whrn this route is matched
  },
];

export default publicRoutes;

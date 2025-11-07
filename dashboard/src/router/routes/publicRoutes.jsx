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

import { lazy } from "react";

const Login = lazy(() => import("../../views/auth/Login"));
const Register = lazy(() => import("../../views/auth/Register"));
const AdminLogin = lazy(() => import("../../views/auth/adminLogin"));
const Home = lazy(() => import("../../views/Home"));
const Unauthorized = lazy(() => import("../../views/Unauthorized"));
const Success = lazy(() => import("../../views/Success"));

const publicRoutes = [
  {
    path: "/", // Home page path
    element: <Home />, // Home page component
  },
  {
    path: "/login", // URL path for the login page
    element: <Login />, // React component render when this route is matched
  },
  {
    path: "/register", //  URL path for the register page
    element: <Register />, // React component render when this route is matched
  },
  {
    path: "/admin/login", //  URL path for the register page
    element: <AdminLogin />, // React component render when this route is matched
  },
  {
    path: "/unauthorized", //  URL path for the unauthorized page
    element: <Unauthorized />, // React component render when this route is matched
  },
  {
    path: "/success?", //  URL path for the success page
    element: <Success />, // React component render when this route is matched
  },
];

export default publicRoutes;

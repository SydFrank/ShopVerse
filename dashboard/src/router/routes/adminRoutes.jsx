import { lazy } from "react";

// Lazy load admin dashboard and management views for performance optimization
const AdminDashboard = lazy(() => import("../../views/admin/adminDashboard"));
const Orders = lazy(() => import("../../views/admin/Orders"));
const Category = lazy(() => import("../../views/admin/Category"));
const Seller = lazy(() => import("../../views/admin/Seller"));

/**
 * adminRoutes
 *
 * Defines the routing configuration for the admin dashboard and its management pages.
 * Each route is protected and only accessible to users with the 'admin' role.
 *
 * - path: The URL path for the route
 * - element: The React component to be rendered (lazy loaded)
 * - role: The required user role to access the route
 */

export const adminRoutes = [
  {
    path: "admin/dashboard", // Admin dashboard path
    element: <AdminDashboard />, // Admin dashboard component
    role: "admin", // Accessible by admin role only
  },
  {
    path: "admin/dashboard/orders", // Admin orders management path
    element: <Orders />, // Admin orders component
    role: "admin", // Accessible by admin role only
  },
  {
    path: "admin/dashboard/category", // Admin category management path
    element: <Category />, // Admin category component
    role: "admin", // Accessible by admin role only
  },
  {
    path: "admin/dashboard/sellers", // Admin seller management path
    element: <Seller />, // Admin seller component
    role: "admin", // Accessible by admin role only
  },
];

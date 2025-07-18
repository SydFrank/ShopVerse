import { lazy } from "react";

const AdminDashboard = lazy(() => import("../../views/admin/adminDashboard"));
const Orders = lazy(() => import("../../views/admin/Orders"));
const Category = lazy(() => import("../../views/admin/Category"));

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
];

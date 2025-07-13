import { lazy } from "react";

const AdminDashboard = lazy(() => import("../../views/admin/adminDashboard"));

export const adminRoutes = [
  {
    path: "admin/dashboard", // Admin dashboard path
    element: <AdminDashboard />, // Admin dashboard component
    role: "admin", // Accessible by admin role only
  },
];

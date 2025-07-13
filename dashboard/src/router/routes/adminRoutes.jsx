import { lazy } from "react";

const Home = lazy(() => import("../../views/pages/Home"));

export const adminRoutes = [
  {
    path: "admin/dashboard", // Admin dashboard path
    element: <Home />, // Home page component
    ability: ["admin", "seller"], // Accessible by admin and seller roles
  },
];

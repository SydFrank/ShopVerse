import { lazy } from "react";

// Lazy load seller dashboard and management views for performance optimization
const Home = lazy(() => import("../../views/pages/Home"));
const SellerDashboard = lazy(() =>
  import("../../views/seller/SellerDashboard")
);

/**
 * sellerRoutes
 *
 * Defines the routing configuration for the seller dashboard and its management pages.
 * Each route is protected and only accessible to users with the 'seller' role.
 *
 * - path: The URL path for the route
 * - element: The React component to be rendered (lazy loaded)
 * - role: The required user role to access the route
 */

export const sellerRoutes = [
  {
    path: "/", // Home page path
    element: <Home />, // Home page component
    ability: ["admin", "seller"], // Accessible by admin or seller roles
  },
  {
    path: "/seller/dashboard", // Seller dashboard path
    element: <SellerDashboard />, // Seller dashboard component
    ability: ["seller"], // Accessible by seller roles
  },
];

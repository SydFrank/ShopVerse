import { lazy } from "react";

// Lazy load seller dashboard and management views for performance optimization
const Home = lazy(() => import("../../views/pages/Home"));
const SellerDashboard = lazy(() =>
  import("../../views/seller/SellerDashboard")
);
const AddProduct = lazy(() => import("../../views/seller/AddProduct"));
const Products = lazy(() => import("../../views/seller/Products"));
const DiscountProducts = lazy(() =>
  import("../../views/seller/DiscountProducts")
);
const Orders = lazy(() => import("../../views/seller/Orders"));
const Payments = lazy(() => import("../../views/seller/Payments"));

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
  {
    path: "/seller/dashboard/add-product", // Seller add product path
    element: <AddProduct />, // Add product component
    ability: ["seller"], // Accessible by seller roles
  },
  {
    path: "/seller/dashboard/all-product", // Seller products path
    element: <Products />, // Products component
    ability: ["seller"], // Accessible by seller roles
  },
  {
    path: "/seller/dashboard/discount-product", // Seller discount products path
    element: <DiscountProducts />, // Discount products component
    ability: ["seller"], // Accessible by seller roles
  },
  {
    path: "/seller/dashboard/orders", // Seller orders path
    element: <Orders />, // Orders component
    ability: ["seller"], // Accessible by seller roles
  },
  {
    path: "/seller/dashboard/payments", // Seller payments path
    element: <Payments />, // Payments component
    ability: ["seller"], // Accessible by seller roles
  },
];

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
const SellerToCustomer = lazy(() =>
  import("../../views/seller/SellerToCustomer")
);
const SellerToAdmin = lazy(() => import("../../views/seller/SellerToAdmin"));
const Profile = lazy(() => import("../../views/seller/Profile"));
const EditProduct = lazy(() => import("../../views/seller/EditProduct"));

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
    role: "seller", // Accessible by seller roles
    status: "active", // Only active sellers can access
  },
  {
    path: "/seller/dashboard/add-product", // Seller add product path
    element: <AddProduct />, // Add product component
    role: "seller", // Accessible by seller roles
    status: "active", // Only active sellers can access
  },
  {
    path: "/seller/dashboard/edit-product/:productId", // Seller edit product path
    element: <EditProduct />, // Edit product component
    role: "seller", // Accessible by seller roles
    status: "active", // Only active sellers can access
  },
  {
    path: "/seller/dashboard/all-product", // Seller products path
    element: <Products />, // Products component
    role: "seller", // Accessible by seller roles
    status: "active", // Only active sellers can access
  },
  {
    path: "/seller/dashboard/discount-product", // Seller discount products path
    element: <DiscountProducts />, // Discount products component
    role: "seller", // Accessible by seller roles
    status: "active", // Only active sellers can access
  },
  {
    path: "/seller/dashboard/orders", // Seller orders path
    element: <Orders />, // Orders component
    ability: ["active", "deactive"], // Active and deactive sellers
  },
  {
    path: "/seller/dashboard/payments", // Seller payments path
    element: <Payments />, // Payments component
    role: "seller", // Accessible by seller roles
    status: "active", // Only active sellers can access
  },
  {
    path: "/seller/dashboard/chat-support", // Seller chat to support path
    element: <SellerToAdmin />, // Chat to support component
    ability: ["active", "deactive", "pending"], // Active, deactive, and pending sellers
  },
  {
    path: "/seller/dashboard/chat-customer/:customerId", // Seller chat to customer path
    element: <SellerToCustomer />, // Chat to customer component
    role: "seller", // Accessible by seller roles
    status: "active", // Only active sellers can access
  },
  {
    path: "/seller/dashboard/chat-customer", // Seller chat to customer path
    element: <SellerToCustomer />, // Chat to customer component
    role: "seller", // Accessible by seller roles
    status: "active", // Only active sellers can access
  },
  {
    path: "/seller/dashboard/profile", // Seller profile path
    element: <Profile />, // Profile component
    role: "seller", // Accessible by seller roles
    status: "active", // Only active sellers can access
  },
];

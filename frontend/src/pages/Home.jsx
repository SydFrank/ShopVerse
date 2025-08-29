/**
 * Home Page Component - Main Landing Page for ShopVerse E-commerce
 *
 * The primary homepage component that displays the complete e-commerce landing experience.
 * This component orchestrates multiple sections including navigation, promotional banners,
 * product categories, featured products, and various product listings to create an engaging
 * shopping experience for users.
 *
 * Key Features:
 * - Dynamic category loading from Redux store
 * - Responsive layout with mobile-first design
 * - Multiple product sections (Latest, Top Rated, Discount)
 * - Category-based navigation and filtering
 * - SEO-optimized structure for better search engine visibility
 *
 * Layout Structure:
 * 1. Header with categories navigation
 * 2. Hero banner section
 * 3. Categories display
 * 4. Featured products showcase
 * 5. Product grid sections (Latest, Top Rated, Discount)
 * 6. Footer with additional links and information
 *
 * @component
 * @example
 * return (
 *   <Home />
 * )
 */

// React core imports for component functionality
import React, { useEffect } from "react"; // useEffect for side effects on component mount

// Component imports for page layout and sections
import Header from "../components/Header"; // Navigation header with search and categories
import Banner from "../components/Banner"; // Hero banner with promotional content
import Categorys from "../components/Categorys"; // Product categories display grid
import FeatureProducts from "../components/products/FeatureProducts"; // Featured products carousel/grid
import Products from "../components/products/Products"; // Reusable product listing component
import Footer from "../components/Footer"; // Site footer with links and information

// Redux imports for state management
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for dispatching actions and selecting state
import { get_category, get_products } from "../store/reducers/homeReducer"; // Async thunk action to fetch categories

/**
 * Home Component Function
 *
 * Main functional component that renders the complete homepage layout.
 * Manages category data fetching and provides a responsive, multi-section
 * e-commerce landing page experience.
 *
 * Component Lifecycle:
 * 1. Component mounts and useEffect triggers
 * 2. Dispatches get_category action to fetch categories from API
 * 3. Categories are stored in Redux state and passed to child components
 * 4. Renders complete page layout with all sections
 *
 * State Dependencies:
 * - categorys: Array of product categories from home reducer
 *
 * @function Home
 * @returns {JSX.Element} Complete homepage JSX structure
 */
const Home = () => {
  // Redux dispatch hook for triggering actions
  const dispatch = useDispatch();

  // Select categories data from home reducer state
  const {
    categorys,
    products,
    latest_product,
    topRated_product,
    discount_product,
  } = useSelector((state) => state.home);

  /**
   * Component Side Effect - Category Data Fetching
   *
   * Runs on component mount to fetch product categories from the backend.
   * Categories are essential for navigation, filtering, and displaying
   * organized product sections throughout the homepage.
   *
   * API Call Flow:
   * 1. Dispatch get_category async thunk
   * 2. API request to /home/get-categorys endpoint
   * 3. Response data stored in Redux state
   * 4. Components re-render with updated categories
   */
  useEffect(() => {
    dispatch(get_category()); // Fetch categories on component mount
    dispatch(get_products()); // Fetch products on component mount
  }, []); // Include dispatch in dependencies for React hooks compliance

  /**
   * Homepage JSX Structure
   *
   * Renders the complete e-commerce homepage with multiple sections:
   *
   * Layout Breakdown:
   * 1. Main container with full width
   * 2. Header section with categories navigation
   * 3. Hero banner for promotions and featured content
   * 4. Categories grid for product browsing
   * 5. Featured products section with padding for visual separation
   * 6. Three-column product grid (responsive design)
   * 7. Footer with site information and links
   *
   * Responsive Design:
   * - Desktop: 3-column product grid
   * - Tablet (max-lg): 2-column product grid
   * - Mobile (max-md): 1-column product grid
   */
  return (
    <div className="w-full">
      <Header categorys={categorys} />
      <Banner />
      <Categorys categorys={categorys} />

      <div className="py-[45px]">
        <FeatureProducts products={products} />
      </div>

      <div className="py-10">
        <div className="w-[85%] flex flex-wrap mx-auto">
          <div className="grid w-full grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-7 ">
            <div className="overflow-hidden">
              <Products title="Latest Product" products={latest_product} />
            </div>

            <div className="overflow-hidden">
              <Products title="Top Rated Product" products={topRated_product} />
            </div>

            <div className="overflow-hidden">
              <Products title="Discount Product" products={discount_product} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;

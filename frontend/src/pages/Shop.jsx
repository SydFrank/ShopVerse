/**
 * Shop Page Component - E-commerce Product Shopping Interface
 *
 * A comprehensive shopping page that provides customers with product browsing,
 * filtering, and purchasing capabilities. Features include category filtering,
 * price range selection, star rating filters, product view toggles (grid/list),
 * and pagination for large product catalogs.
 *
 * Key Features:
 * - Responsive design with mobile-friendly collapsible filters
 * - Category-based product filtering with checkbox selection
 * - Price range slider with dynamic min/max values from backend
 * - Star rating filter (1-5 stars) for quality-based filtering
 * - Grid/List view toggle for different product display preferences
 * - Latest products sidebar for promotional content
 * - Pagination support for large product collections
 * - Sort functionality (price low-to-high, high-to-low)
 * - Breadcrumb navigation for better user experience
 *
 * Layout Structure:
 * 1. Header with navigation and user account access
 * 2. Hero banner with page title and breadcrumb
 * 3. Main content area with sidebar filters and product grid
 * 4. Pagination controls for navigation through product pages
 * 5. Footer with additional links and information
 *
 * State Management:
 * - Uses Redux for categories, products, and price range data
 * - Local state for UI controls (filters, pagination, view mode)
 * - Responsive filter sidebar visibility for mobile devices
 *
 * @component
 * @example
 * return (
 *   <Shop />
 * )
 */

// Import React library and hooks for state management and lifecycle
import React, { useState, useEffect } from "react"; // useState for local state, useEffect for side effects
// Import layout components
import Header from "../components/Header"; // Website header component
import Footer from "../components/Footer"; // Website footer component
// Import routing and navigation components
import { Link } from "react-router-dom"; // React Router Link for navigation
import { IoIosArrowForward } from "react-icons/io"; // Forward arrow icon for breadcrumb
// Import price range slider component
import { Range } from "react-range"; // Range slider for price filtering
// Import star rating icons
import { AiFillStar } from "react-icons/ai"; // Filled star icon for ratings
import { CiStar } from "react-icons/ci"; // Empty star icon for ratings
// Import product display components
import Products from "../components/products/Products"; // Latest products sidebar component
import ShopProducts from "../components/products/ShopProducts"; // Main product grid/list component
import Pagination from "../components/Pagination"; // Pagination component
// Import layout toggle icons
import { BsFillGridFill } from "react-icons/bs"; // Grid view icon
import { FaThList } from "react-icons/fa"; // List view icon
import { useSelector, useDispatch } from "react-redux"; // Redux hooks for dispatching actions and selecting state
import {
  price_range_product,
  query_products,
} from "../store/reducers/homeReducer";

/**
 * Shop Component - Main shopping page with filters and product display
 * Features filtering by category, price range, and ratings
 * Supports both grid and list view layouts with pagination
 * Includes a collapsible filter sidebar for mobile devices
 *
 * @returns {JSX.Element} Complete shop page with header, filters, products, and footer
 */
const Shop = () => {
  // Initialize Redux dispatch
  const dispatch = useDispatch();

  // Redux state selectors - extract data from the home reducer
  const {
    products,
    categorys,
    priceRange,
    latest_product,
    totalProduct,
    parPage,
  } = useSelector((state) => state.home);

  /**
   * Component Side Effect - Price Range Data Fetching
   *
   * Runs on component mount to fetch the price range data from backend.
   * This determines the minimum and maximum price values for the price filter slider.
   * The price range helps users understand the available price spectrum for products.
   */
  useEffect(() => {
    dispatch(price_range_product()); // Fetch price range data from API
  }, []);

  /**
   * Component Side Effect - Price Range State Synchronization
   *
   * Updates the local price range slider state when Redux price range data changes.
   * This ensures the slider reflects the actual price range from the backend
   * and provides accurate filtering boundaries for users.
   */
  useEffect(() => {
    setState({
      values: [priceRange.low, priceRange.high], // Sync slider with Redux price range
    });
  }, [priceRange]); // Re-run when price range data changes

  /**
   * Local State Management
   *
   * Manages various UI states and user interactions for the shop page.
   * These states control filtering, pagination, display preferences, and
   * responsive behavior across different device sizes.
   */

  // State to control filter sidebar visibility (responsive design)
  // true = filters visible on desktop, hidden on mobile
  // false = filters hidden on desktop, visible on mobile (toggle state)
  const [filter, setFilter] = useState(true);

  // State for price range filter slider
  // Manages the selected price range for filtering products
  // Values are synchronized with Redux priceRange data
  // Default range gets updated from backend price range data
  const [state, setState] = useState({
    values: [priceRange.low, priceRange.high], // [minPrice, maxPrice]
  });

  // State for star rating filter selection
  // Stores selected rating (1-5 stars) for filtering products by review ratings
  // Empty string means no rating filter is applied (show all products)
  const [rating, setRating] = useState("");

  // State for product display layout toggle
  // Controls how products are displayed to users
  // "grid" = card-based grid layout (default)
  // "list" = detailed list layout with more product information
  const [styles, setStyles] = useState("grid");

  // Pagination state management
  // Controls which page of products is currently being displayed
  // Used with the Pagination component for navigation through product pages
  const [pageNumber, setPageNumber] = useState(1); // Current active page number (1-based)

  // Search functionality state (future implementation)
  // Stores the search query string for product name/description filtering
  const [searchValue, setSearchValue] = useState(""); // Search query string

  // State for product sorting preferences
  // Controls the order of product display based on price
  // Values: "" (no sorting), "low-to-high", "high-to-low"
  const [sortPrice, setSortPrice] = useState("");

  // State for category filter selection
  // Stores the currently selected product category for filtering
  // Empty string means no category filter is applied (show all categories)
  const [category, setCategory] = useState("");

  /**
   * Category Filter Handler
   *
   * Handles category checkbox selection/deselection for product filtering.
   * Only allows single category selection at a time for better UX.
   *
   * @param {Event} e - Checkbox change event
   * @param {string} value - Category name to filter by
   */
  const queryCategory = (e, value) => {
    if (e.target.checked) {
      setCategory(value); // Set selected category for filtering
    } else {
      setCategory(""); // Clear category filter to show all products
    }
  };

  /**
   * Component Side Effect - Product Query with Filters
   *
   * Automatically fetches products whenever filter parameters change.
   * This creates a reactive filtering system where products update in real-time
   * as users interact with category, price, rating, and pagination controls.
   *
   * Dependencies:
   * - state.values: Price range slider values [min, max]
   * - sortPrice: Selected sort order (low-to-high, high-to-low, or none)
   * - category: Selected product category filter
   * - rating: Selected star rating filter (1-5 stars)
   * - pageNumber: Current pagination page
   * - dispatch: Redux dispatch function for triggering actions
   */
  useEffect(() => {
    dispatch(
      query_products({
        low: state.values[0], // Minimum price from range slider
        high: state.values[1], // Maximum price from range slider
        sortPrice, // Sort preference for price ordering
        category, // Selected category filter
        rating, // Selected star rating filter
        pageNumber, // Current page for pagination
      })
    );
  }, [dispatch, state.values, sortPrice, category, rating, pageNumber]);

  /**
   * Reset All Filters Function
   *
   * Clears all active filters and resets the shop to its default state.
   * This provides users with a quick way to start fresh with their search
   * and removes all applied category, rating, and price filters.
   *
   * Reset Actions:
   * - Clear star rating filter
   * - Clear category filter
   * - Reset price range to full spectrum
   * - Reset to first page
   * - Fetch products with cleared filters
   */
  const resetRating = () => {
    setRating(""); // Clear star rating filter
    setCategory(""); // Clear category filter
    setState({
      values: [priceRange.low, priceRange.high], // Reset price range to full spectrum
    });
    setPageNumber(1); // Reset to first page

    // Fetch products with all filters cleared
    dispatch(
      query_products({
        low: priceRange.low, // Use full price range minimum
        high: priceRange.high, // Use full price range maximum
        sortPrice, // Keep current sort preference
        category: "", // No category filter
        rating: "", // No rating filter
        pageNumber: 1, // Start from first page
      })
    );
  };

  return (
    <div>
      {/* Website header with navigation and user info */}
      <Header />

      {/* 
        Hero Banner Section
        - Background image with dark overlay for text readability
        - Page title and breadcrumb navigation
        - Responsive text sizing and spacing
      */}
      <section className="bg-[url('/images/banner/shop.png')] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left">
        {/* Dark overlay for better text readability */}
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] max-md:w-[80%] max-sm:w-[90%] max-lg:w-[90%] h-full mx-auto">
            {/* Centered content with page title and navigation breadcrumb */}
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold ">Shop Page</h2>
              {/* Breadcrumb navigation */}
              <div className="flex justify-center items-center gap-2 text-2xl w-full">
                <Link to="/">Home</Link>
                <span className="pt-1">
                  <IoIosArrowForward />
                </span>
                <span>Shop</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        Main Shop Content Section
        - Responsive container with proper spacing
        - Two-column layout: filters sidebar + product display
        - Mobile-first responsive design approach
      */}
      <section className="py-16">
        <div className="w-[85%] max-md:w-[80%] max-sm:w-[90%] max-lg:w-[90%] h-full mx-auto">
          {/* 
            Mobile Filter Toggle Button
            - Only visible on mobile devices (hidden on desktop)
            - Toggles filter sidebar visibility for better mobile UX
            - Changes text and spacing based on filter state
          */}
          <div className={`max-md:block hidden ${!filter ? "mb-6" : "mb-0"}`}>
            <button
              onClick={() => setFilter(!filter)}
              className="text-center w-full py-2 px-3 bg-indigo-500 text-white"
            >
              Filter Product
            </button>
          </div>

          {/* Main content layout - sidebar + product grid */}
          <div className="w-full flex flex-wrap ">
            {/* 
              Left Sidebar - Filter Section
              - Responsive width: 25% desktop, 33% tablet, 100% mobile
              - Collapsible on mobile devices based on filter state
              - Contains category, price, rating, and latest products
            */}
            <div
              className={`w-3/12 max-md:w-full max-lg:w-4/12 pr-8 ${
                filter
                  ? "max-md:h-0 max-md:overflow-hidden max-md:mb-0" // Hidden on mobile when filter = true
                  : "max-md:auto max-md:overflow-auto max-md:mb-0" // Visible on mobile when filter = false
              }`}
            >
              {/* 
                Category Filter Section
                - Dynamic category list from Redux state
                - Checkbox-based multi-selection filtering
                - Clean typography with proper spacing
              */}
              <h2 className="text-3xl font-bold mb-3 text-slate-600">
                Category
              </h2>

              {/* 
                Category Checkboxes List
                - Maps through categories from Redux state
                - Each category becomes a selectable filter option
                - Proper accessibility with id/htmlFor associations
              */}
              <div className="py-2">
                {categorys.map((c, index) => (
                  <div
                    key={index}
                    className="flex justify-start items-center gap-2 py-1"
                  >
                    {/* Category checkbox input for multi-select filtering */}
                    <input
                      checked={category === c.name ? true : false}
                      onChange={(e) => queryCategory(e, c.name)}
                      type="checkbox"
                      id={c.name}
                    />
                    {/* Category label with click handling for accessibility */}
                    <label
                      className="text-slate-600 cursor-pointer"
                      htmlFor={c.name}
                    >
                      {c.name}
                    </label>
                  </div>
                ))}
              </div>

              {/* 
                Price Range Filter Section
                - Interactive slider for price-based filtering
                - Uses react-range library for smooth user experience
                - Dynamic min/max values from backend API
                - Real-time price display with formatting
              */}
              <div className="py-2 flex flex-col gap-5 ">
                <h2 className="text-3xl font-bold mb-3 text-slate-600">
                  Price
                </h2>

                {/* 
                  Price Range Slider Component
                  - Dual-handle slider for min/max price selection
                  - Custom styling for brand consistency
                  - Step-based increments for better UX
                */}
                <Range
                  step={5} // Price increment steps ($5 increments)
                  min={priceRange.low} // Minimum price from backend
                  max={priceRange.high} // Maximum price from backend
                  values={state.values} // Current selected range [min, max]
                  onChange={(values) => setState({ values })} // Update price range state
                  renderTrack={({ props, children }) => (
                    // Custom track styling - gray background bar
                    <div
                      {...props}
                      className="w-full h-[6px] rounded-full cursor-pointer bg-gray-300"
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    // Custom thumb styling - green circular handles
                    <div
                      {...props}
                      className="w-[15px] h-[15px] bg-[#059473] rounded-full"
                    />
                  )}
                />
              </div>

              {/* 
                Selected Price Range Display
                - Shows current selected price range in readable format
                - Real-time updates as user moves slider handles
                - Formatted with dollar signs and rounded values
              */}
              <span className="text-slate-800 font-bold text-lg">
                ${Math.floor(state.values[0])} - ${Math.floor(state.values[1])}
              </span>

              {/* Star rating filter section */}
              <div className="py-3 flex flex-col gap-4 ">
                <h2 className="text-3xl font-bold mb-3 text-slate-600">
                  Rating
                </h2>

                <div className="flex flex-col gap-3 ">
                  {/* 5-star rating option */}
                  <div
                    onClick={() => setRating(5)}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer "
                  >
                    {/* 5 filled stars for 5-star rating */}
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                  </div>

                  {/* 4-star rating option */}
                  <div
                    onClick={() => setRating(4)}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer "
                  >
                    {/* 4 filled stars + 1 empty star */}
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                  </div>

                  {/* 3-star rating option */}
                  <div
                    onClick={() => setRating(3)}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer "
                  >
                    {/* 3 filled stars + 2 empty stars */}
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                  </div>

                  {/* 2-star rating option */}
                  <div
                    onClick={() => setRating(2)}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer "
                  >
                    {/* 2 filled stars + 3 empty stars */}
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                  </div>

                  {/* 1-star rating option */}
                  <div
                    onClick={() => setRating(1)}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer "
                  >
                    {/* 1 filled star + 4 empty stars */}
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                  </div>

                  {/* Clear all filters option (reset button) */}
                  <div
                    onClick={resetRating}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer "
                  >
                    {/* 5 empty stars - clicking resets all filters */}
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                  </div>
                </div>
              </div>

              {/* Latest products sidebar - hidden on mobile */}
              <div className="py-5 flex flex-col gap-4 max-md:hidden">
                <Products title="Latest Product" products={latest_product} />
              </div>
            </div>

            {/* Right content area - Product display and controls */}
            <div className="w-9/12 max-lg:w-8/12 max-md:w-full ">
              <div className="pl-8 max-md:pl-0 ">
                {/* 
                  Product Controls Bar
                  - Product count display showing total results
                  - Sort dropdown for price ordering (low-to-high, high-to-low)
                  - View toggle buttons for grid/list layout (desktop only)
                  - Clean white background with subtle border styling
                */}
                <div className="py-4 bg-white mb-10 px-3 rounded-md flex justify-between items-start border border-slate-200">
                  {/* Dynamic product count display with current total */}
                  <h2 className="text-lg font-medium text-slate-600">
                    ({totalProduct}) Products
                  </h2>

                  {/* Right side controls: sorting and view options */}
                  <div className="flex justify-center items-center gap-3">
                    {/* 
                      Price Sorting Dropdown
                      - Allows users to sort products by price
                      - Options: default (no sort), low-to-high, high-to-low
                      - Triggers immediate product re-fetch on change
                    */}
                    <select
                      onChange={(e) => setSortPrice(e.target.value)}
                      className="p-1 border border-slate-100 outline-0 text-slate-600"
                      name=""
                      id=""
                    >
                      <option value="">Sort By</option>
                      <option value="low-to-high">Low to High Price</option>
                      <option value="high-to-low">High to Low Price</option>
                    </select>

                    {/* 
                      Product View Toggle Buttons
                      - Grid view: Card-based layout (default)
                      - List view: Detailed horizontal layout
                      - Hidden on mobile devices for better responsive design
                      - Active state styling with background color change
                    */}
                    <div className="flex justify-center items-start gap-4 max-lg:hidden">
                      {/* Grid view toggle button */}
                      <div
                        onClick={() => setStyles("grid")}
                        className={`p-2 ${
                          styles === "grid" && "bg-slate-300"
                        } text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm `}
                      >
                        <BsFillGridFill />
                      </div>

                      {/* List view toggle button */}
                      <div
                        onClick={() => setStyles("list")}
                        className={`p-2 ${
                          styles === "list" && "bg-slate-300"
                        } text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm `}
                      >
                        <FaThList />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 
                  Main Product Display Area
                  - Renders the ShopProducts component with filtered products
                  - Passes products array and display style (grid/list)
                  - Responsive layout with proper spacing
                */}
                <div className="pb-8 ">
                  <ShopProducts products={products} styles={styles} />
                </div>

                {/* 
                  Pagination Section
                  - Only shows when total products exceed per-page limit
                  - Provides navigation through multiple pages of products
                  - Calculates number of pagination buttons dynamically
                  - Integrates with pageNumber state for navigation
                */}
                <div>
                  {totalProduct > parPage && (
                    <Pagination
                      pageNumber={pageNumber} // Current active page number (1-based)
                      setPageNumber={setPageNumber} // Function to update current page
                      totalItem={totalProduct} // Total number of products for calculation
                      parPage={parPage} // Number of products displayed per page
                      showItem={Math.floor(totalProduct / parPage)} // Calculate pagination buttons to display
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Website footer */}
      <Footer />
    </div>
  );
};

// Export the Shop component as default export for use in other parts of the application
export default Shop;

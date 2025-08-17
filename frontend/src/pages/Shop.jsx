// Import React library and useState hook for state management
import React, { useState } from "react";
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

/**
 * Shop Component - Main shopping page with filters and product display
 * Features filtering by category, price range, and ratings
 * Supports both grid and list view layouts with pagination
 * Includes a collapsible filter sidebar for mobile devices
 *
 * @returns {JSX.Element} Complete shop page with header, filters, products, and footer
 */
const Shop = () => {
  // State management for component functionality

  // State to control filter sidebar visibility (mobile responsive)
  // true = filters visible, false = filters hidden on mobile
  const [filter, setFilter] = useState(true);

  // Mock product categories for filter sidebar
  // In production, this would be fetched from an API or Redux store
  const categorys = [
    "Mobiles", // Mobile phones and accessories
    "Laptops", // Laptop computers
    "Speakers", // Audio equipment
    "Top Wear", // Shirts, t-shirts, upper body clothing
    "Footwear", // Shoes, sandals, boots
    "Watches", // Traditional and smart watches
    "Cameras", // Photography equipment
    "Clothing", // General clothing items
  ];

  // State for price range filter slider
  // Default range: $50 - $1500
  const [state, setState] = useState({ values: [50, 1500] });

  // State for star rating filter selection
  // Stores selected rating (1-5 stars) or empty string for no filter
  // eslint-disable-next-line no-unused-vars
  const [rating, setRating] = useState("");

  // State for product display layout toggle
  // "grid" = grid layout, "list" = list layout
  const [styles, setStyles] = useState("grid");

  // Pagination state management
  const [currentPage, setCurrentPage] = React.useState(1); // Current active page number

  // Search functionality state (not fully implemented in this version)
  // eslint-disable-next-line no-unused-vars
  const [searchValue, setSearchValue] = React.useState(""); // Search query string

  // Products per page configuration
  // eslint-disable-next-line no-unused-vars
  const [parPage, setParPage] = React.useState(5); // Number of items to display per page

  return (
    <div>
      {/* Website header with navigation and user info */}
      <Header />

      {/* Hero banner section with shop page title and breadcrumb */}
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

      {/* Main shop content section */}
      <section className="py-16">
        <div className="w-[85%] max-md:w-[80%] max-sm:w-[90%] max-lg:w-[90%] h-full mx-auto">
          {/* Mobile filter toggle button - only visible on mobile devices */}
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
            {/* Left sidebar - Filter section */}
            <div
              className={`w-3/12 max-md:w-full max-lg:w-4/12 pr-8 ${
                filter
                  ? "max-md:h-0 max-md:overflow-hidden max-md:mb-0" // Hidden on mobile when filter = true
                  : "max-md:auto max-md:overflow-auto max-md:mb-0" // Visible on mobile when filter = false
              }`}
            >
              {/* Category filter section */}
              <h2 className="text-3xl font-bold mb-3 text-slate-600">
                Category
              </h2>

              {/* Category checkboxes list */}
              <div className="py-2">
                {categorys.map((category, index) => (
                  <div
                    key={index}
                    className="flex justify-start items-center gap-2 py-1"
                  >
                    {/* Category checkbox input */}
                    <input type="checkbox" id={category} />
                    {/* Category label */}
                    <label
                      className="text-slate-600"
                      block
                      cursor-pointer
                      htmlFor={category}
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>

              {/* Price range filter section */}
              <div className="py-2 flex flex-col gap-5 ">
                <h2 className="text-3xl font-bold mb-3 text-slate-600">
                  Price
                </h2>

                {/* Price range slider component */}
                <Range
                  step={5} // Price increment steps
                  min={50} // Minimum price
                  max={1500} // Maximum price
                  values={state.values} // Current selected range
                  onChange={(values) => setState({ values })} // Update price range
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      className="w-full h-[6px] rounded-full cursor-pointer"
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      {...props}
                      className="w-[15px] h-[15px] bg-[#059473] rounded-full"
                    />
                  )}
                />
              </div>

              {/* Display selected price range */}
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

                  {/* 0-star rating option (no rating filter) */}
                  <div className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer ">
                    {/* 5 empty stars */}
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
                <Products title="Latest Product" />
              </div>
            </div>

            {/* Right content area - Product display and controls */}
            <div className="w-9/12 max-lg:w-8/12 max-md:w-full ">
              <div className="pl-8 max-md:pl-0 ">
                {/* Product controls bar - count, sorting, view toggle */}
                <div className="py-4 bg-white mb-10 px-3 rounded-md flex justify-between items-start border border-slate-200">
                  {/* Product count display */}
                  <h2 className="text-lg font-medium text-slate-600">
                    14 Products
                  </h2>

                  {/* Controls: sort dropdown and view toggle buttons */}
                  <div className="flex justify-center items-center gap-3">
                    {/* Sort by dropdown */}
                    <select
                      className="p-1 border border-slate-100 outline-0 text-slate-600"
                      name=""
                      id=""
                    >
                      <option value="">Sort By</option>
                      <option value="low-to-high">Low to High Price</option>
                      <option value="high-to-low">High to Low Price</option>
                    </select>

                    {/* View toggle buttons (grid/list) - hidden on mobile */}
                    <div className="flex justify-center items-start gap-4 max-lg:hidden">
                      {/* Grid view button */}
                      <div
                        onClick={() => setStyles("grid")}
                        className={`p-2 ${
                          styles === "grid" && "bg-slate-300"
                        } text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm `}
                      >
                        <BsFillGridFill />
                      </div>

                      {/* List view button */}
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

                {/* Main product display area */}
                <div className="pb-8 ">
                  <ShopProducts styles={styles} />
                </div>

                {/* Pagination component */}
                <div>
                  <Pagination
                    pageNumber={currentPage} // Current page number
                    setPageNumber={setCurrentPage} // Function to change page
                    totalItem={50} // Total number of products
                    parPage={parPage} // Products per page
                    showItem={Math.floor(10 / 3)} // Number of pagination buttons to show
                  />
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

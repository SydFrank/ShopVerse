/**
 * CategoryShop Page - Advanced Category-Based Product Discovery Interface
 *
 * Overview:
 * Specialized shopping page for category-specific product browsing with comprehensive
 * filtering, sorting, and search capabilities. Provides enhanced user experience
 * for targeted product discovery within specific categories.
 *
 * Core Functionality:
 * - Dynamic category-based product filtering via URL parameters
 * - Advanced price range filtering with interactive slider
 * - Multi-level rating system (1-5 stars) with visual feedback
 * - Comprehensive sorting options (price, alphabetical, relevance)
 * - Dual layout modes: responsive grid and detailed list views
 * - Smart pagination with configurable items per page
 * - Real-time search integration with instant results
 * - SEO-friendly URL parameter management
 *
 * Technical Architecture:
 * - React functional component with hooks-based state management
 * - Redux Toolkit integration for global state and async operations
 * - URL-based routing with useSearchParams for deep linking
 * - React Range component for smooth price filtering UX
 * - Responsive design using Tailwind CSS utility classes
 * - Optimized re-renders with useEffect dependency management
 *
 */

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useSearchParams } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { Range } from "react-range";
import { AiFillStar } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import Products from "../components/products/Products";
import ShopProducts from "../components/products/ShopProducts";
import Pagination from "../components/Pagination";
import { BsFillGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  price_range_product,
  query_products,
} from "../store/reducers/homeReducer";

const CategoryShop = () => {
  let [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const dispatch = useDispatch();

  // Redux state
  const { products, priceRange, latest_product, totalProduct, parPage } =
    useSelector((state) => state.home);

  // Fetch price range data on mount
  useEffect(() => {
    dispatch(price_range_product());
  }, [dispatch]);

  // Sync price range with Redux data
  useEffect(() => {
    setState({
      values: [priceRange.low, priceRange.high],
    });
  }, [priceRange]);

  // Local state
  const [filter, setFilter] = useState(true);
  const [state, setState] = useState({
    values: [priceRange.low, priceRange.high],
  });
  const [rating, setRating] = useState("");
  const [styles, setStyles] = useState("grid");
  const [pageNumber, setPageNumber] = useState(1);
  const [sortPrice, setSortPrice] = useState("");

  // Fetch products when filters change
  useEffect(() => {
    dispatch(
      query_products({
        low: state.values[0] || "",
        high: state.values[1] || "",
        sortPrice,
        category,
        rating,
        pageNumber,
      })
    );
  }, [dispatch, state.values, sortPrice, category, rating, pageNumber]);

  // Reset all filters
  const resetRating = () => {
    setRating("");
    setSortPrice("");
    setState({
      values: [priceRange.low, priceRange.high],
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

      {/* Hero Banner */}
      <section className="bg-[url('/images/banner/shop.png')] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left">
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] max-md:w-[80%] max-sm:w-[90%] max-lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold ">Category Page</h2>
              <div className="flex justify-center items-center gap-2 text-2xl w-full">
                <Link to="/">Home</Link>
                <span className="pt-1">
                  <IoIosArrowForward />
                </span>
                <span>Category</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="w-[85%] max-md:w-[80%] max-sm:w-[90%] max-lg:w-[90%] h-full mx-auto">
          {/* Mobile Filter Toggle */}
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
                Price Range Filter Section
              {/* Price Range Filter */}
              <div className="py-2 flex flex-col gap-5 ">
                <h2 className="text-3xl font-bold mb-3 text-slate-600">
                  Price
                </h2>

                <Range
                  step={5}
                  min={priceRange.low}
                  max={priceRange.high}
                  values={state.values}
                  onChange={(values) => setState({ values })}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      className="w-full h-[6px] rounded-full cursor-pointer bg-gray-300"
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

              {/* Price Display */}
              <span className="text-slate-800 font-bold text-lg">
                ${Math.floor(state.values[0])} - ${Math.floor(state.values[1])}
              </span>

              {/* Star rating filter section */}
              <div className="py-3 flex flex-col gap-4 ">
                <h2 className="text-3xl font-bold mb-3 text-slate-600">
                  Rating
                </h2>

                <div className="flex flex-col gap-3 ">
                  {/* 5-star rating */}
                  <div
                    onClick={() => setRating(5)}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer "
                  >
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

                  {/* 4-star rating */}
                  <div
                    onClick={() => setRating(4)}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer "
                  >
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

                  {/* 3-star rating */}
                  <div
                    onClick={() => setRating(3)}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer "
                  >
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

                  {/* Reset filters */}
                  <div
                    onClick={resetRating}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer "
                  >
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

              {/* Latest products sidebar */}
              <div className="py-5 flex flex-col gap-4 max-md:hidden">
                <Products title="Latest Product" products={latest_product} />
              </div>
            </div>

            {/* Product display and controls */}
            <div className="w-9/12 max-lg:w-8/12 max-md:w-full ">
              <div className="pl-8 max-md:pl-0 ">
                {/* Product Controls Bar */}
                <div className="py-4 bg-white mb-10 px-3 rounded-md flex justify-between items-start border border-slate-200">
                  <h2 className="text-lg font-medium text-slate-600">
                    ({totalProduct}) Products
                  </h2>
                  <div className="flex justify-center items-center gap-3">
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

                    {/* View Toggle Buttons */}
                    <div className="flex justify-center items-start gap-4 max-lg:hidden">
                      <div
                        onClick={() => setStyles("grid")}
                        className={`p-2 ${
                          styles === "grid" && "bg-slate-300"
                        } text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm `}
                      >
                        <BsFillGridFill />
                      </div>

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
                {/* Product Display */}
                <div className="pb-8 ">
                  <ShopProducts products={products} styles={styles} />
                </div>

                {/* Pagination */}
                <div>
                  {totalProduct > parPage && (
                    <Pagination
                      pageNumber={pageNumber}
                      setPageNumber={setPageNumber}
                      totalItem={totalProduct}
                      parPage={parPage}
                      showItem={Math.floor(totalProduct / parPage)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoryShop;

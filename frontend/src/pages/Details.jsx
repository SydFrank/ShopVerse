/**
 * Details Component - E-commerce Product Detail Page
 *
 * This component renders the comprehensive product detail page for the ShopVerse
 * e-commerce application. It displays detailed product information including image
 * gallery, pricing, specifications, reviews, and related products. The page includes
 * interactive features like image carousel, quantity selection, add to cart functionality,
 * and tabbed content for descriptions and reviews.
 *
 * Key Features:
 * - Interactive product image gallery with thumbnail carousel
 * - Dynamic pricing display with discount calculations
 * - Quantity selector with stock availability checks
 * - Tabbed interface for product descriptions and customer reviews
 * - Related products carousel with responsive breakpoints
 * - Social sharing buttons for product links
 * - Breadcrumb navigation for enhanced user experience
 * - Full responsive design optimized for all devices
 * - Review system with rating display and pagination
 *
 * @component
 * @returns {JSX.Element} Complete product detail page with all interactive features
 */

// React core imports for functional component with state management
import React, { useState } from "react";

// Custom component imports for page structure and functionality
import Header from "../components/Header"; // Website header with navigation and user info
import Footer from "../components/Footer"; // Website footer with links and company info
import Rating from "../components/Rating"; // Star rating display component
import Reviews from "../components/Reviews"; // Product reviews section component

// React Router for navigation between pages
import { Link } from "react-router-dom"; // Navigation link component for breadcrumbs

// React Icons library for various UI elements
import { IoIosArrowForward } from "react-icons/io"; // Forward arrow icon for breadcrumb navigation
import { MdKeyboardArrowRight } from "react-icons/md"; // Right arrow for detailed breadcrumb
import { FaHeart } from "react-icons/fa6"; // Heart icon for wishlist functionality
import { FaFacebookF } from "react-icons/fa"; // Facebook icon for social sharing
import { FaTwitter } from "react-icons/fa"; // Twitter icon for social sharing
import { FaLinkedinIn } from "react-icons/fa"; // LinkedIn icon for social sharing

// Carousel library imports for product image gallery and related products
import Carousel from "react-multi-carousel"; // Multi-responsive carousel component
import "react-multi-carousel/lib/styles.css"; // Default carousel styling

// Swiper library imports for advanced carousel functionality
import { Swiper, SwiperSlide } from "swiper/react"; // Swiper components for touch-friendly carousels
import { Pagination } from "swiper/modules"; // Pagination module for swiper
import "swiper/css"; // Core Swiper styles
import "swiper/css/pagination"; // Pagination-specific styles

/**
 * Details Functional Component
 * Manages product detail display, image gallery, and user interactions
 */
const Details = () => {
  // Mock product image array - represents available product images (1-6)
  // In production, this would be fetched from API based on product ID
  const images = [1, 2, 3, 4, 5, 6];

  // Selected image state for main product display
  // Controls which image is currently shown in the main product view
  const [image, setImage] = useState("");

  // Product discount percentage (mock data)
  // Used for calculating discounted price display
  const discount = 15;

  // Product stock quantity (mock data)
  // Determines availability and quantity selector visibility
  const stock = 10;

  // Active tab state for product information sections
  // Controls which tab is currently displayed (reviews, description, etc.)
  const [state, setState] = useState("reviews");

  /**
   * Responsive Breakpoints Configuration for Product Image Carousel
   * Defines how many thumbnail images to display at different screen sizes
   * Ensures optimal viewing experience across all device types
   */
  const responsive = {
    // Extra large desktop screens (4K and above)
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5, // Show 5 category items
    },
    // Standard desktop screens
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5, // Show 5 category items
    },
    // Tablet landscape mode
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4, // Show 4 category items
    },
    // Medium tablet screens
    mdtablet: {
      breakpoint: { max: 991, min: 464 },
      items: 4, // Show 4 category items
    },
    // Mobile phones in landscape
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3, // Show 3 category items
    },
    // Small mobile screens
    smmobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2, // Show 2 category items
    },
    // Extra small mobile screens
    xsmobile: {
      breakpoint: { max: 440, min: 0 },
      items: 1, // Show 1 category item
    },
  };

  return (
    <div>
      {/* Website header component with navigation and user authentication */}
      <Header />

      {/* Hero banner section with product detail page title and breadcrumb navigation */}
      <section className="bg-[url('/images/banner/shop.png')] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left">
        {/* Dark overlay for better text readability over background image */}
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] max-md:w-[80%] max-sm:w-[90%] max-lg:w-[90%] h-full mx-auto">
            {/* Centered content with page title and navigation breadcrumb */}
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold ">Product Detail Page</h2>
              {/* Breadcrumb navigation for user orientation */}
              <div className="flex justify-center items-center gap-2 text-2xl w-full">
                <Link to="/">Home</Link>
                <span className="pt-1">
                  <IoIosArrowForward />
                </span>
                <span>Product Details</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary breadcrumb navigation section with detailed product path */}
      <section>
        <div className="bg-slate-100 py-5 mb-5 ">
          <div className="w-[85%] max-md:w-[80%] max-sm:w-[90%] max-lg:w-[90%] h-full mx-auto ">
            {/* Detailed breadcrumb trail showing: Home > Category > Product Name */}
            <div className="flex justify-start items-center text-md text-slate-600 w-full ">
              <Link to="/">Home</Link>
              <span className="pt-1">
                <MdKeyboardArrowRight />
              </span>
              <Link to="/">Category</Link>
              <span className="pt-1">
                <MdKeyboardArrowRight />
              </span>
              <span>Product Name</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main product detail section with image gallery and product information */}
      <section>
        <div className="w-[85%] max-md:w-[80%] max-sm:w-[90%] max-lg:w-[90%] h-full mx-auto ">
          <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-8">
            {/* Left column: Product image gallery section */}
            <div>
              {/* Main product image display container */}
              <div className="p-5 border border-slate-200">
                <img
                  className="h-[400px] w-full"
                  src={
                    image
                      ? `/images/products/${image}.webp` // Show selected thumbnail image
                      : `/images/products/${images[2]}.webp` // Default to 3rd image if none selected
                  }
                />
              </div>

              {/* Product thumbnail carousel section */}
              <div className="py-3">
                {images && (
                  <Carousel
                    autoPlay={true} // Automatically advance slides
                    infinite={true} // Loop back to first slide after last slide
                    responsive={responsive} // Apply responsive breakpoints
                    transitionDuration={500} // Animation duration between slides (500ms)
                  >
                    {/* Map through available product images to create clickable thumbnails */}
                    {images.map((img, index) => {
                      return (
                        <div key={index} onClick={() => setImage(img)}>
                          <img
                            src={`/images/products/${img}.webp`}
                            className=" h-[120px] cursor-pointer"
                          />
                        </div>
                      );
                    })}
                  </Carousel>
                )}
              </div>
            </div>

            {/* Right column: Product information and purchase options */}
            <div className="flex flex-col gap-5 ">
              {/* Product title section */}
              <div className="text-3xl text-slate-600 font-bold ">
                <h3>Product Name</h3>
              </div>

              {/* Product rating and review count display */}
              <div className="flex justify-start items-center gap-4">
                <div className="flex text-xl ">
                  <Rating ratings={4.5} />
                </div>
                <span className="text-green-500">(24 reviews)</span>
              </div>

              {/* Dynamic pricing section with discount calculation */}
              <div className="text-2xl text-red-500 font-bold flex gap-3">
                {discount !== 0 ? (
                  <>
                    Price : <h2 className="line-through">$500</h2>{" "}
                    {/* Original price crossed out */}
                    <h2>
                      ${500 - Math.floor((500 * discount) / 100)} (-{discount}%){" "}
                      {/* Discounted price */}
                    </h2>
                  </>
                ) : (
                  // Regular price when no discount
                  <h2>Price : $200</h2>
                )}
              </div>

              {/* Product description text */}
              <div className="text-slate-600 ">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.{" "}
                </p>
              </div>

              {/* Quantity selector and action buttons section */}
              <div className="flex gap-3 pb-10 border-b">
                {stock ? ( // Only show purchase options if product is in stock
                  <>
                    {/* Quantity selector with increment/decrement buttons */}
                    <div className="flex bg-slate-200 h-[50px] justify-center items-center text-xl ">
                      <div className="px-6 cursor-pointer">-</div>{" "}
                      {/* Decrease quantity */}
                      <div className="px-6 cursor-pointer">2</div>{" "}
                      {/* Current quantity */}
                      <div className="px-6 cursor-pointer">+</div>{" "}
                      {/* Increase quantity */}
                    </div>

                    {/* Add to cart button with hover effects */}
                    <div>
                      <button className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-[#059473] text-white">
                        Add To Cart
                      </button>
                    </div>
                  </>
                ) : (
                  // Show empty space when out of stock
                  ""
                )}
                {/* Wishlist/favorite button */}
                <div>
                  <div className="h-[50px] w-[50px] flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-cyan-500/40 bg-cyan-500 text-white">
                    <FaHeart />
                  </div>
                </div>
              </div>

              {/* Product availability and social sharing section */}
              <div className="flex py-5 gap-5 ">
                {/* Labels column for availability and social sharing */}
                <div className="w-[150px] text-black font-bold text-xl flex flex-col gap-5">
                  <span>Availability</span>
                  <span>Share On</span>
                </div>

                {/* Content column with stock status and social media links */}
                <div className="flex flex-col gap-5 ">
                  {/* Dynamic stock availability display */}
                  <span className={`text-${stock ? "green" : "red"}-500`}>
                    {stock ? `In Stock (${stock})` : "Out of Stock"}
                  </span>

                  {/* Social media sharing buttons list */}
                  <ul className="flex justify-start items-center gap-3">
                    {/* Facebook sharing button */}
                    <li>
                      <a
                        className="w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-cyan-500 rounded-full text-white"
                        href="#"
                      >
                        <FaFacebookF />
                      </a>
                    </li>
                    {/* Twitter sharing button */}
                    <li>
                      <a
                        className="w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-purple-500 rounded-full text-white"
                        href="#"
                      >
                        <FaTwitter />
                      </a>
                    </li>
                    {/* LinkedIn sharing button */}
                    <li>
                      <a
                        className="w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-blue-500 rounded-full text-white"
                        href="#"
                      >
                        <FaLinkedinIn />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Primary action buttons section */}
              <div className="flex gap-3">
                {/* Buy Now button - only show if product is in stock */}
                {stock ? (
                  <button className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-[#247462] text-white">
                    Buy Now
                  </button>
                ) : (
                  // Show empty space when out of stock
                  ""
                )}
                {/* Chat with seller button - always available */}
                <Link
                  to="#"
                  className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-red-500/40 bg-red-500 text-white"
                >
                  Chat Seller
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product details and reviews tabbed section */}
      <section>
        <div className="w-[85%] max-md:w-[80%] max-sm:w-[90%] max-lg:w-[90%] h-full mx-auto pb-16 py-12">
          <div className="flex flex-wrap ">
            {/* Left column: Tabbed content area (72% width on desktop) */}
            <div className="w-[72%] max-lg:w-full ">
              <div className="pr-4 max-lg:pr-0 ">
                {/* Tab navigation buttons */}
                <div className="grid grid-cols-2">
                  {/* Reviews tab button with active state styling */}
                  <button
                    onClick={() => setState("reviews")}
                    className={`py-1 hover:text-white px-5 hover:bg-[#059473] ${
                      state === "reviews"
                        ? "bg-[#059473] text-white" // Active tab styling
                        : "bg-slate-200 text-slate-700" // Inactive tab styling
                    } rounded-sm`}
                  >
                    Reviews
                  </button>
                  {/* Description tab button with active state styling */}
                  <button
                    onClick={() => setState("description")}
                    className={`py-1 hover:text-white px-5 hover:bg-[#059473] ${
                      state === "description"
                        ? "bg-[#059473] text-white" // Active tab styling
                        : "bg-slate-200 text-slate-700" // Inactive tab styling
                    } rounded-sm`}
                  >
                    Description
                  </button>
                </div>

                {/* Tab content area with conditional rendering */}
                <div>
                  {state === "reviews" ? (
                    <Reviews /> // Render Reviews component when reviews tab is active
                  ) : (
                    // Render description content when description tab is active
                    <p className="py-5 text-slate-600">No reviews yet. </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right column: Seller information and related products (28% width) */}
            <div className="w-[28%] max-lg:w-full ">
              <div className="pl-4 max-lg:pl-0">
                {/* Seller information header */}
                <div className="px-3 py-2 text-slate-600 bg-slate-200">
                  <h2 className="font-slate-200 ">From Easy Shop</h2>
                </div>

                {/* Seller details and statistics */}
                <div className="flex flex-col gap-5 mt-3 border border-slate-200 p-3 ">
                  {/* Map through related products from this seller */}
                  {[1, 2, 3].map((p) => {
                    return (
                      <Link className="block" key={p}>
                        {/* Product image container with discount badge */}
                        <div className="relative h-[270px]">
                          <img
                            className="w-full h-full"
                            src={`/images/products/${p}.webp`}
                            alt={`Related Product ${p}`}
                          />
                          {/* Discount percentage badge overlay */}
                          {discount !== 0 && (
                            <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                              {discount}%
                            </div>
                          )}
                        </div>

                        {/* Product name */}
                        <h2 className="text-slate-600 py-1 font-bold">
                          Product Name
                        </h2>

                        {/* Product price and rating */}
                        <div className="flex gap-2">
                          <h2 className="text-lg font-bold text-slate-600">
                            $434
                          </h2>

                          {/* Star rating display */}
                          <div className="flex items-center gap-2">
                            <Rating ratings={4.5} />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related products carousel section */}
      <section>
        <div className="w-[85%] max-md:w-[80%] max-sm:w-[90%] max-lg:w-[90%] h-full mx-auto ">
          <h2 className="text-2xl py-8 text-slate-600">Related Products</h2>

          <div>
            {/* Swiper carousel for related products with responsive breakpoints */}
            <Swiper
              slidesPerView="auto" // Auto-adjust slides per view
              breakpoints={{
                1280: { slidesPerView: 3 }, // Show 3 slides on large screens
                565: { slidesPerView: 2 }, // Show 2 slides on medium screens
              }}
              spaceBetween={25} // 25px gap between slides
              loop={true} // Enable infinite loop
              pagination={{
                clickable: true, // Allow clicking on pagination bullets
                el: ".custom_bullet", // Custom pagination element selector
              }}
              modules={[Pagination]} // Import pagination module
              className="mySwiper"
            >
              {/* Map through related products array to create swiper slides */}
              {[1, 2, 3, 4, 5, 6].map((p, i) => {
                return (
                  <SwiperSlide key={i}>
                    <Link className="block">
                      {/* Product image container with hover overlay effect */}
                      <div className="relative h-[270px]">
                        <div className="w-full h-full">
                          <img
                            className="w-full h-full"
                            src={`/images/products/${p}.webp`}
                            alt={`Related Product ${p}`}
                          />
                          {/* Dark overlay with hover transition effect */}
                          <div className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-25 hover:opacity-15 transition-all duration-500"></div>
                        </div>

                        {/* Discount percentage badge (conditional rendering) */}
                        {discount !== 0 && (
                          <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                            {discount}%
                          </div>
                        )}
                      </div>

                      {/* Product information section */}
                      <div className="p-4 flex flex-col gap-1">
                        {/* Product title */}
                        <h2 className="text-slate-600 py-1 font-bold">
                          Product Name
                        </h2>

                        {/* Price and rating section */}
                        <div className="flex gap-2">
                          <h2 className="text-lg font-bold text-slate-600">
                            $434
                          </h2>

                          {/* Product rating stars */}
                          <div className="flex ">
                            <Rating ratings={4.5} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          {/* Custom pagination container for carousel dots */}
          <div className="w-full flex justify-center items-center py-10">
            <div className="custom_bullet justify-center gap-3 !w-auto"></div>
          </div>
        </div>
      </section>

      {/* Website footer component with links and company information */}
      <Footer />
    </div>
  );
};

export default Details;

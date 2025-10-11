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

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Rating from "../components/Rating";
import Reviews from "../components/Reviews";
import { Link, useNavigate, useParams } from "react-router-dom";
// React Icons library for various UI elements
import { IoIosArrowForward } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
// Carousel library imports for product image gallery and related products
import Carousel from "react-multi-carousel"; // Multi-responsive carousel component
import "react-multi-carousel/lib/styles.css"; // Default carousel styling
// Swiper library imports for advanced carousel functionality
import { Swiper, SwiperSlide } from "swiper/react"; // Swiper components for touch-friendly carousels
import { Pagination } from "swiper/modules"; // Pagination module for swiper
import "swiper/css"; // Core Swiper styles
import "swiper/css/pagination"; // Pagination-specific styles
import { useDispatch, useSelector } from "react-redux";
import { product_details } from "../store/reducers/homeReducer";
import toast from "react-hot-toast";
import {
  add_to_cart,
  messageClear,
  add_to_wishlist,
} from "../store/reducers/cartReducer";

/**
 * Details Functional Component
 * Manages product detail display, image gallery, and user interactions
 */
const Details = () => {
  // Extract product slug from URL parameters for fetching specific product details
  const { slug } = useParams();
  // Redux dispatch function for triggering actions
  const dispatch = useDispatch();
  // Navigation hook for programmatic routing
  const navigate = useNavigate();
  // Select product-related state from Redux store
  const { product, relatedProducts, moreProducts } = useSelector(
    (state) => state.home
  );

  // Get current user info from auth state
  const { userInfo } = useSelector((state) => state.auth);

  // Get cart operation messages from cart state
  const { successMessage, errorMessage } = useSelector((state) => state.cart);

  // Fetch product details when component mounts or slug changes
  useEffect(() => {
    dispatch(product_details(slug));
  }, [slug]);

  // Selected image state for main product display
  // Controls which image is currently shown in the main product view
  const [image, setImage] = useState("");

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

  // Quantity state for product purchase
  const [quantity, setQuantity] = useState(1);

  // Increment quantity function with stock limit check
  const inc = () => {
    if (quantity >= product.stock) {
      toast.error("Out of stock");
    } else {
      setQuantity(quantity + 1);
    }
  };

  // Decrement quantity function with minimum limit check
  const dec = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const add_cart = () => {
    if (userInfo) {
      // User is authenticated - add product to cart
      dispatch(
        add_to_cart({
          userId: userInfo.id,
          quantity: quantity,
          productId: product._id,
        })
      );
    } else {
      // User not logged in - redirect to login page
      navigate("/login");
    }
  };

  // Show toast messages for cart operations and clear them
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear()); // Clear success message
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear()); // Clear error message
    }
  }, [successMessage, errorMessage]);

  // add to wishlist handler
  const add_wishlist = () => {
    if (userInfo) {
      dispatch(
        add_to_wishlist({
          userId: userInfo.id,
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          discount: product.discount,
          rating: product.rating,
          slug: product.slug,
        })
      );
    } else {
      navigate("/login");
    }
  };

  /**
   * Buy Now Handler - Direct purchase flow bypassing cart
   * Calculates final price with discounts and platform fees, then navigates to shipping
   *
   * @function buyNow
   * @description Handles immediate purchase by:
   *   1. Calculating discounted price if applicable
   *   2. Applying 5% platform processing fee
   *   3. Structuring order data for shipping page
   *   4. Navigating to shipping with product and pricing info
   *
   * Price Calculation Flow:
   * - Base Price: Original product price
   * - Apply Product Discount: Subtract percentage discount if available
   * - Apply Platform Fee: Subtract 5% platform processing fee
   * - Final Price: (discounted_price - 5%) * quantity
   */
  const buyNow = () => {
    let price = 0;

    // Calculate base price with product discount applied
    if (product.discount !== 0) {
      price =
        product.price - Math.floor((product.price * product.discount) / 100);
    } else {
      price = product.price;
    }

    // Structure order object for shipping page with seller and product details
    const obj = [
      {
        sellerId: product.sellerId,
        shopName: product.shopName,
        // Apply 5% platform processing fee to final price
        price: quantity * (price - Math.floor((price * 5) / 100)),
        products: [
          {
            quantity,
            productInfo: product,
          },
        ],
      },
    ];

    // Navigate to shipping page with order data and pricing breakdown
    navigate("/shipping", {
      state: {
        products: obj, // Order structure with seller and product info
        price: price * quantity, // Total price before platform fee
        shipping_fee: 50, // Fixed shipping cost
        items: 1, // Number of different product types
      },
    });
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
              <Link to="/">{product.category}</Link>
              <span className="pt-1">
                <MdKeyboardArrowRight />
              </span>
              <span>{product.name}</span>
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
                  src={image ? image : product.images?.[0]}
                />
              </div>

              {/* Product thumbnail carousel section */}
              <div className="py-3">
                {product.images && (
                  <Carousel
                    autoPlay={true} // Automatically advance slides
                    infinite={true} // Loop back to first slide after last slide
                    responsive={responsive} // Apply responsive breakpoints
                    transitionDuration={500} // Animation duration between slides (500ms)
                  >
                    {/* Map through available product images to create clickable thumbnails */}
                    {product.images.map((img, index) => {
                      return (
                        <div key={index} onClick={() => setImage(img)}>
                          <img
                            src={img}
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
                <h3>{product.name}</h3>
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
                {product.discount !== 0 ? (
                  <>
                    Price : <h2 className="line-through">${product.price}</h2>{" "}
                    {/* Original price crossed out */}
                    <h2>
                      $
                      {product.price -
                        Math.floor(
                          (product.price * product.discount) / 100
                        )}{" "}
                      (-{product.discount}%) {/* Discounted price */}
                    </h2>
                  </>
                ) : (
                  // Regular price when no discount
                  <h2>Price : ${product.price}</h2>
                )}
              </div>

              {/* Product description text */}
              <div className="text-slate-600 ">
                <p>{product?.description}</p>
                <p className="text-slate-600 py-1 font-bold">
                  Shop Name: {product.shopName}
                </p>
              </div>

              {/* Quantity selector and action buttons section */}
              <div className="flex gap-3 pb-10 border-b">
                {product.stock ? ( // Only show purchase options if product is in stock
                  <>
                    {/* Quantity selector with increment/decrement buttons */}
                    <div className="flex bg-slate-200 h-[50px] justify-center items-center text-xl ">
                      <div onClick={dec} className="px-6 cursor-pointer">
                        -
                      </div>{" "}
                      {/* Decrease quantity */}
                      <div className="px-6 cursor-pointer">{quantity}</div>{" "}
                      {/* Current quantity */}
                      <div onClick={inc} className="px-6 cursor-pointer">
                        +
                      </div>{" "}
                      {/* Increase quantity */}
                    </div>

                    {/* Add to cart button with hover effects */}
                    <div>
                      <button
                        onClick={add_cart}
                        className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-[#059473] text-white"
                      >
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
                  <div
                    onClick={add_wishlist}
                    className="h-[50px] w-[50px] flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-cyan-500/40 bg-cyan-500 text-white"
                  >
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
                  <span
                    className={`text-${product.stock ? "green" : "red"}-500`}
                  >
                    {product.stock
                      ? `In Stock (${product.stock})`
                      : "Out of Stock"}
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
                {product.stock ? (
                  <button
                    onClick={buyNow}
                    className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-[#247462] text-white"
                  >
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
                    <Reviews product={product} /> // Render Reviews component when reviews tab is active
                  ) : (
                    // Render description content when description tab is active
                    <p className="py-5 text-slate-600">{product.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right column: Seller information and related products (28% width) */}
            <div className="w-[28%] max-lg:w-full ">
              <div className="pl-4 max-lg:pl-0">
                {/* Seller information header */}
                <div className="px-3 py-2 text-slate-600 bg-slate-200">
                  <h2 className="font-slate-200 ">From {product.shopName}</h2>
                </div>

                {/* Seller details and statistics */}
                <div className="flex flex-col gap-5 mt-3 border border-slate-200 p-3 ">
                  {/* Map through related products from this seller */}
                  {moreProducts.map((p, i) => {
                    return (
                      <Link className="block" key={i}>
                        {/* Product image container with discount badge */}
                        <div className="relative h-[270px]">
                          <img
                            className="w-full h-full"
                            src={p.images[0]}
                            alt={`Related Product ${p.name}`}
                          />
                          {/* Discount percentage badge overlay */}
                          {p.discount !== 0 && (
                            <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                              {p.discount}%
                            </div>
                          )}
                        </div>

                        {/* Product name */}
                        <h2 className="text-slate-600 py-1 font-bold">
                          {p.name}
                        </h2>

                        {/* Product price and rating */}
                        <div className="flex gap-2">
                          <h2 className="text-lg font-bold text-slate-600">
                            ${p.price}
                          </h2>

                          {/* Star rating display */}
                          <div className="flex items-center gap-2">
                            <Rating ratings={p.rating} />
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
              {relatedProducts.map((p, i) => {
                return (
                  <SwiperSlide key={i}>
                    <Link className="block">
                      {/* Product image container with hover overlay effect */}
                      <div className="relative h-[270px]">
                        <div className="w-full h-full">
                          <img
                            className="w-full h-full"
                            src={p.images[0]}
                            alt={`Related Product ${p.name}`}
                          />
                          {/* Dark overlay with hover transition effect */}
                          <div className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-25 hover:opacity-15 transition-all duration-500"></div>
                        </div>

                        {/* Discount percentage badge (conditional rendering) */}
                        {p.discount !== 0 && (
                          <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                            {p.discount}%
                          </div>
                        )}
                      </div>

                      {/* Product information section */}
                      <div className="p-4 flex flex-col gap-1">
                        {/* Product title */}
                        <h2 className="text-slate-600 py-1 font-bold">
                          {p.name}
                        </h2>

                        {/* Price and rating section */}
                        <div className="flex gap-2">
                          <h2 className="text-lg font-bold text-slate-600">
                            ${p.price}
                          </h2>

                          {/* Product rating stars */}
                          <div className="flex ">
                            <Rating ratings={p.rating} />
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

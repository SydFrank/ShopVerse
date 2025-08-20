// Import React library
import React from "react";
// Import layout components
import Header from "../components/Header"; // Website header component
import Footer from "../components/Footer"; // Website footer component
// Import navigation components and icons
import { IoIosArrowForward } from "react-icons/io"; // Forward arrow icon for breadcrumb navigation
import { Link, useNavigate } from "react-router-dom"; // React Router Link component for navigation

/**
 * Card Component - Shopping Cart Page
 * Displays user's shopping cart with in-stock and out-of-stock products
 * Features product management (quantity adjustment, removal), order summary, and checkout
 * Includes responsive design for mobile and desktop views
 * Shows empty cart state with shop redirect when no products are present
 *
 * @returns {JSX.Element} Complete shopping cart page with product management and checkout functionality
 */
const Card = () => {
  // Initialize navigation hook
  const navigate = useNavigate();
  // Mock data for cart products - represents items currently in user's shopping cart
  // In production, this would be fetched from state management (Redux) or API
  const card_products = [1, 2]; // Array of product IDs or product objects

  // Mock data for out-of-stock products - items that are no longer available
  // These products remain in cart but cannot be purchased
  const outOfStockProducts = [1, 2]; // Array of unavailable product IDs

  // Redirect to shipping page
  const redirect = () => {
    navigate("/shipping", {
      state: {
        products: [],
        price: 500,
        shipping_fee: 40,
        items: 2,
      },
    });
  };

  return (
    <div>
      {/* Website header with navigation and user info */}
      <Header />

      {/* Hero banner section with cart page title and breadcrumb navigation */}
      <section className="bg-[url('/images/banner/shop.png')] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left">
        {/* Dark overlay for better text readability over background image */}
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] max-md:w-[80%] max-sm:w-[90%] max-lg:w-[90%] h-full mx-auto">
            {/* Centered content with page title and navigation breadcrumb */}
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold ">Card Page</h2>
              {/* Breadcrumb navigation for user orientation */}
              <div className="flex justify-center items-center gap-2 text-2xl w-full">
                <Link to="/">Home</Link>
                <span className="pt-1">
                  <IoIosArrowForward />
                </span>
                <span>Card</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main cart content section */}
      <section className="bg-[#eeeeee]">
        <div className="w-[85%] max-lg:w-[90%] max-md:w-[90%] max-sm:w-[90%] mx-auto py-16">
          {/* Conditional rendering: show cart contents if products exist, otherwise show empty cart */}
          {card_products.length > 0 || outOfStockProducts.length > 0 ? (
            <div className="flex flex-wrap">
              {/* Left section: Cart items (67% width on desktop, full width on mobile) */}
              <div className="w-[67%] max-lg:w-full">
                <div className="pr-3 max-lg:pr-0">
                  <div className="flex flex-col gap-3">
                    {/* In-stock products section */}
                    <div className="bg-white p-4">
                      <h2 className="text-md text-green-500 font-semibold">
                        Stock Products {card_products.length}
                      </h2>
                    </div>

                    {/* Map through in-stock products to display cart items */}
                    {card_products.map((p, i) => (
                      <div
                        key={i}
                        className="flex bg-white p-4 flex-col gap-2 "
                      >
                        {/* Store/seller information header */}
                        <div className="flex justify-start items-center">
                          <h2 className="text-md text-slate-600 font-bold ">
                            Easy Shop
                          </h2>
                        </div>

                        {/* Map through products from this seller */}
                        {[1, 2].map((product, index) => (
                          <div key={index} className="w-full flex flex-wrap ">
                            {/* Left section: Product image and details (58% width) */}
                            <div className="flex max-sm:w-full gap-2 w-7/12">
                              <div className="flex gap-2 justify-start items-center ">
                                {/* Product image */}
                                <img
                                  className="w-[80px] h-[80px]"
                                  src={`/images/products/${index + 1}.webp`}
                                  alt={`Product ${index + 1}`} // Accessible alt text
                                />

                                {/* Product information */}
                                <div className="pr-4 text-slate-600">
                                  <h2 className="text-md font-semibold">
                                    Product Name
                                  </h2>
                                  <span className="text-sm">Brand: VIVO</span>
                                </div>
                              </div>
                            </div>

                            {/* Right section: Pricing and quantity controls (42% width) */}
                            <div className="flex justify-between w-5/12 max-sm:w-full max-sm:mt-3 ">
                              {/* Price information with discount */}
                              <div className="pl-4 max-sm:pl-0 ">
                                <h2 className="text-lg text-orange-500">
                                  $1500 {/* Current discounted price */}
                                </h2>
                                <p className="line-through">$2000</p>{" "}
                                {/* Original price with strikethrough */}
                                <p>-25%</p> {/* Discount percentage */}
                              </div>

                              {/* Quantity controls and delete button */}
                              <div className="flex gap-2 flex-col">
                                {/* Quantity selector with increment/decrement buttons */}
                                <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl">
                                  <div className="px-3 cursor-pointer">-</div>{" "}
                                  {/* Decrease quantity */}
                                  <div className="px-3 ">2</div>{" "}
                                  {/* Current quantity */}
                                  <div className="px-3 cursor-pointer">
                                    +
                                  </div>{" "}
                                  {/* Increase quantity */}
                                </div>

                                {/* Remove item from cart button */}
                                <button className="px-5 py-[3px] bg-red-500 text-white">
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}

                    {/* Out-of-stock products section - only show if there are unavailable items */}
                    {outOfStockProducts.length > 0 && (
                      <div className="flex flex-col gap-3">
                        {/* Out-of-stock section header */}
                        <div className="bg-white p-4">
                          <h2 className="text-md text-red-500 font-semibold">
                            Out of Stock {outOfStockProducts.length}
                          </h2>
                        </div>

                        {/* Out-of-stock products container */}
                        <div className="bg-white p-4">
                          {[1].map((product, index) => (
                            <div key={index} className="w-full flex flex-wrap ">
                              {/* Product image and details section */}
                              <div className="flex max-sm:w-full gap-2 w-7/12">
                                <div className="flex gap-2 justify-start items-center ">
                                  {/* Product image */}
                                  <img
                                    className="w-[80px] h-[80px]"
                                    src={`/images/products/${index + 1}.webp`}
                                    alt={`Out of stock product ${index + 1}`} // Accessible alt text
                                  />

                                  {/* Product information */}
                                  <div className="pr-4 text-slate-600">
                                    <h2 className="text-md font-semibold">
                                      Product Name
                                    </h2>
                                    <span className="text-sm">Brand: VIVO</span>
                                  </div>
                                </div>
                              </div>

                              {/* Price and controls section */}
                              <div className="flex justify-between w-5/12 max-sm:w-full max-sm:mt-3 ">
                                {/* Price information (same as in-stock items) */}
                                <div className="pl-4 max-sm:pl-0 ">
                                  <h2 className="text-lg text-orange-500">
                                    $1500
                                  </h2>
                                  <p className="line-through">$2000</p>
                                  <p>-25%</p>
                                </div>

                                {/* Quantity controls (disabled for out-of-stock) and delete option */}
                                <div className="flex gap-2 flex-col">
                                  {/* Quantity selector (non-functional for out-of-stock items) */}
                                  <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl">
                                    <div className="px-3 cursor-pointer">-</div>
                                    <div className="px-3 ">2</div>
                                    <div className="px-3 cursor-pointer">+</div>
                                  </div>

                                  {/* Remove out-of-stock item from cart */}
                                  <button className="px-5 py-[3px] bg-red-500 text-white">
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right section: Order summary and checkout (33% width on desktop, full width on mobile) */}
              <div className="w-[33%] max-lg:w-full ">
                <div className="pl-3 max-md:pl-0 max-lg:mt-5">
                  {/* Order summary - only show if there are in-stock products */}
                  {card_products.length > 0 && (
                    <div className="bg-white p-3 text-slate-600 flex flex-col gap-3 ">
                      {/* Order summary header */}
                      <h2 className="text-xl font-bold">Order Summary</h2>

                      {/* Items count and subtotal */}
                      <div className="flex justify-between items-center ">
                        <span>2 Items</span>
                        <span>$343</span>
                      </div>

                      {/* Shipping fee */}
                      <div className="flex justify-between items-center ">
                        <span>Shipping Fee</span>
                        <span>$40</span>
                      </div>

                      {/* Coupon/voucher input section */}
                      <div className="flex gap-2 ">
                        <input
                          className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-green-500 rounded-sm"
                          type="text"
                          placeholder="Input Voucher Coupon"
                        />
                        <button className="px-5 py-[1px] bg-[#059473] text-white rounded-sm uppercase">
                          Apply
                        </button>
                      </div>

                      {/* Total price calculation */}
                      <div className="flex justify-between items-center ">
                        <span>Total</span>
                        <span className="text-lg text-[#059473]">$430</span>
                      </div>

                      {/* Proceed to checkout button */}
                      <button
                        onClick={redirect}
                        className="px-5 py-[6px] rounded-sm hover:shadow-red-500/50 hover:shadow-lg bg-red-500 text-sm uppercase text-white "
                      >
                        Proceed to checkout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            // Empty cart state - show when no products in cart
            <div>
              <Link to="/shops" className="px-4 py-1 bg-indigo-500 text-white">
                Shop Now
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Website footer */}
      <Footer />
    </div>
  );
};

// Export the Card component as default export for use in other parts of the application
export default Card;

// React core imports for functional component with state management
import React, { useState } from "react";

// Custom component imports for page structure
import Header from "../components/Header"; // Website header with navigation and user info
import Footer from "../components/Footer"; // Website footer with links and company info

// React Icons library for UI elements
import { IoIosArrowForward } from "react-icons/io"; // Forward arrow icon for breadcrumb navigation

// React Router for navigation between pages
import { Link } from "react-router-dom"; // React Router Link component for navigation

/**
 * Shipping Component - E-commerce Shipping Information and Order Summary Page
 *
 * This component renders the shipping page of the ShopVerse e-commerce application,
 * handling user shipping information collection, address management, cart item display,
 * and order summary with checkout functionality. The page includes form validation,
 * responsive design, and conditional rendering based on whether shipping information
 * has been saved or not.
 *
 * Features:
 * - Comprehensive shipping address form with 7 fields (name, address, phone, etc.)
 * - Form validation and controlled inputs with real-time updates
 * - Toggle between form editing and saved address display modes
 * - Cart items display with product details, pricing, and quantity controls
 * - Order summary calculation with itemized breakdown and total
 * - Responsive design optimized for all screen sizes
 * - Conditional checkout button based on shipping information completion
 *
 * @component
 * @returns {JSX.Element} Complete shipping page with form, cart, and checkout
 */

/**
 * Shipping Functional Component
 * Manages shipping information form, cart display, and order checkout process
 */
const Shipping = () => {
  // State to track whether shipping information has been saved and confirmed
  // Controls the display toggle between form editing mode and address confirmation mode
  const [res, setRes] = useState(false);

  // Get the state from the location (currently commented out)
  // const { state } = useLocation();
  // console.log(state);

  // Shipping form state object containing all required address fields
  // Manages controlled inputs for comprehensive shipping information collection
  const [state, setState] = useState({
    name: "", // Customer's full name for shipping
    address: "", // Street address for delivery
    phone: "", // Contact phone number for delivery coordination
    post: "", // Postal/ZIP code for location identification
    province: "", // Province/state for regional addressing
    city: "", // City name for delivery location
    area: "", // Specific area/district for precise delivery
  });

  /**
   * Input Change Handler
   * Handles controlled input updates for all form fields using dynamic property assignment.
   * Uses the input's name attribute to update the corresponding state property.
   *
   * @param {Event} e - Input change event containing name and value
   */
  const inputHandle = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  /**
   * Form Submission Handler
   * Processes shipping information form submission with validation and state update.
   * Validates all required fields are filled before enabling confirmation mode.
   * In production, this would send data to backend API for processing.
   *
   * @param {Event} e - Form submission event
   */
  const save = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // console.log(state);

    // Destructure all required shipping fields for validation
    const { name, address, phone, post, province, city, area } = state;

    // Validate all fields are populated before proceeding
    if (name && address && phone && post && province && city && area) {
      // Send the data to the server (commented for development)
      // console.log("Sending data to the server:", state);
      setRes(true); // Switch to address confirmation display mode
    }
  };

  return (
    <div>
      {/* Website header component with navigation and user authentication */}
      <Header />

      {/* Hero banner section with shipping page title and breadcrumb navigation */}
      <section className="bg-[url('/images/banner/shop.png')] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left">
        {/* Dark overlay for better text readability over background image */}
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] max-md:w-[80%] max-sm:w-[90%] max-lg:w-[90%] h-full mx-auto">
            {/* Centered content with page title and navigation breadcrumb */}
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold ">Shipping Page</h2>
              {/* Breadcrumb navigation for user orientation */}
              <div className="flex justify-center items-center gap-2 text-2xl w-full">
                <Link to="/">Home</Link>
                <span className="pt-1">
                  <IoIosArrowForward />
                </span>
                <span>Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content section with shipping form and cart summary */}
      <section className="bg-[#eeeeee]">
        <div className="w-[85%] max-lg:w-[90%] max-md:w-[90%] max-sm:w-[90%] mx-auto py-16">
          <div className="w-full flex flex-wrap ">
            {/* Left section: Shipping information form and cart items (67% width on desktop) */}
            <div className="w-[67%] max-lg:w-full ">
              <div className="flex flex-col gap-3">
                {/* Shipping information form container */}
                <div className="bg-white p-6 shadow-sm rounded-md">
                  <h2 className="text-slate-600 font-bold pb-3 ">
                    Shipping Information
                  </h2>

                  {/* Conditional rendering: Show form when address not saved (!res) */}
                  {!res && (
                    <>
                      <form onSubmit={save}>
                        {/* First row: Name and Address fields */}
                        <div className="flex max-md:flex-col max-md:gap-2 w-full gap-5 text-slate-600">
                          {/* Name input field with controlled state */}
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="name">Name</label>
                            <input
                              onChange={inputHandle}
                              value={state.name}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="name"
                              id="name"
                              placeholder="Name"
                            />
                          </div>

                          {/* Address input field with controlled state */}
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="address">Address</label>
                            <input
                              onChange={inputHandle}
                              value={state.address}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="address"
                              id="address"
                              placeholder="Address"
                            />
                          </div>
                        </div>

                        {/* Second row: Phone and Postal Code fields */}
                        <div className="flex max-md:flex-col max-md:gap-2 w-full gap-5 text-slate-600">
                          {/* Phone number input field with controlled state */}
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="phone">Phone</label>
                            <input
                              onChange={inputHandle}
                              value={state.phone}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="phone"
                              id="phone"
                              placeholder="Phone"
                            />
                          </div>

                          {/* Postal/ZIP code input field with controlled state */}
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="post">Post</label>
                            <input
                              onChange={inputHandle}
                              value={state.post}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="post"
                              id="post"
                              placeholder="Post"
                            />
                          </div>
                        </div>

                        {/* Third row: Province and City fields */}
                        <div className="flex max-md:flex-col max-md:gap-2 w-full gap-5 text-slate-600">
                          {/* Province/State input field with controlled state */}
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="province">Province</label>
                            <input
                              onChange={inputHandle}
                              value={state.province}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="province"
                              id="province"
                              placeholder="Province"
                            />
                          </div>

                          {/* City input field with controlled state */}
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="city">City</label>
                            <input
                              onChange={inputHandle}
                              value={state.city}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="city"
                              id="city"
                              placeholder="City"
                            />
                          </div>
                        </div>

                        {/* Fourth row: Area field and Submit button */}
                        <div className="flex max-md:flex-col max-md:gap-2 w-full gap-5 text-slate-600">
                          {/* Area/District input field with controlled state */}
                          <div className="flex flex-col gap-1 mb-2 w-full">
                            <label htmlFor="area">Area</label>
                            <input
                              onChange={inputHandle}
                              value={state.area}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                              name="area"
                              id="area"
                              placeholder="Area"
                            />
                          </div>

                          {/* Form submission button container with top margin for alignment */}
                          <div className="flex flex-col gap-1 mt-7 mb-2 w-full">
                            <button className="px-3 py-[6px] rounded-sm hover:shadow-green-500/50 hover:shadow-lg bg-green-500 text-white">
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </form>
                    </>
                  )}

                  {/* Conditional rendering: Show saved address confirmation when form is submitted (res = true) */}
                  {res && (
                    <>
                      <div className="flex flex-col gap-1 ">
                        {/* Address confirmation header with customer name */}
                        <h2 className="text-slate-600 font-semibold pb-2">
                          Deliver To {state.name}
                        </h2>
                        {/* Complete address display with edit option */}
                        <p>
                          {/* Home delivery label badge */}
                          <span className="bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2 py-1 rounded">
                            Home
                          </span>
                          {/* Full concatenated address from all form fields */}
                          <span>
                            {state.phone} {state.address} {state.province}{" "}
                            {state.city} {state.area}{" "}
                          </span>
                          {/* Edit button to return to form mode */}
                          <span
                            onClick={() => setRes(false)}
                            className="text-indigo-500 cursor-pointer "
                          >
                            Change
                          </span>
                        </p>
                        {/* Email notification address display */}
                        <p className="text-slate-600 text-sm">
                          Email To frankzhsy@gmail.com
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* Cart items display section - Map through mock sellers/stores */}
                {[1, 2].map((p, i) => (
                  <div key={i} className="flex bg-white p-4 flex-col gap-2 ">
                    {/* Store/seller information header for grouping products */}
                    <div className="flex justify-start items-center">
                      <h2 className="text-md text-slate-600 font-bold ">
                        Easy Shop
                      </h2>
                    </div>

                    {/* Map through products from this specific seller */}
                    {[1, 2].map((product, index) => (
                      <div key={index} className="w-full flex flex-wrap ">
                        {/* Left section: Product image and details (7/12 width on desktop) */}
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
                              <div className="px-3 cursor-pointer">+</div>{" "}
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
              </div>
            </div>

            {/* Right section: Order summary and checkout (1/3 width on desktop, full width on mobile) */}
            <div className="w-[33%] max-lg:w-full ">
              <div className="pl-3 max-md:pl-0 max-lg:mt-5">
                {/* Order summary card with pricing breakdown and checkout */}
                <div className="bg-white p-3 text-slate-600 flex flex-col gap-3 ">
                  {/* Order summary section header */}
                  <h2 className="text-xl font-bold">Order Summary</h2>

                  {/* Items count and subtotal calculation */}
                  <div className="flex justify-between items-center ">
                    <span>Items Total(5)</span>
                    <span>$343</span>
                  </div>

                  {/* Shipping/delivery fee display */}
                  <div className="flex justify-between items-center ">
                    <span>Delivery Fee</span>
                    <span>$40</span>
                  </div>

                  {/* Total payment amount before final calculation */}
                  <div className="flex justify-between items-center ">
                    <span>Total payment</span>
                    <span className="text-lg ">$430</span>
                  </div>

                  {/* Final total amount with emphasized styling */}
                  <div className="flex justify-between items-center ">
                    <span>Total </span>
                    <span className="text-lg text-[#059473]">$430</span>
                  </div>

                  {/* Conditional place order button - disabled until shipping info is saved */}
                  <button
                    disabled={res ? false : true} // Enable only when shipping address is confirmed
                    className={`px-5 py-[6px] rounded-sm hover:shadow-red-500/50 hover:shadow-lg ${
                      res ? "bg-red-500" : "bg-red-300" // Dynamic styling based on shipping status
                    }  text-sm uppercase text-white`}
                  >
                    Place order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Website footer component with links and company information */}
      <Footer />
    </div>
  );
};

export default Shipping;

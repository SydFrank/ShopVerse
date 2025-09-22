/**
 * Shipping Page - Shipping information and order checkout
 * Handles address form, cart display, and order summary
 */

import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { place_order } from "../store/reducers/orderReducer";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const {
    state: { products, price, shipping_fee, items },
  } = useLocation();

  // Toggle between form and saved address display
  const [res, setRes] = useState(false);

  // Shipping form state
  const [state, setState] = useState({
    name: "",
    address: "",
    phone: "",
    post: "",
    province: "",
    city: "",
    area: "",
  });

  // Handle input changes
  const inputHandle = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // Save shipping information
  const save = (e) => {
    e.preventDefault();
    const { name, address, phone, post, province, city, area } = state;

    // Validate all fields are filled
    if (name && address && phone && post && province && city && area) {
      setRes(true); // Show saved address
    }
  };

  const placeOrder = () => {
    dispatch(
      place_order({
        price,
        products,
        shipping_fee,
        items,
        shippingInfo: state,
        userId: userInfo.id,
        navigate,
      })
    );
  };

  return (
    <div>
      {/* Header */}
      <Header />

      {/* Page Banner */}
      <section className="bg-[url('/images/banner/shop.png')] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left">
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] max-md:w-[80%] max-sm:w-[90%] max-lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold ">Shipping Page</h2>
              {/* Breadcrumb Navigation */}
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

      {/* Main Content */}
      <section className="bg-[#eeeeee]">
        <div className="w-[85%] max-lg:w-[90%] max-md:w-[90%] max-sm:w-[90%] mx-auto py-16">
          <div className="w-full flex flex-wrap ">
            {/* Left: Shipping Form & Cart */}
            <div className="w-[67%] max-lg:w-full ">
              <div className="flex flex-col gap-3">
                {/* Shipping Information */}
                <div className="bg-white p-6 shadow-sm rounded-md">
                  <h2 className="text-slate-600 font-bold pb-3 ">
                    Shipping Information
                  </h2>

                  {/* Show form or saved address */}
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
                {products.map((p, i) => (
                  <div key={i} className="flex bg-white p-4 flex-col gap-2 ">
                    {/* Store/seller information header for grouping products */}
                    <div className="flex justify-start items-center">
                      <h2 className="text-md text-slate-600 font-bold ">
                        {p.shopName}
                      </h2>
                    </div>

                    {/* Map through products from this specific seller */}
                    {p.products.map((pt, index) => (
                      <div key={index} className="w-full flex flex-wrap ">
                        {/* Left section: Product image and details (7/12 width on desktop) */}
                        <div className="flex max-sm:w-full gap-2 w-7/12">
                          <div className="flex gap-2 justify-start items-center ">
                            {/* Product image */}
                            <img
                              className="w-[80px] h-[80px]"
                              src={pt.productInfo.images[0]}
                              alt={`Product ${index + 1}`} // Accessible alt text
                            />

                            {/* Product information */}
                            <div className="pr-4 text-slate-600">
                              <h2 className="text-md font-semibold">
                                {pt.productInfo.name}
                              </h2>
                              <span className="text-sm">
                                Brand: {pt.productInfo.brand}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right section: Pricing and quantity controls (42% width) */}
                        <div className="flex justify-between w-5/12 max-sm:w-full max-sm:mt-3 ">
                          {/* Price information with discount */}
                          <div className="pl-4 max-sm:pl-0 ">
                            <h2 className="text-lg text-orange-500">
                              $
                              {pt.productInfo.price -
                                Math.floor(
                                  pt.productInfo.price *
                                    (pt.productInfo.discount / 100)
                                )}{" "}
                              {/* Current discounted price */}
                            </h2>
                            <p className="line-through">
                              ${pt.productInfo.price}
                            </p>{" "}
                            {/* Original price with strikethrough */}
                            <p>-{pt.productInfo.discount}%</p>{" "}
                            {/* Discount percentage */}
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
                    <span>Items Total({items})</span>
                    <span>${price}</span>
                  </div>

                  {/* Shipping/delivery fee display */}
                  <div className="flex justify-between items-center ">
                    <span>Delivery Fee</span>
                    <span>${shipping_fee}</span>
                  </div>

                  {/* Total payment amount before final calculation */}
                  <div className="flex justify-between items-center ">
                    <span>Total payment</span>
                    <span className="text-lg ">${price + shipping_fee}</span>
                  </div>

                  {/* Final total amount with emphasized styling */}
                  <div className="flex justify-between items-center ">
                    <span>Total </span>
                    <span className="text-lg text-[#059473]">
                      ${price + shipping_fee}
                    </span>
                  </div>

                  {/* Conditional place order button - disabled until shipping info is saved */}
                  <button
                    onClick={placeOrder}
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Shipping;

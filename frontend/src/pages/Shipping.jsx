import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { IoIosArrowForward } from "react-icons/io"; // Forward arrow icon for breadcrumb navigation
import { Link, useLocation } from "react-router-dom"; // React Router Link component for navigation

const Shipping = () => {
  // Response state
  const [res, setRes] = useState(false);

  // Get the state from the location
  // const { state } = useLocation();
  // console.log(state);

  // Initialize state
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

  // Handle form submission
  const save = (e) => {
    e.preventDefault();
    // console.log(state);
    // Send the data to the server
    const { name, address, phone, post, province, city, area } = state;
    if (name && address && phone && post && province && city && area) {
      // Send the data to the server
      // console.log("Sending data to the server:", state);
      setRes(true);
    }
  };

  return (
    <div>
      <Header />
      {/* Hero banner section with cart page title and breadcrumb navigation */}
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

      <section className="bg-[#eeeeee]">
        <div className="w-[85%] max-lg:w-[90%] max-md:w-[90%] max-sm:w-[90%] mx-auto py-16">
          <div className="w-full flex flex-wrap ">
            <div className="w-[67%] max-lg:w-full ">
              <div className="flex flex-col gap-3">
                <div className="bg-white p-6 shadow-sm rounded-md">
                  <h2 className="text-slate-600 font-bold pb-3 ">
                    Shipping Information
                  </h2>

                  {!res && (
                    <>
                      <form onSubmit={save}>
                        <div className="flex max-md:flex-col max-md:gap-2 w-full gap-5 text-slate-600">
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

                        <div className="flex max-md:flex-col max-md:gap-2 w-full gap-5 text-slate-600">
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

                        <div className="flex max-md:flex-col max-md:gap-2 w-full gap-5 text-slate-600">
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

                        <div className="flex max-md:flex-col max-md:gap-2 w-full gap-5 text-slate-600">
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

                          <div className="flex flex-col gap-1 mt-7 mb-2 w-full">
                            <button className="px-3 py-[6px] rounded-sm hover:shadow-green-500/50 hover:shadow-lg bg-green-500 text-white">
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </form>
                    </>
                  )}

                  {res && (
                    <>
                      <div className="flex flex-col gap-1 ">
                        <h2 className="text-slate-600 font-semibold pb-2">
                          Deliver To {state.name}
                        </h2>
                        <p>
                          <span className="bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2 py-1 rounded">
                            Home
                          </span>
                          <span>address, province city </span>
                          <span
                            onClick={() => setRes(false)}
                            className="text-indigo-500 cursor-pointer "
                          >
                            Change
                          </span>
                        </p>
                        <p className="text-slate-600 text-sm">
                          Email To frankzhsy@gmail.com
                        </p>
                      </div>
                    </>
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

export default Shipping;

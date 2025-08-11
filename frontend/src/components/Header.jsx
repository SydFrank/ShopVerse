// Import React library
import React, { useState } from "react";
// Import Material Design icons
import { MdEmail } from "react-icons/md"; // Email icon
import { MdOutlineSmartphone } from "react-icons/md"; // Phone icon
import { MdKeyboardArrowDown } from "react-icons/md"; // Dropdown arrow icon
// Import Font Awesome icons
import { FaFacebookF, FaList } from "react-icons/fa"; // Facebook icon
import { FaTwitter } from "react-icons/fa"; // Twitter icon
import { FaLinkedinIn } from "react-icons/fa"; // LinkedIn icon
import { FaGithub } from "react-icons/fa6"; // GitHub icon
import { FaUserAlt } from "react-icons/fa"; // User icon
import { FaLock } from "react-icons/fa"; // Lock icon
// Import Link component from React Router for navigation
import { Link, useLocation } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

/**
 * Header Component - Website top navigation bar
 * Contains contact information, social media links, language selector and user login status
 */
const Header = () => {
  // Get the current pathname from the URL
  const { pathname } = useLocation();
  // console.log(pathname);

  // State to manage sidebar visibility
  const [showSidebar, setShowSidebar] = useState(true);
  // State to manage category visibility (not used in this snippet but can be implemented)
  const [categoryShow, setCategoryShow] = useState(true);

  // Mock user login status (should be retrieved from state manager or API in actual project)
  const user = true;

  const wishlist_count = 3; // Mock wishlist count (should be dynamic in actual project)

  // Mock categories (should be fetched from an API or state manager in actual project)
  const categorys = [
    "Mobiles",
    "Laptops",
    "Speakers",
    "Top wear",
    "Footwear",
    "Watches",
    "Home Decor",
    "Smart Watches",
  ];

  return (
    // Main header container with full width and white background
    <div className="w-full bg-white">
      {/* Top bar - hidden on mobile, visible on medium+ screens */}
      <div className="bg-[#caddff] max-md:hidden">
        {/* Container with responsive width */}
        <div className="w-[85%] lg:w-[90%] mx-auto">
          {/* Main content row with flex layout */}
          <div className="flex w-full justify-between items-center h-[50px] text-slate-500">
            {/* Left section: Contact information */}
            <ul className="flex justify-start items-center gap-8 font-semibold text-black ">
              {/* Email contact item with separator line */}
              <li className="flex relative justify-center items-center gap-2 text-sm after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]">
                <span>
                  <MdEmail />
                </span>
                <span>support@gmail.com</span>
              </li>
              {/* Phone contact item */}
              <li className="flex relative justify-center items-center gap-2 text-sm ">
                <span>
                  <MdOutlineSmartphone />
                </span>
                <span>+(61) 0499 567 480</span>
              </li>
            </ul>

            {/* Right section: Social media, language selector, and user section */}
            <div className="flex justify-center items-center gap-10">
              {/* Social media links */}
              <div className="flex justify-center items-center gap-4 text-black">
                <a href="#">
                  <FaFacebookF />
                </a>
                <a href="#">
                  <FaTwitter />
                </a>
                <a href="#">
                  <FaLinkedinIn />
                </a>
                {/* <a href="#">
                  <FaGithub />
                </a> */}
              </div>

              {/* Language selector with dropdown */}
              <div className="flex group cursor-pointer text-slate-800 text-sm justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute before:absolute before:h-[18px] before:w-[1px] before:bg-[#afafaf] before:-left-[20px]">
                <img src="/images/language.png" />
                <span>
                  <MdKeyboardArrowDown />
                </span>

                {/* Dropdown menu for language options */}
                <ul className="absolute invisible transition-all top-12 rounded-sm duration-200 text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-10">
                  <li>English</li>
                  <li>Japanese</li>
                </ul>
              </div>

              {/* Conditional rendering based on user login status */}
              {user ? (
                /* Logged in user display */
                <Link
                  className="flex cursor-pointer justify-center items-center gap-2 text-sm text-black "
                  to="/dashboard"
                >
                  <span>
                    <FaUserAlt />
                  </span>
                  <span>George Li</span>
                </Link>
              ) : (
                /* Login link for non-logged in users */
                <Link
                  className="flex cursor-pointer justify-center items-center gap-2 text-sm text-black "
                  to="/dashboard"
                >
                  <span>
                    <FaLock />
                  </span>
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-white">
        {/* Main header container with responsive width */}
        <div className="w-[85%] lg:w-[90%] mx-auto">
          {/* Header content with flex layout */}
          <div className="h-[80px] max-md:h-[100px] flex justify-between items-center flex-wrap">
            {/* Left section: Logo and sidebar toggle */}
            <div className="max-lg:w-full w-3/12 max-lg:pt-4">
              {/* Logo and sidebar toggle container */}
              <div className="flex justify-between items-center">
                {/* Logo section with link to home */}
                <Link to="/">
                  <img src="/images/logo.png" />
                </Link>

                {/* Sidebar toggle button for mobile view */}
                <div
                  onClick={() => setShowSidebar(false)}
                  className="justify-center items-center w-[30px] h-[30px] bg-white text-slate-600 border border-slate-600 rounded-sm cursor-pointer lg:hidden max-lg:flex"
                >
                  <span>
                    <FaList />
                  </span>
                </div>
              </div>
            </div>

            <div className="max-lg:w-full w-9/12">
              <div className="flex justify-between max-lg:justify-center items-center flex-wrap pl-8">
                {/* Sidebar for mobile view */}
                <ul className="flex justify-start items-start gap-8 text-sm font-bold uppercase max-lg:hidden">
                  <li>
                    <Link
                      className={`p-2 block ${
                        pathname === "/" ? "text-[#059473]" : "text-slate-600"
                      }`}
                    >
                      HOME
                    </Link>
                  </li>

                  <li>
                    <Link
                      className={`p-2 block ${
                        pathname === "/shop"
                          ? "text-[#059473]"
                          : "text-slate-600"
                      }`}
                    >
                      SHOP
                    </Link>
                  </li>

                  <li>
                    <Link
                      className={`p-2 block ${
                        pathname === "/blog"
                          ? "text-[#059473]"
                          : "text-slate-600"
                      }`}
                    >
                      BLOG
                    </Link>
                  </li>

                  <li>
                    <Link
                      className={`p-2 block ${
                        pathname === "/about"
                          ? "text-[#059473]"
                          : "text-slate-600"
                      }`}
                    >
                      ABOUT US
                    </Link>
                  </li>

                  <li>
                    <Link
                      className={`p-2 block ${
                        pathname === "/contact"
                          ? "text-[#059473]"
                          : "text-slate-600"
                      }`}
                    >
                      CONTACT US
                    </Link>
                  </li>
                </ul>

                <div className="flex max-lg:hidden justify-center items-center gap-5">
                  <div className="flex justify-center gap-5">
                    {/* Wishlist icon with count */}
                    <div className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]">
                      <span className="text-xl text-green-500">
                        <FaHeart />
                      </span>
                      <div className="w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                        {wishlist_count}
                      </div>
                    </div>

                    {/* Cart icon with count */}
                    <div className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]">
                      <span className="text-xl text-green-500">
                        <FaShoppingCart />
                      </span>
                      <div className="w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                        {wishlist_count}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden max-lg:block">
        <div
          onClick={() => setShowSidebar(true)}
          className={`fixed duration-200 transition-all ${
            showSidebar ? "invisible" : "visible"
          } hidden max-lg:block w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-20`}
        ></div>
        <div
          className={`w-[300px] z-[9999] transition-all duration-200 fixed ${
            showSidebar ? "-left-[300px]" : "left-0 top-0"
          } overflow-y-auto bg-white h-screen py-6 px-8`}
        >
          <div className="flex justify-start flex-col gap-6">
            <Link to="/">
              <img src="/images/logo.png" />
            </Link>
            <div className="flex justify-start items-center gap-10">
              {/* Language selector with dropdown */}
              <div className="flex group cursor-pointer text-slate-800 text-sm justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute ">
                <img src="/images/language.png" />
                <span>
                  <MdKeyboardArrowDown />
                </span>

                {/* Dropdown menu for language options */}
                <ul className="absolute invisible transition-all top-12 rounded-sm duration-200 text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-10">
                  <li>English</li>
                  <li>Japanese</li>
                </ul>
              </div>

              {/* Conditional rendering based on user login status */}
              {user ? (
                /* Logged in user display */
                <Link
                  className="flex cursor-pointer justify-center items-center gap-2 text-sm text-black "
                  to="/dashboard"
                >
                  <span>
                    <FaUserAlt />
                  </span>
                  <span>George Li</span>
                </Link>
              ) : (
                /* Login link for non-logged in users */
                <Link
                  className="flex cursor-pointer justify-center items-center gap-2 text-sm text-black "
                  to="/dashboard"
                >
                  <span>
                    <FaLock />
                  </span>
                  <span>Login</span>
                </Link>
              )}
            </div>

            {/* Sidebar for mobile view */}
            <ul className="flex flex-col justify-start items-start  text-sm font-bold uppercase ">
              <li>
                <Link
                  className={`py-2 block ${
                    pathname === "/" ? "text-[#059473]" : "text-slate-600"
                  }`}
                >
                  HOME
                </Link>
              </li>

              <li>
                <Link
                  className={`py-2 block ${
                    pathname === "/shop" ? "text-[#059473]" : "text-slate-600"
                  }`}
                >
                  SHOP
                </Link>
              </li>

              <li>
                <Link
                  className={`py-2 block ${
                    pathname === "/blog" ? "text-[#059473]" : "text-slate-600"
                  }`}
                >
                  BLOG
                </Link>
              </li>

              <li>
                <Link
                  className={`py-2 block ${
                    pathname === "/about" ? "text-[#059473]" : "text-slate-600"
                  }`}
                >
                  ABOUT US
                </Link>
              </li>

              <li>
                <Link
                  className={`py-2 block ${
                    pathname === "/contact"
                      ? "text-[#059473]"
                      : "text-slate-600"
                  }`}
                >
                  CONTACT US
                </Link>
              </li>
            </ul>

            {/* Social media links */}
            <div className="flex  justify-start items-center gap-4 text-black">
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaLinkedinIn />
              </a>
              {/* <a href="#">
                  <FaGithub />
                </a> */}
            </div>

            {/* Wishlist and Cart icons with counts */}
            <div className="w-full flex justify-end max-lg:justify-start gap-3 items-center">
              <div className="w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center">
                <span>
                  <FaPhoneAlt />
                </span>
              </div>

              <div className="flex justify-end flex-col gap-1">
                <h2 className="text-sm font-semibold text-slate-700">
                  +(61) 0499 567 480
                </h2>
                <span className="text-xs">Support 24/7</span>
              </div>
            </div>

            <ul className="flex flex-col justify-start items-start gap-3 text-[#1c1c1c]">
              <li className="flex justify-start items-center gap-2 text-sm">
                <span>
                  <MdEmail />
                </span>
                <span>support@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-[85%] lg:w-[90%] mx-auto">
        <div className="flex w-full flex-wrap max-lg:gap-8 ">
          {/* Left section: Category dropdown */}
          <div className="w-3/12 max-lg:w-full">
            <div className="bg-white relative">
              {/* Category dropdown button */}
              <div
                onClick={() => setCategoryShow(!categoryShow)}
                className="h-[50px] bg-[#059473] text-white flex justify-center max-lg:justify-between max-lg:px-6 items-center gap-3 font-bold text-md cursor-pointer"
              >
                <div className="flex justify-center items-center gap-3">
                  <span>
                    <FaList />
                  </span>
                  <span>All Category</span>
                </div>
                <span className="pt-1">
                  <MdKeyboardArrowDown />
                </span>
              </div>
              {/* Category dropdown content */}
              {/* This div is conditionally shown based on categoryShow state */}
              <div
                className={`${
                  categoryShow ? "h-0" : "h-[400px]"
                } overflow-hidden transition-all duration-500 max-lg:relative absolute z-[9999] bg-[#dbf3ed] w-full border-x `}
              >
                {/* Category list */}
                <ul className="py-2 text-slate-600 font-medium ">
                  {categorys.map((curVal, index) => {
                    return (
                      <li
                        key={index}
                        className="flex justify-start items-center gap-2 px-[24px] py-[6px]"
                      >
                        <Link className="text-sm block">{curVal}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div></div>
          </div>
          {/* Center section: Search bar */}
          <div className="w-9/12 pl-8 max-lg:pl-0 max-lg:w-full">
            <div className="flex flex-wrap w-full justify-between items-center max-lg:gap-6">
              <div className="w-8/12 max-lg:w-full">
                <div className="flex border h-[50px] items-center relative gap-6">
                  <div className="relative after:absolute after:h-[25px] after:w-[1px] after:bg-[#afafaf] after:-right-[15px] max-md:hidden">
                    <select
                      name=""
                      id=""
                      className="w-[170px] text-slate-650 font-semibold bg-transparent px-2 h-full outline-0 border-none"
                    >
                      <option value="">Select Category</option>
                      {categorys.map((curVal, index) => (
                        <option value={curVal}>{curVal}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

// Import React library
import React from "react";
// Import Link component from React Router for navigation
import { Link, useNavigate } from "react-router-dom";
// Import social media icons from Font Awesome
import { FaFacebookF } from "react-icons/fa"; // Facebook icon
import { FaTwitter } from "react-icons/fa"; // Twitter icon
import { FaLinkedinIn } from "react-icons/fa"; // LinkedIn icon
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

/**
 * Footer Component - Website footer section
 * Contains company information, useful links, newsletter subscription, and social media links
 * Features responsive design with mobile-friendly layout adaptations
 *
 * @returns {JSX.Element} Complete footer section with company info, links, and social media
 */
const Footer = () => {
  // Hook to navigate programmatically
  const navigate = useNavigate();
  // Access user information from Redux store
  const { userInfo } = useSelector((state) => state.auth);
  // Select cart product count from cart reducer state
  const { cart_product_count, wishlist_count } = useSelector(
    (state) => state.cart
  );

  return (
    // Main footer container with light background
    <footer className="bg-[#f3f6fa]">
      {/* Main footer content with responsive grid layout */}
      <div className="w-[85%] flex flex-wrap mx-auto border-b py-16 max-lg:pb-10 max-sm:pb-6">
        {/* Company Information Section - Left Column */}
        <div className="w-3/12 max-lg:w-4/12 max-sm:w-4/12">
          <div className="flex flex-col gap-3">
            {/* Company logo */}
            <img
              className="w-[190px] h-[70px]"
              src={`/images/logo.png`}
              alt="ShopVerse company logo"
            />
            {/* Contact information list */}
            <ul className="flex flex-col gap-2 text-slate-600">
              <li>Address: 890 Bourke Street, Zetland, NSW 2017</li>
              <li>Phone: (02) 9123 4567</li>
              <li>Email: info@shopverse.com.au</li>
            </ul>
          </div>
        </div>

        {/* Useful Links Section - Middle Column */}
        <div className="w-5/12 max-lg:w-8/12 max-sm:w-full">
          <div className="flex justify-center max-sm:justify-start max-sm:mt-6 w-full">
            <div>
              {/* Section title */}
              <h2 className="font-bold text-lg mb-2">Useful Links</h2>
              {/* Two-column link layout */}
              <div className="flex flex-between gap-[80px] max-lg:gap-[40px]">
                {/* First column of links */}
                <ul className="flex flex-col gap-2 text-slate-600 text-sm font-semibold">
                  <li>
                    <Link>About Us </Link>
                  </li>
                  <li>
                    <Link>About Our Shop </Link>
                  </li>
                  <li>
                    <Link>Delivery Information </Link>
                  </li>
                  <li>
                    <Link>Privacy Policy </Link>
                  </li>
                  <li>
                    <Link>Blogs </Link>
                  </li>
                </ul>
                {/* Second column of links */}
                <ul className="flex flex-col gap-2 text-slate-600 text-sm font-semibold">
                  <li>
                    <Link>Our Service </Link>
                  </li>
                  <li>
                    <Link>Company Profile</Link>
                  </li>
                  <li>
                    <Link>Delivery Information </Link>
                  </li>
                  <li>
                    <Link>Privacy Policy </Link>
                  </li>
                  <li>
                    <Link>Blogs </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter and Social Media Section - Right Column */}
        <div className="w-4/12 max-lg:w-full max-lg:mt-6">
          <div className="w-full flex flex-col justify-start gap-5 ">
            {/* Newsletter subscription section */}
            <h2 className="font-bold text-lg mb-2">Join Our Shop</h2>
            <span>
              Get Email updates about our latest and shop specials offers
            </span>

            {/* Email subscription form */}
            <div className="h-[50px] w-full bg-white border border-gray-100 relative ">
              {/* Email input field */}
              <input
                className="h-full bg-transparent w-full px-3 outline-0"
                type="text"
                placeholder="Enter Your Email"
              />
              {/* Subscribe button */}
              <button className="h-full absolute right-0 bg-[#059473] text-white uppercase px-4 font-bold text-sm">
                Subscribe
              </button>
            </div>

            {/* Social media links */}
            <ul className="flex justify-start items-center gap-3 ">
              {/* Facebook link */}
              <li>
                <a
                  className="w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full"
                  href="#"
                  aria-label="Follow us on Facebook"
                >
                  <FaFacebookF />
                </a>
              </li>
              {/* Twitter link */}
              <li>
                <a
                  className="w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full"
                  href="#"
                  aria-label="Follow us on Twitter"
                >
                  <FaTwitter />
                </a>
              </li>
              {/* LinkedIn link */}
              <li>
                <a
                  className="w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full"
                  href="#"
                  aria-label="Follow us on LinkedIn"
                >
                  <FaLinkedinIn />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright section - Bottom of footer */}
      <div className="w-[90%] flex flex-wrap justify-center items-center text-slate-600 mx-auto py-5 text-center ">
        <span>Copyright &copy; 2025 All rights reserved</span>
      </div>

      <div
        className="hidden fixed max-lg:block w-[55px] h-[120px] bottom-4 right-0.5
     bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-2"
      >
        <div className="w-full h-full flex gap-3 flex-col justify-center items-center">
          {/* Cart */}
          <div
            onClick={() => navigate(userInfo ? "/cart" : "/login")}
            className="relative flex justify-center items-center cursor-pointer 
        w-[38px] h-[38px] rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            <span className="text-xl text-gray-700">
              <FaShoppingCart />
            </span>
            {cart_product_count !== 0 && (
              <div
                className="w-[20px] h-[20px] absolute bg-green-600 rounded-full text-white 
          flex justify-center items-center -top-1 -right-1 text-xs font-semibold"
              >
                {cart_product_count}
              </div>
            )}
          </div>

          {/* Wish List */}
          <div
            onClick={() =>
              navigate(userInfo ? "/dashboard/my-wishlist" : "/login")
            }
            className="relative flex justify-center items-center cursor-pointer
        w-[38px] h-[38px] rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            <span className="text-xl text-gray-700">
              <FaHeart />
            </span>
            {wishlist_count !== 0 && (
              <div
                className="w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white 
          flex justify-center items-center -top-1 -right-1 text-xs font-semibold"
              >
                {wishlist_count}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

// Export the Footer component as default export for use in other parts of the application
export default Footer;

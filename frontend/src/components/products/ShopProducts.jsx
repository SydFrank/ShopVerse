// Import React library
import React from "react";
// Import icons for product actions
import { FaEye, FaRegHeart } from "react-icons/fa"; // Eye and heart icons from Font Awesome
import { LuShoppingCart } from "react-icons/lu"; // Shopping cart icon from Lucide
// Import custom components
import Rating from "../Rating"; // Custom Rating component for displaying product ratings
import Pagination from "../Pagination"; // Custom Pagination component (imported but not used in current implementation)

/**
 * ShopProducts Component - Product Grid/List Display
 * Displays products in either grid or list layout based on the styles prop
 * Features hover effects, action buttons (wishlist, view, cart), and product ratings
 * Responsive design with different column layouts for various screen sizes
 *
 * @param {Object} props - Component props
 * @param {string} props.styles - Display style: "grid" for grid layout, "list" for list layout
 * @returns {JSX.Element} Product display grid/list with interactive product cards
 */
const ShopProducts = ({ styles }) => {
  return (
    // Main container with dynamic grid layout based on styles prop
    <div
      className={`w-full grid ${
        styles === "grid"
          ? "grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-2" // Grid view: 3 columns on desktop, 2 on tablet/mobile
          : "grid-cols-1 max-lg:grid-cols-2 max-md:grid-cols-2" // List view: 1 column on desktop, 2 on tablet/mobile
      } gap-3`}
    >
      {/* Map through mock products array to generate product cards */}
      {[1, 2, 3, 4, 5, 6].map((product, index) => (
        // Individual product card with hover effects
        <div
          key={index}
          className={`flex transition-all duration-1000 hover:shadow-md hover:-translate-y-3 ${
            styles === "grid"
              ? "flex-col justify-start items-start" // Grid: vertical layout
              : "justify-start items-center max-lg:flex-col max-md:justify-start max-md:items-start" // List: horizontal layout, responsive
          } w-full gap-4 bg-white p-1 rounded-md`}
        >
          {/* Product image container with action buttons overlay */}
          <div
            className={`${
              styles === "grid"
                ? "w-full relative group h-[210px] max-md:h-[270px] max-xs:h-[170px] overflow-hidden" // Grid view dimensions
                : "max-lg:w-full relative group h-[210px] max-md:h-[270px] overflow-hidden" // List view dimensions
            }`}
          >
            {/* Product image with dynamic source based on index */}
            <img
              className="h-[240px] rounded-md max-md:h-[270px] max-xs:h-[170px] w-full object-cover"
              src={`/images/products/${index + 1}.webp`}
              alt={`Product ${index + 1}`} // Accessible alt text
            />

            {/* Action buttons overlay - appears on hover */}
            <ul
              className="flex transition-all duration-700 
                          -bottom-10 justify-center items-center gap-2 absolute  w-full group-hover:bottom-3 "
            >
              {/* Add to wishlist button */}
              <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all">
                <FaRegHeart />
              </li>

              {/* Quick view button */}
              <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all">
                <FaEye />
              </li>

              {/* Add to cart button */}
              <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all">
                <LuShoppingCart />
              </li>
            </ul>
          </div>

          {/* Product information section */}
          <div className="flex justify-start items-start flex-col gap-1">
            {/* Product name - placeholder text */}
            <h2 className="font-semibold">Product Name</h2>

            {/* Price and rating container */}
            <div className="flex justify-start items-center gap-3">
              {/* Product price - placeholder price */}
              <span className="text-md font-bold ">$29.99</span>

              {/* Product rating display using custom Rating component */}
              <div className="flex">
                <Rating ratings={4.5} /> {/* 4.5 star rating example */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Export the ShopProducts component as default export for use in other parts of the application
export default ShopProducts;

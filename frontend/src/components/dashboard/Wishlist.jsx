import React, { useEffect } from "react";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import Rating from "../Rating"; // Rating component for star display
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_wishlist_products } from "../../store/reducers/cartReducer";

// User wishlist component showing saved products
const Wishlist = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const { errorMessage, successMessage } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(get_wishlist_products(userInfo.id));
  }, []);

  return (
    <div className="w-full grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-6">
      {/* Render wishlist products */}
      {[1, 2, 3, 4].map((product, index) => (
        <div
          key={index}
          className="border group transition-all duration-500 bg-white hover:shadow-md hover:-mt-3 border-gray-100"
        >
          {/* Product Image with Discount Badge */}
          <div className="relative overflow-hidden">
            {/* Discount Badge */}
            <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
              30%
            </div>

            {/* Product Image */}
            <img
              src="/images/products/1.webp"
              className="sm:w-full h-[240px] w-full"
            />

            {/* Action Buttons - show on hover */}
            <ul
              className="flex transition-all duration-700 
              -bottom-10 justify-center items-center gap-2 absolute  w-full group-hover:bottom-3 "
            >
              {/* Add to Wishlist */}
              <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all">
                <FaRegHeart />
              </li>

              {/* View Product Details */}
              <Link
                to="/product/details/new"
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all"
              >
                <FaEye />
              </Link>

              {/* Add to Cart */}
              <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all">
                <LuShoppingCart />
              </li>
            </ul>
          </div>

          {/* Product Details */}
          <div className="py-3 text-slate-600 px-2">
            <h2 className="font-semibold">Product Name</h2>
            {/* Price and rating section */}
            <div className="flex justify-start items-center gap-3">
              <span className="text-md font-bold ">$100</span>
              <div className="flex">
                <Rating ratings={5} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;

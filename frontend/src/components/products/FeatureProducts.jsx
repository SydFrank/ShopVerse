/**
 * FeatureProducts - Displays featured products with add to cart functionality
 * Shows product grid with hover effects and action buttons
 */

import React, { useEffect } from "react";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import Rating from "../Rating"; // Rating component for star display
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add_to_cart, messageClear } from "../../store/reducers/cartReducer";
import toast from "react-hot-toast"; // Toast notifications

const FeatureProducts = ({ products }) => {
  // Navigation hook for programmatic routing
  const navigate = useNavigate();

  // Redux dispatch function for triggering actions
  const dispatch = useDispatch();

  // Get current user info from auth state
  const { userInfo } = useSelector((state) => state.auth);

  // Get cart operation messages from cart state
  const { successMessage, errorMessage } = useSelector((state) => state.cart);

  // Handle add to cart - check if user is logged in
  const add_cart = (id) => {
    if (userInfo) {
      // User is authenticated - add product to cart
      dispatch(
        add_to_cart({ userId: userInfo.id, quantity: 1, productId: id })
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
  }, [successMessage, errorMessage, dispatch]);

  return (
    <div className="w-[85%] flex flex-wrap mx-auto">
      {/* Featured Products Title */}
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
          <h2>Featured Products</h2>
          <div className="w-[100px] h-[2px] bg-[#059473] mt-4 "></div>
        </div>
      </div>

      {/* Responsive Products Grid */}
      <div className="w-full grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="border group transition-all duration-500 hover:shadow-md hover:-mt-3"
          >
            {/* Product Image with Discount Badge */}
            <div className="relative overflow-hidden">
              {/* Discount Badge */}
              {product.discount ? (
                <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                  {product.discount}%
                </div>
              ) : (
                ""
              )}
              <img
                src={product.images[0]}
                alt={`Product ${index + 1}`}
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
                <li
                  onClick={() => add_cart(product._id)}
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all"
                >
                  <LuShoppingCart />
                </li>
              </ul>
            </div>

            {/* Product Name, Price & Rating */}
            <div className="py-3 text-slate-600 px-2">
              <h2 className="font-semibold">{product.name}</h2>
              <div className="flex justify-start items-center gap-3">
                <span className="text-md font-bold ">${product.price}</span>
                <div className="flex">
                  <Rating ratings={product.rating} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureProducts;

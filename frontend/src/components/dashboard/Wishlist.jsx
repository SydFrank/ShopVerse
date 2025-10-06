import React, { useEffect } from "react";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import Rating from "../Rating"; // Rating component for star display
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  get_wishlist_products,
  remove_wishlist,
  messageClear,
} from "../../store/reducers/cartReducer";
import toast from "react-hot-toast"; // Toast notifications

// User wishlist component showing saved products
const Wishlist = () => {
  // Redux dispatch function for triggering actions
  const dispatch = useDispatch();

  // Get current user info from auth state
  const { userInfo } = useSelector((state) => state.auth);

  // Get wishlist products from cart state
  const { wishlist, successMessage } = useSelector((state) => state.cart);

  // Fetch wishlist products on component mount
  useEffect(() => {
    dispatch(get_wishlist_products(userInfo.id));
  }, []);

  // Show toast messages and clear them
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear()); // Clear success message
    }
  }, [successMessage]);

  return (
    <div className="w-full grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-6">
      {/* Render wishlist products */}
      {wishlist.map((product, index) => (
        <div
          key={index}
          className="border group transition-all duration-500 bg-white hover:shadow-md hover:-mt-3 border-gray-100"
        >
          {/* Product Image with Discount Badge */}
          <div className="relative overflow-hidden">
            {/* Discount Badge */}

            {product.discount !== 0 && (
              <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                {product.discount}%
              </div>
            )}

            {/* Product Image */}
            <img src={product.image} className="sm:w-full h-[240px] w-full" />

            {/* Action Buttons - show on hover */}
            <ul
              className="flex transition-all duration-700 
              -bottom-10 justify-center items-center gap-2 absolute  w-full group-hover:bottom-3 "
            >
              {/* Add to Wishlist */}
              <li
                onClick={() => dispatch(remove_wishlist(product._id))}
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all"
              >
                <FaRegHeart />
              </li>

              {/* View Product Details */}
              <Link
                to={`/product/details/${product.slug}`}
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
            <h2 className="font-semibold">{product.name}</h2>
            {/* Price and rating section */}
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
  );
};

export default Wishlist;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  get_seller,
  seller_status_update,
  messageClear,
} from "../../store/Reducers/sellerReducer";
import toast from "react-hot-toast"; // For displaying toast messages

/**
 * SellerDetails Component
 *
 * Displays detailed information about a seller, including:
 * - Profile image
 * - Basic information (name, email, role, status, payment status)
 * - Address information (shop name, division, district, state)
 * - Status update form (with status selector and submit button)
 *
 * Layout uses responsive utility classes for optimal display on different screen sizes.
 * All data is currently static and should be replaced with dynamic data when integrating with backend services.
 */
const SellerDetails = () => {
  // Redux dispatch function to trigger actions
  // This is used to dispatch the get_seller action to fetch seller data.
  const dispatch = useDispatch();

  // Destructure authentication-related state from Redux
  const { seller, successMessage } = useSelector((state) => state.seller);
  const { sellerId } = useParams();

  // useEffect to fetch seller data when component mounts or dependencies change
  useEffect(() => {
    // Dispatch Redux action to fetch seller details based on sellerId
    dispatch(get_seller(sellerId));
  }, [sellerId]);

  // State: controls the status update form
  // This state holds the selected status for the seller.
  // It is used to update the seller's status when the form is submitted.
  const [status, setStatus] = useState("");

  // Handler for form submission
  // This function is called when the status update form is submitted.
  // It dispatches an action to update the seller's status.
  // The action should be defined in the sellerReducer to handle the status update logic.
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(seller_status_update({ status, sellerId }));
  };

  // useEffect to show success message as a toast notification
  // This effect runs whenever the successMessage changes.
  // It displays a toast notification and clears the message from Redux state.
  useEffect(() => {
    if (successMessage) {
      // Show success toast notification
      toast.success(successMessage);
      // Clear success/error messages from Redux state
      dispatch(messageClear());
    }
  }, [successMessage]);

  // useEffect to set the initial status from the seller data
  // This effect runs whenever the seller data changes.
  // It initializes the status state with the current seller's status.
  useEffect(() => {
    if (seller) {
      // If seller data is loaded, set the status to the current seller's status
      setStatus(seller.status);
    }
  }, [seller]);

  return (
    <div className="px-2 lg:px-7 pt-5 ">
      {/* Page Title */}
      <h1 className="text-[20px] font-bold mb-3">Seller Details</h1>
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        {/* Seller Info Section */}
        <div className="w-full flex flex-wrap text-[#d0d2d6]">
          {/* Profile Image */}
          <div className="w-3/12 flex justify-center items-center py-3">
            <div>
              {seller?.image ? (
                <img className="w-full h-[230px]" src={seller?.image} />
              ) : (
                <span>Image Not Upload</span>
              )}
            </div>
          </div>
          {/* Basic Info */}
          <div className="w-5/12">
            <div className="px-0 md:px-5 py-2">
              <div className="py-2 text-lg">
                <h2>Basic Info</h2>
              </div>
              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-[#9e97e9] rounded-md ">
                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>Name: </span>
                  <span>{seller?.name}</span>
                </div>
                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>Email: </span>
                  <span>{seller?.email}</span>
                </div>
                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>Role: </span>
                  <span>{seller?.role}</span>
                </div>
                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>Status: </span>
                  <span>{seller?.status}</span>
                </div>
                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>Payment Status: </span>
                  <span>{seller?.payment}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Address Info */}
          <div className="w-4/12">
            <div className="px-0 md:px-5 py-2">
              <div className="py-2 text-lg">
                <h2>Address</h2>
              </div>
              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-[#9e97e9] rounded-md ">
                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>Shop Name: </span>
                  <span>{seller?.shopInfo?.shopName}</span>
                </div>
                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>Division: </span>
                  <span>{seller?.shopInfo?.division}</span>
                </div>
                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>District: </span>
                  <span>{seller?.shopInfo?.district}</span>
                </div>
                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>State: </span>
                  <span>{seller?.shopInfo?.sub_district}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Status Update Form */}
        <div>
          <form onSubmit={submitHandler}>
            <div className="flex gap-4 py-3">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6] required"
              >
                <option value="">--Select Status--</option>
                <option value="active">Active</option>
                <option value="deactive">Deactive</option>
              </select>
              <button className="bg-red-500 w-[170px] hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerDetails;

import React from "react";

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
              <img
                className="w-full h-[230px]"
                src="/images/demo.jpg"
                alt="Seller"
              />
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
                  <span>Frank Xu</span>
                </div>
                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>Email: </span>
                  <span>frankzhsy@gmail.com</span>
                </div>
                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>Role: </span>
                  <span>seller</span>
                </div>
                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>Status: </span>
                  <span>Active</span>
                </div>
                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>Payment Status: </span>
                  <span>Active</span>
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
                  <span>Easy Shop</span>
                </div>
                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>Division: </span>
                  <span>Sydney</span>
                </div>
                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>District: </span>
                  <span>Waterloo</span>
                </div>
                <div className="flex gap-2 font-bold text-[#000000]">
                  <span>State: </span>
                  <span>New South Wales</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Status Update Form */}
        <div>
          <form>
            <div className="flex gap-4 py-3">
              <select className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]">
                <option value="">--Select Status--</option>
                <option value="Active">Active</option>
                <option value="Deactive">Deactive</option>
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

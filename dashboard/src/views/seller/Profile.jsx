import React from "react";
import { FaEdit, FaImages } from "react-icons/fa";
import { FadeLoader } from "react-spinners";

/**
 * Profile component renders the user's profile information and allows editing of personal details,
 * shop information, and password. It supports image upload with loading states, conditional rendering
 * of user/shop info or editable forms, and provides a responsive layout.
 *
 * Features:
 * - Displays user profile image with loading spinner feedback.
 * - Allows editing of user information and shop details.
 * - Provides form for changing password with validation-ready inputs.
 * - Responsive design using Tailwind CSS utility classes.
 * - Utilizes react-icons for visual cues and react-spinners for loading states.
 *
 * Usage:
 * <Profile />
 */

const Profile = () => {
  const image = true;
  const loader = true;
  const status = "active";
  const userInfo = true;

  return (
    <div className="px-2 lg:px-7 py-5 ">
      <div className="w-full flex flex-wrap">
        {/* Profile and Shop Information Section */}
        <div className="w-full md:w-6/12">
          <div className="w-full p-4 bg-[#6a5fdf] rounded-md text-[#d0d2d6]">
            {/* Profile Image Upload */}
            <div className="flex justify-center items-center py-3">
              {image ? (
                <label
                  htmlFor="img"
                  className="h-[150px] w-[200px] relative p-3 cursor-pointer overflow-hidden "
                >
                  <img src="/images/demo.jpg" />
                  {!loader && (
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-17 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              ) : (
                <label
                  className="flex justify-center items-center flex-col h-[150px] w-[200px] cursor-pointer border border-dashed hover:border-red-500 border-[#d0d2d6] relative"
                  htmlFor="img"
                >
                  <span>
                    <FaImages />
                  </span>
                  <span>Select Image</span>
                  {loader && (
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-17 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              )}
              <input type="file" id="img" className="hidden" />
            </div>

            {/* User Information */}
            <div className="px-0 md:px-5 py-2">
              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
                <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                  <FaEdit />
                </span>

                <div className="flex gap-2">
                  <span>Name: </span>
                  <span>Frank Xu</span>
                </div>

                <div className="flex gap-2">
                  <span>Email: </span>
                  <span>frankzhsy@gmail.com</span>
                </div>

                <div className="flex gap-2">
                  <span>Role: </span>
                  <span>Seller</span>
                </div>

                <div className="flex gap-2">
                  <span>Status: </span>
                  <span>Active</span>
                </div>

                <div className="flex gap-2">
                  <span>Payment Account: </span>
                  <p>
                    {status === "active" ? (
                      <span className="bg-green-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded">
                        Pending
                      </span>
                    ) : (
                      <span className="bg-blue-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded">
                        Click Active
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Shop Info or Edit Form */}
            <div className="px-0 md:px-5 py-2">
              {!userInfo ? (
                <form>
                  {/* Editable Shop Information */}
                  <div className="flex flex-col w-full gap-2 mb-2">
                    <label htmlFor="shop">Shop Name</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                      type="text"
                      name="shopname"
                      id="shop"
                      placeholder="Shop Name"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-2 mb-2">
                    <label htmlFor="division">Division Name</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                      type="text"
                      name="division"
                      id="division"
                      placeholder="Division Name"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-2 mb-2">
                    <label htmlFor="district">District Name</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                      type="text"
                      name="district"
                      id="district"
                      placeholder="District Name"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-2 mb-2">
                    <label htmlFor="subdistrict">Sub District</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                      type="text"
                      name="subdistrict"
                      id="subdistrict"
                      placeholder="Sub District"
                    />
                  </div>
                  <button className="bg-red-500 hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 my-2">
                    Save Changes
                  </button>
                </form>
              ) : (
                <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
                  <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                    <FaEdit />
                  </span>

                  <div className="flex gap-2">
                    <span>Shop Name: </span>
                    <span>Easy Shop</span>
                  </div>

                  <div className="flex gap-2">
                    <span>Division </span>
                    <span>Sydney</span>
                  </div>

                  <div className="flex gap-2">
                    <span>District: </span>
                    <span>Waterloo</span>
                  </div>

                  <div className="flex gap-2">
                    <span>Sub District: </span>
                    <span>Waterloo</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Password Change Section */}
        <div className="w-full md:w-6/12">
          <div className="w-full pl-0 md:pl-7 mt-6 md:mt-0 ">
            <div className="bg-[#6a5fdf] rounded-md text-[#d0d2d6] p-4">
              <h1 className="text-[#d0d2d6] text-lg mb-3 font-semibold">
                Change Password
              </h1>
              <form>
                <div className="flex flex-col w-full gap-2 mb-2">
                  <label htmlFor="email">Email</label>
                  <input
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                  />
                </div>
                <div className="flex flex-col w-full gap-2 mb-2">
                  <label htmlFor="old_password">Old Password</label>
                  <input
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                    type="password"
                    name="old_password"
                    id="old_password"
                    placeholder="Old Password"
                  />
                </div>
                <div className="flex flex-col w-full gap-2 mb-2">
                  <label htmlFor="new_password">New Password</label>
                  <input
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                    type="password"
                    name="new_password"
                    id="new_password"
                    placeholder="New Password"
                  />
                </div>

                <button className="bg-red-500 hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 my-2">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

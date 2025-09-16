import React, { useEffect } from "react";
import { FaEdit, FaImages } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import {
  profile_image_upload,
  messageClear,
  profile_info_add,
} from "../../store/Reducers/authReducer"; // Redux actions for profile
import toast from "react-hot-toast"; // For displaying toast messages
import { overrideStyle } from "../../utils/utils"; // Custom spinner style
import { PropagateLoader } from "react-spinners"; // Spinner for loading state

/**
 * Profile Component
 *
 * Renders the user's profile information and allows editing of personal details,
 * shop information, and password. Supports image upload with loading states,
 * conditional rendering of user/shop info or editable forms, and provides a responsive layout.
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
  // State to manage form inputs for shop information
  const [state, setState] = React.useState({
    shopName: "", // Shop name input
    division: "", // Division input
    district: "", // District input
    sub_district: "", // Sub-district input
  });

  // Redux dispatch function to trigger actions (e.g., profile image upload, info add)
  const dispatch = useDispatch();

  // Get user info and status from Redux state
  const { userInfo, loader, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  );

  // Hardcoded status for demonstration (could be dynamic)
  const status = "active";

  /**
   * Handles profile image upload.
   * - Creates FormData with the selected image file.
   * - Dispatches profile_image_upload action.
   */
  const add_image = (e) => {
    if (e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      dispatch(profile_image_upload(formData));
    }
  };

  /**
   * Handles input changes for shop information form.
   * - Updates the state with the input field's name and value.
   */
  const inputHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * useEffect to handle response messages for profile actions.
   * - Shows a success toast if an action is successful.
   * - Shows an error toast if there is an error.
   * - Clears messages from Redux after displaying.
   */
  useEffect(() => {
    if (successMessage && successMessage !== "Login success") {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  /**
   * Handles shop information form submission.
   * - Prevents default form submission.
   * - Dispatches profile_info_add action with the current state.
   */
  const addInfo = (e) => {
    e.preventDefault();
    dispatch(profile_info_add(state));
  };

  return (
    <div className="px-2 lg:px-7 py-5 ">
      <div className="w-full flex flex-wrap">
        {/* Profile and Shop Information Section */}
        <div className="w-full md:w-6/12">
          <div className="w-full p-4 bg-[#6a5fdf] rounded-md text-[#d0d2d6]">
            {/* Profile Image Upload */}
            <div className="flex justify-center items-center py-3">
              {userInfo?.image ? (
                // If user has a profile image, show it with edit overlay
                <label
                  htmlFor="img"
                  className="h-[150px] w-[200px] relative p-3 cursor-pointer overflow-hidden "
                >
                  <img src={userInfo.image} />
                  {!loader && (
                    // Show spinner overlay if not loading
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-17 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              ) : (
                // If no image, show upload prompt
                <label
                  className="flex justify-center items-center flex-col h-[150px] w-[200px] cursor-pointer border border-dashed hover:border-red-500 border-[#d0d2d6] relative"
                  htmlFor="img"
                >
                  <span>
                    <FaImages />
                  </span>
                  <span>Select Image</span>
                  {loader && (
                    // Show spinner overlay while loading
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-17 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              )}
              <input
                onChange={add_image}
                type="file"
                id="img"
                className="hidden"
              />
            </div>

            {/* User Information Display */}
            <div className="px-0 md:px-5 py-2">
              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
                {/* Edit button for user info */}
                <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                  <FaEdit />
                </span>

                {/* Display user details */}
                <div className="flex gap-2">
                  <span>Name: </span>
                  <span>{userInfo.name}</span>
                </div>
                <div className="flex gap-2">
                  <span>Email: </span>
                  <span>{userInfo.email}</span>
                </div>
                <div className="flex gap-2">
                  <span>Role: </span>
                  <span>{userInfo.role}</span>
                </div>
                <div className="flex gap-2">
                  <span>Status: </span>
                  <span>{userInfo.status}</span>
                </div>
                <div className="flex gap-2">
                  <span>Payment Account: </span>
                  <p>
                    {status === "active" ? (
                      <span className="bg-red-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded">
                        {userInfo.payment}
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
              {!userInfo?.shopInfo ? (
                // If no shop info, show editable form
                <form onSubmit={addInfo}>
                  {/* Editable Shop Information */}
                  <div className="flex flex-col w-full gap-2 mb-2">
                    <label htmlFor="Shop">Shop Name</label>
                    <input
                      value={state.shopName}
                      onChange={inputHandler}
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                      type="text"
                      name="shopName"
                      id="Shop"
                      placeholder="Shop Name"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-2 mb-2">
                    <label htmlFor="division">Division Name</label>
                    <input
                      value={state.division}
                      onChange={inputHandler}
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
                      value={state.district}
                      onChange={inputHandler}
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
                      value={state.sub_district}
                      onChange={inputHandler}
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
                      type="text"
                      name="sub_district"
                      id="subdistrict"
                      placeholder="Sub District"
                    />
                  </div>
                  <button
                    disabled={loader}
                    className="bg-red-500 w-[200px] hover:shadow-red-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 flex items-center justify-center gap-2"
                  >
                    {loader ? (
                      // Show loading spinner during API request
                      <PropagateLoader
                        color="white"
                        cssOverride={overrideStyle}
                      />
                    ) : (
                      // Display lock icon and text if not loading
                      <>Save Changes</>
                    )}
                  </button>
                </form>
              ) : (
                // If shop info exists, display it
                <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
                  <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                    <FaEdit />
                  </span>
                  <div className="flex gap-2">
                    <span>Shop Name: </span>
                    <span>{userInfo.shopInfo?.shopName}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Division: </span>
                    <span>{userInfo.shopInfo?.division}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>District: </span>
                    <span>{userInfo.shopInfo?.district}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Sub District: </span>
                    <span>{userInfo.shopInfo?.sub_district}</span>
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

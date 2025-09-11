/**
 * Register Component - User Registration Page
 *
 * This component renders the user registration page for the ShopVerse e-commerce
 * application. It provides a comprehensive registration form with traditional email/password
 * signup as well as social media authentication options. The page features a modern
 * two-column layout with form fields on the left and an attractive image on the right.
 *
 * Key Features:
 * - User registration form with name, email, and password fields
 * - Form validation with required field enforcement
 * - Social media registration options (Facebook and Google)
 * - Responsive design that adapts to mobile and desktop screens
 * - Visual feedback with hover states and focus indicators
 * - Navigation link to existing login page for existing users
 * - Modern card-based layout with shadow and rounded corners
 * - Accessible form design with proper labels and ARIA attributes
 *
 * @component
 * @returns {JSX.Element} Complete user registration page with form and social options
 */

import React, { useEffect, useState } from "react";
import Header from "../components/Header"; // Website header with navigation and branding
import Footer from "../components/Footer"; // Website footer with links and company info
import { FaFacebookF } from "react-icons/fa"; // Facebook icon for social login
import { IoLogoGoogle } from "react-icons/io5"; // Google icon for social login
import { Link, useNavigate } from "react-router-dom"; // Navigation link component for login redirect
import { useDispatch, useSelector } from "react-redux";
import { customer_register, messageClear } from "../store/reducers/authReducer";
import toast from "react-hot-toast"; // Toast notifications
import { FadeLoader } from "react-spinners";

/**
 * Register Functional Component
 * Manages user registration form state and submission handling
 */
const Register = () => {
  // Extract authentication state from Redux store
  // loader: boolean indicating if registration request is in progress
  // errorMessage: string containing error message if registration fails
  // successMessage: string containing success message if registration succeeds
  const { loader, errorMessage, successMessage, userInfo } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();

  // Registration form state object containing user input fields
  // Manages controlled inputs for name, email, and password
  const [state, setState] = useState({
    name: "", // User's full name for account creation
    email: "", // User's email address (used for login and communication)
    password: "", // User's chosen password for account security
  });

  // Redux dispatch function for triggering actions
  const dispatch = useDispatch();

  /**
   * Input Change Handler
   * Handles controlled input updates for all form fields using dynamic property assignment.
   * Uses the input's name attribute to update the corresponding state property.
   *
   * @param {Event} e - Input change event containing name and value
   */
  const inputHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  /**
   * Registration Form Submission Handler
   * Processes the registration form submission and handles user account creation.
   * Dispatches customer_register action with form data to Redux store.
   *
   * @param {Event} e - Form submission event
   */
  const register = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    dispatch(customer_register(state));
  };

  /**
   * Effect Hook for Message Handling
   * Monitors authentication state changes and displays toast notifications
   * for success/error messages. Automatically clears messages after display
   * to prevent persistent notifications on subsequent renders.
   */
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage); // Show success toast notification
      dispatch(messageClear()); // Clear message from Redux state
    }
    if (errorMessage) {
      toast.error(errorMessage); // Show error toast notification
      dispatch(messageClear()); // Clear message from Redux state
    }
    if (userInfo) {
      navigate("/"); // Redirect to homepage on successful registration
    }
  }, [successMessage, errorMessage]); // Dependencies: re-run when messages or dispatch change

  return (
    <div>
      {/* Loading Overlay - Full screen spinner during registration process */}
      {loader && (
        <div className="w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]">
          {/* FadeLoader component provides visual feedback during API calls */}
          <FadeLoader />
        </div>
      )}

      {/* Website header component with navigation and user authentication */}
      <Header />

      {/* Main registration section with centered card layout */}
      <div className="bg-slate-200 mt-4 ">
        <div className="w-full flex justify-center items-center p-4">
          {/* Registration card container with responsive grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
            {/* Left column: Registration form */}
            <div className="px-8 py-10">
              {/* Registration form header */}
              <h2 className="text-center text-2xl text-slate-700 font-bold mb-6">
                Register
              </h2>

              {/* Main registration form with controlled inputs */}
              <form className="text-slate-600" onSubmit={register}>
                {/* Name input field with validation */}
                <div className="flex flex-col gap-1 mb-4">
                  <label htmlFor="name">Name</label>
                  <input
                    onChange={inputHandler}
                    value={state.name}
                    className="w-full px-3 py-2 border border-slate-300 outline-none focus:border-green-500 rounded-md"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    required
                  />
                </div>

                {/* Email input field with validation */}
                <div className="flex flex-col gap-1 mb-4">
                  <label htmlFor="email">Email</label>
                  <input
                    onChange={inputHandler}
                    value={state.email}
                    className="w-full px-3 py-2 border border-slate-300 outline-none focus:border-green-500 rounded-md"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                </div>

                {/* Password input field with validation */}
                <div className="flex flex-col gap-1 mb-6">
                  <label htmlFor="password">Password</label>
                  <input
                    onChange={inputHandler}
                    value={state.password}
                    className="w-full px-3 py-2 border border-slate-300 outline-none focus:border-green-500 rounded-md"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                </div>

                {/* Primary registration submit button */}
                {/* Triggers form validation and submission when clicked */}
                {/* Disabled state managed by loader to prevent duplicate submissions */}
                <button
                  className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-md shadow disabled:bg-gray-400"
                  disabled={loader} // Prevent multiple submissions during API call
                >
                  {loader ? "Registering..." : "Register"}
                </button>
              </form>

              {/* Divider section between traditional and social registration */}
              <div className="flex items-center my-6">
                <div className="flex-1 h-[1px] bg-slate-300"></div>
                <span className="px-3 text-slate-500 text-sm">Or</span>
                <div className="flex-1 h-[1px] bg-slate-300"></div>
              </div>

              {/* Social media registration buttons */}
              {/* Facebook registration button with branded styling */}
              <button className="w-full py-2 mb-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md flex justify-center items-center gap-2">
                <FaFacebookF /> Register with Facebook
              </button>

              {/* Google registration button with branded styling */}
              <button className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md flex justify-center items-center gap-2">
                <IoLogoGoogle /> Register with Google
              </button>

              {/* Login redirect section for existing users */}
              <p className="text-center text-slate-600 mt-4">
                You already have an account ?{" "}
                <Link className="text-blue-500 underline" to="/login">
                  Login
                </Link>
              </p>
            </div>

            {/* Right column: Decorative image (hidden on mobile devices) */}
            <div className="py-4 pr-4 hidden md:block">
              <img
                src="/images/login.jpg"
                alt="Register"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Website footer component with links and company information */}
      <Footer />
    </div>
  );
};

export default Register;

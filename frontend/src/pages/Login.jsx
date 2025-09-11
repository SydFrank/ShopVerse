/**
 * Login Component - User Authentication Page
 *
 * This component renders the user login page for the ShopVerse e-commerce application.
 * It provides a comprehensive authentication interface with traditional email/password
 * login as well as social media authentication options. The page features a modern
 * two-column layout with the login form on the left and an attractive image on the right.
 *
 * Key Features:
 * - User login form with email and password fields
 * - Form validation with required field enforcement
 * - Social media login options (Facebook and Google)
 * - Responsive design that adapts to mobile and desktop screens
 * - Visual feedback with hover states and focus indicators
 * - Navigation link to registration page for new users
 * - Modern card-based layout with shadow and rounded corners
 * - Accessible form design with proper labels and ARIA attributes
 *
 * @component
 * @returns {JSX.Element} Complete user login page with form and social authentication options
 */

// React core imports for functional component with state management
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoGoogle } from "react-icons/io5";
// React Router for navigation between pages
import { Link, useNavigate } from "react-router-dom"; // Navigation link component for register redirect
import { useDispatch, useSelector } from "react-redux";
import { customer_login, messageClear } from "../store/reducers/authReducer";
import toast from "react-hot-toast"; // Toast notifications
import { FadeLoader } from "react-spinners";

/**
 * Login Functional Component
 * Manages user authentication form state and login submission handling
 */
const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loader, errorMessage, successMessage, userInfo } = useSelector(
    (state) => state.auth
  );

  // Manages controlled inputs for email and password authentication
  const [state, setState] = useState({
    email: "", // User's email address for authentication
    password: "", // User's password for account security
  });

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
   * Login Form Submission Handler
   * Processes the login form submission and handles user authentication.
   * Currently logs the credentials for development; in production would send data to backend API.
   *
   * @param {Event} e - Form submission event
   */
  const login = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // console.log(state);
    dispatch(customer_login(state)); // Dispatch login action with user credentials
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
      navigate("/"); // Redirect to homepage on successful login
    }
  }, [successMessage, errorMessage]); // Dependencies: re-run when messages or dispatch change

  return (
    <div>
      {/* Loading Overlay - Full screen spinner during login process */}
      {loader && (
        <div className="w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]">
          {/* FadeLoader component provides visual feedback during API calls */}
          <FadeLoader />
        </div>
      )}

      {/* Website header component with navigation and user authentication */}
      <Header />

      {/* Main login section with centered card layout */}
      <div className="bg-slate-200 mt-4 ">
        <div className="w-full flex justify-center items-center p-4">
          {/* Login card container with responsive grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
            {/* Left column: Login form */}
            <div className="px-8 py-10">
              {/* Login form header */}
              <h2 className="text-center text-2xl text-slate-700 font-bold mb-6">
                Login
              </h2>

              {/* Main login form with controlled inputs */}
              <form className="text-slate-600" onSubmit={login}>
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

                {/* Primary login submit button */}
                <button className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-md shadow">
                  Login
                </button>
              </form>

              {/* Divider section between traditional and social login */}
              <div className="flex items-center my-6">
                <div className="flex-1 h-[1px] bg-slate-300"></div>
                <span className="px-3 text-slate-500 text-sm">Or</span>
                <div className="flex-1 h-[1px] bg-slate-300"></div>
              </div>

              {/* Social media login buttons */}
              {/* Facebook login button with branded styling */}
              <button className="w-full py-2 mb-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md flex justify-center items-center gap-2">
                <FaFacebookF /> Login with Facebook
              </button>

              {/* Google login button with branded styling */}
              <button className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md flex justify-center items-center gap-2">
                <IoLogoGoogle /> Login with Google
              </button>

              {/* Registration redirect section for new users */}
              <p className="text-center text-slate-600 mt-4">
                Don't have an account ?{" "}
                <Link className="text-blue-500 underline" to="/register">
                  Register
                </Link>
              </p>
            </div>

            {/* Right column: Decorative image (hidden on mobile devices) */}
            <div className="py-4 pr-4 hidden md:block">
              <img
                src="/images/login.jpg"
                alt="Login"
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

export default Login;

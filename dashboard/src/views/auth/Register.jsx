// Import necessary dependencies
import { Link } from "react-router-dom"; // Navigation link
import { FaGoogle, FaFacebook } from "react-icons/fa"; // Social icons
import { useEffect, useState } from "react"; // React hooks
import { useSelector, useDispatch } from "react-redux"; // Redux hooks
import { PropagateLoader } from "react-spinners"; // Loading spinner component
import { overrideStyle } from "../../utils/utils"; // Custom CSS style for spinner
import {
  seller_register,
  messageClear,
} from "../../store/Reducers/authReducer"; // Redux actions
import toast from "react-hot-toast"; // Toast notifications

/**
 * Register Component
 * ------------------
 * This component renders a registration form for new sellers.
 * It includes:
 * - Name, email, password input fields
 * - A checkbox to agree to privacy policy and terms
 * - A sign-up button with loading indicator
 * - Google and Facebook buttons for social sign-in (UI only)
 * - A link to the login page
 */

const Register = () => {
  // Initialize dispatch for Redux actions
  const dispatch = useDispatch();

  // Extract auth-related state from Redux store
  const { loader, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  );

  // Local form state to track input values
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  /**
   * Updates form state when input changes
   * Uses computed property names to update specific fields
   */
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Form submission handler
   * Prevents default form behavior and dispatches the register action
   */
  const submit = (e) => {
    e.preventDefault();
    dispatch(seller_register(state)); // Send user input to the backend
  };

  /**
   * Effect hook to handle success and error messages
   * Shows toast notifications and clears messages afterward
   */
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage); // Show success toast
      dispatch(messageClear()); // Clear message in Redux
    }
    if (errorMessage) {
      toast.error(errorMessage); // Show error toast
      dispatch(messageClear()); // Clear message in Redux
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center">
      {/* Centered form container */}
      <div className="w-[350px] text-[#ffffff] p-2">
        <div className="bg-[#6f68d1] p-4 rounded-md">
          {/* Logo at the top */}
          <div className="h-[70px] flex justify-center items-center">
            <div className="w-[180px] h-[50px]">
              <img
                className="w-full h-full"
                src="/images/logo.png"
                alt="image"
              />
            </div>
          </div>

          {/* Form title */}
          <p className="text-sm mb-3 font-medium">Create an account</p>

          {/* Registration form */}
          <form onSubmit={submit}>
            {/* Name field */}
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="name">Name</label>
              <input
                onChange={inputHandle}
                value={state.name}
                className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md"
                type="text"
                name="name"
                placeholder="Name"
                id="name"
                required
              />
            </div>

            {/* Email field */}
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="email">Email</label>
              <input
                onChange={inputHandle}
                value={state.email}
                className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md"
                type="email"
                name="email"
                placeholder="Email"
                id="email"
                required
              />
            </div>

            {/* Password field */}
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="password">Password</label>
              <input
                onChange={inputHandle}
                value={state.password}
                className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md"
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                required
              />
            </div>

            {/* Terms and privacy policy checkbox */}
            <div className="flex items-center w-full gap-3 mb-3">
              <input
                className="w-4 h-4 text-blue-600 overflow-hidden bg-gray-200 rounded border-gray-300 focus:ring-blue-500"
                type="checkbox"
                name="checkbox"
                id="checkbox"
              />
              <label htmlFor="checkbox">
                I agree to privacy policy & terms
              </label>
            </div>

            {/* Submit button (disabled if loading) */}
            <button
              disabled={loader}
              className="bg-slate-800 w-full hover:shadow-blue-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 flex items-center justify-center gap-2"
            >
              {loader ? (
                // Spinner shown while submitting
                <PropagateLoader color="white" cssOverride={overrideStyle} />
              ) : (
                // Button text when not loading
                <>Sign Up</>
              )}
            </button>

            {/* Link to login page */}
            <div className="flex items-center mb-3 gap-3 justify-center">
              <p>
                Already have an account?{" "}
                <Link className="font-bold underline text-black" to="/login">
                  Sign In
                </Link>
              </p>
            </div>

            {/* Divider line with "Or" */}
            <div className="w-full flex justify-center items-center mb-3">
              <div className="w-[45%] bg-slate-700 h-[1px]"></div>
              <div className="w-[10%] flex justify-center items-center">
                <span className="pb-1">Or</span>
              </div>
              <div className="w-[45%] bg-slate-700 h-[1px]"></div>
            </div>

            {/* Social login buttons (Google & Facebook) */}
            <div className="flex justify-center items-center gap-3">
              {/* Google button */}
              <div className="w-[135px] h-[35px] flex rounded-md bg-orange-700 shadow-lg hover:shadow-orange-700/50 justify-center cursor-pointer items-center overflow-hidden">
                <span>
                  <FaGoogle />
                </span>
              </div>

              {/* Facebook button */}
              <div className="w-[135px] h-[35px] flex rounded-md bg-blue-700 shadow-lg hover:shadow-blue-700/50 justify-center cursor-pointer items-center overflow-hidden">
                <span>
                  <FaFacebook />
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

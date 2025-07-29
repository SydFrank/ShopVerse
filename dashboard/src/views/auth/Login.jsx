import { Link } from "react-router-dom"; // Used for navigating to the register page
import { FaGoogle, FaFacebook } from "react-icons/fa"; // Social login icons
import { useState, useEffect } from "react"; // React hooks
import { IoMdLock } from "react-icons/io"; // Lock icon for the login button
import { PropagateLoader } from "react-spinners"; // Spinner component for indicating loading state
import toast from "react-hot-toast"; // For displaying toast messages
import { overrideStyle } from "../../utils/utils"; // Custom spinner style override
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for state access and dispatch
import { seller_login, messageClear } from "../../store/Reducers/authReducer"; // Redux actions for login and clearing messages

/**
 * Login Component
 * ----------------
 * This component renders the login form for sellers on ShopVerse.
 *
 * Features:
 * - Controlled inputs for email and password
 * - Form submission using Redux async thunk (`seller_login`)
 * - Loading indicator using `react-spinners`
 * - Success and error messages with toast notifications
 * - Navigation to the registration page
 * - UI styled using Tailwind CSS
 */

const Login = () => {
  const dispatch = useDispatch(); // For dispatching actions to the Redux store

  // Destructure authentication-related state from Redux
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );

  /**
   * Local state for form inputs (email and password)
   */
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  /**
   * Input change handler
   * Dynamically updates form state based on input name and value
   */
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Form submission handler
   * Prevents default page reload and dispatches login request
   */
  const submit = (e) => {
    e.preventDefault();
    dispatch(seller_login(state)); // Initiate login with current email/password
  };

  /**
   * useEffect to handle login response messages
   * - Displays toast for success or error
   * - Clears messages from Redux after display
   */
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center">
      {/* Login Form Container */}
      <div className="w-[350px] text-[#ffffff] p-2">
        <div className="bg-[#6f68d1] p-4 rounded-md">
          {/* Logo Section */}
          <div className="h-[70px] flex justify-center items-center">
            <div className="w-[180px] h-[50px]">
              <img
                className="w-full h-full"
                src="/images/logo.png"
                alt="ShopVerse Logo"
              />
            </div>
          </div>

          {/* Title */}
          <p className="text-sm mb-3 font-medium">Sign in to your account</p>

          {/* Login Form */}
          <form onSubmit={submit}>
            {/* Email Field */}
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

            {/* Password Field */}
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

            {/* Submit Button */}
            <button
              disabled={loader}
              className="bg-slate-800 w-full hover:shadow-blue-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 flex items-center justify-center gap-2"
            >
              {loader ? (
                // Show loading spinner during API request
                <PropagateLoader color="white" cssOverride={overrideStyle} />
              ) : (
                // Display lock icon and text if not loading
                <>
                  <IoMdLock size={20} /> Log in
                </>
              )}
            </button>

            {/* Registration Redirect */}
            <div className="flex items-center mb-3 gap-3 justify-center">
              <p>
                New to ShopVerse?{" "}
                <Link className="font-bold underline text-black" to="/register">
                  Create account
                </Link>
              </p>
            </div>

            {/* Divider Line */}
            <div className="w-full flex justify-center items-center mb-3">
              <div className="w-[45%] bg-slate-700 h-[1px]"></div>
              <div className="w-[10%] flex justify-center items-center">
                <span className="pb-1">Or</span>
              </div>
              <div className="w-[45%] bg-slate-700 h-[1px]"></div>
            </div>

            {/* Social Login Buttons (UI Only) */}
            <div className="flex justify-center items-center gap-3">
              {/* Google Login Button */}
              <div className="w-[135px] h-[35px] flex rounded-md bg-orange-700 shadow-lg hover:shadow-orange-700/50 justify-center cursor-pointer items-center overflow-hidden">
                <span>
                  <FaGoogle />
                </span>
              </div>

              {/* Facebook Login Button */}
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

export default Login;

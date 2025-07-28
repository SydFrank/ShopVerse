/**
 * AdminLogin Component
 * ----------------------
 * Renders a login form for administrators.
 *
 * Features:
 * - Controlled inputs for email and password using React's useState
 * - Submits login credentials via Redux async thunk (admin_login)
 * - Displays loading spinner using react-spinners when login is in progress
 * - Responsive, styled UI using Tailwind CSS
 * - Toast notifications for success/error feedback using react-hot-toast
 * - Redirects to homepage after successful login
 */

import { useEffect, useState } from "react";
import { IoMdLock } from "react-icons/io"; // Lock icon for login button
import { useDispatch, useSelector } from "react-redux"; // Redux hooks
import { admin_login, messageClear } from "../../store/Reducers/authReducer"; // Async thunk actions
import { PropagateLoader } from "react-spinners"; // Spinner component for loading state
import toast from "react-hot-toast"; // Toast notification library
import { useNavigate } from "react-router-dom"; // Navigation hook for redirection

const AdminLogin = () => {
  const navigate = useNavigate(); // Used to programmatically redirect user

  const dispatch = useDispatch(); // Dispatch actions to Redux store

  // Destructure relevant authentication state from Redux
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );

  /**
   * Local form state for email and password fields.
   * Managed using useState hook.
   */
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  /**
   * Handles changes in form input fields.
   * Dynamically updates corresponding field in state object.
   */
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Handles form submission.
   * Prevents default form behavior and dispatches login action.
   */
  const submit = (e) => {
    e.preventDefault();
    dispatch(admin_login(state)); // Send credentials to backend
  };

  /**
   * Custom style override for the loading spinner (PropagateLoader).
   * Used to center the spinner and style it inline.
   */
  const overrideStyle = {
    display: "flex",
    margin: "0 auto",
    height: "24px",
    justifyContent: "center",
    alignItems: "center",
  };

  /**
   * Handles side effects:
   * - Displays toast notifications on error or success
   * - Clears messages from Redux
   * - Redirects to home page on successful login
   */
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigate("/"); // Redirect to home page after login
    }
  }, [errorMessage, successMessage]);

  return (
    <div className="min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center">
      {/* Form container */}
      <div className="w-[350px] text-[#ffffff] p-2">
        <div className="bg-[#6f68d1] p-4 rounded-md">
          {/* Logo area */}
          <div className="h-[70px] flex justify-center items-center">
            <div className="w-[180px] h-[50px]">
              <img
                className="w-full h-full"
                src="/images/logo.png"
                alt="image"
              />
            </div>
          </div>

          {/* Login form */}
          <form onSubmit={submit}>
            {/* Email input */}
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

            {/* Password input */}
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

            {/* Submit button with loading spinner */}
            <button
              disabled={loader}
              className="bg-slate-800 w-full hover:shadow-blue-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 flex items-center justify-center gap-2"
            >
              {loader ? (
                // Show loading spinner if request is in progress
                <PropagateLoader color="white" cssOverride={overrideStyle} />
              ) : (
                // Button text and icon if not loading
                <>
                  <IoMdLock size={20} /> Log in
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

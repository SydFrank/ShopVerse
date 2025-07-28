/**
 * AdminLogin Component
 * ----------------------
 * Renders a login form for administrators.
 *
 * Features:
 * Controlled inputs for email and password using React's useState
 * Submits login credentials via Redux async thunk (admin_login)
 * Displays loading spinner using react-spinners when login is in progress
 * Clean and responsive UI using Tailwind CSS
 * Toast notifications for success/error feedback using react-hot-toast
 * Redirects to home on successful login
 */

import { useEffect, useState } from "react";
import { IoMdLock } from "react-icons/io"; // Lock icon for the login button
import { useDispatch, useSelector } from "react-redux"; // Redux hook to dispatch actions
import { admin_login, messageClear } from "../../store/Reducers/authReducer"; // Login async thunk action
import { PropagateLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate(); // For redirection post-login

  // Dispatches login action on form submission via Redux.
  const dispatch = useDispatch();

  // Access auth state from Redux store
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );

  /**
   * Form state managed using useState hook
   * Contains: email, password
   */
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  /**
   * Handle input field changes
   * Updates the corresponding key in the state
   */
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Submit handler for the form
   * Prevents default form submission and logs user input
   * Dispatches the admin_login action with the current form data.
   */
  const submit = (e) => {
    e.preventDefault();
    dispatch(admin_login(state));
    // console.log(state); // Replace with API call in production
  };

  // Styles for loading spinner
  const overrideStyle = {
    display: "flex",
    margin: "0 auto",
    height: "24px",
    justifyContent: "center",
    alignItems: "center",
  };

  /**
   * Side Effects:
   * Display toast notifications on error/success
   * Clears messages from Redux state
   * Navigates to home on successful login
   */

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigate("/"); // Redirect to home/dashboard after successful login
    }
  }, [errorMessage, successMessage]);

  return (
    <div className="min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center">
      <div className="w-[350px] text-[#ffffff] p-2">
        <div className="bg-[#6f68d1] p-4 rounded-md">
          <div className="h-[70px] flex justify-center items-center">
            <div className="w-[180px] h-[50px]">
              <img
                className="w-full h-full"
                src="/images/logo.png"
                alt="image"
              />
            </div>
          </div>
          <form onSubmit={submit}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="email">Email</label>
              <input
                onChange={inputHandle}
                value={state.email}
                className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md "
                type="email"
                name="email"
                placeholder="Email"
                id="email"
                required
              />
            </div>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="password">Password</label>
              <input
                onChange={inputHandle}
                value={state.password}
                className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md "
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                required
              />
            </div>
            <button
              disabled={loader ? true : false}
              className="bg-slate-800 w-full hover:shadow-blue-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 flex items-center justify-center gap-2"
            >
              {loader ? (
                <PropagateLoader color="white" cssOverride={overrideStyle} />
              ) : (
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

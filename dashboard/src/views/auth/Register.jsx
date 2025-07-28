import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils"; // Importing styles for the loading spinner
import { IoMdLock } from "react-icons/io"; // Lock icon for the login button
import { seller_register } from "../../store/Reducers/authReducer"; // Importing the registration action

/**
 * Register Component
 * ------------------
 * Renders the user registration page including:
 * - Username, Email, Password input fields
 * - Terms agreement checkbox
 * - Sign up button
 * - Social login buttons (Google and Facebook)
 * - Link to Sign In page
 */

const Register = () => {
  // Dispatches login action on form submission via Redux.
  const dispatch = useDispatch();

  const { loader } = useSelector((state) => state.auth); // Access loading state from auth slice

  /**
   * Form state managed using useState hook
   * Contains: username, email, password
   */
  const [state, setState] = useState({
    username: "",
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
   */
  const submit = (e) => {
    e.preventDefault();
    // console.log(state); // Replace with API call in production
    dispatch(seller_register(state));
  };

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
          <p className="text-sm mb-3 font-medium">Create an account</p>
          <form onSubmit={submit}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="username">Username</label>
              <input
                onChange={inputHandle}
                value={state.username}
                className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md "
                type="text"
                name="username"
                placeholder="Username"
                id="username"
                required
              />
            </div>
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

            <button
              disabled={loader ? true : false}
              className="bg-slate-800 w-full hover:shadow-blue-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 flex items-center justify-center gap-2"
            >
              {loader ? (
                <PropagateLoader color="white" cssOverride={overrideStyle} />
              ) : (
                <>
                  <IoMdLock size={20} /> Sign Up
                </>
              )}
            </button>
            <div className="flex items-center mb-3 gap-3 justify-center">
              <p>
                Already have an account ?{" "}
                <Link className="font-bold underline text-black m" to="/login">
                  Sign In
                </Link>
              </p>
            </div>
            <div className="w-full flex justify-center items-center mb-3">
              <div className="w-[45%] bg-slate-700 h-[1px]"></div>
              <div className="w-[10%] flex justify-center items-center">
                <span className="pb-1">Or</span>
              </div>
              <div className="w-[45%] bg-slate-700 h-[1px]"></div>
            </div>
            <div className="flex justify-center items-center gap-3">
              <div className="w-[135px] h-[35px] flex rounded-md bg-orange-700 shadow-lg hover:shadow-orange-700/50 justify-center cursor-pointer items-center overflow-hidden">
                <span>
                  <FaGoogle />
                </span>
              </div>
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

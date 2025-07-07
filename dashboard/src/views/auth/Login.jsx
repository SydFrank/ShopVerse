/**
 * Login Component
 * ----------------
 * This component renders the user login form for ShopVerse.
 * Includes:
 * - Email and password input fields
 * - Login button
 * - Link to registration page
 * - Social login options (Google, Facebook)
 */

import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { useState } from "react";
import { IoMdLock } from "react-icons/io";

const Login = () => {
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
   */
  const submit = (e) => {
    e.preventDefault();
    console.log(state); // Replace with API call in production
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
          <p className="text-sm mb-3 font-medium">Sign in to your account</p>
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

            <button className="bg-slate-800 w-full hover:shadow-blue-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 flex items-center justify-center gap-2">
              <IoMdLock size={20} /> Sign in
            </button>
            <div className="flex items-center mb-3 gap-3 justify-center">
              <p>
                New to ShopVerse ?{" "}
                <Link
                  className="font-bold underline text-black "
                  to="/register"
                >
                  Create account
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

export default Login;

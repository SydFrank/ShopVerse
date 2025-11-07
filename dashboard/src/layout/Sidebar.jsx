import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getNav } from "../navigation/index";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for state access and dispatch
import { logout } from "../store/Reducers/authReducer";
import logo from "../assets/logo.png";
/**
 * Sidebar Component
 * ------------------
 * This component renders the left-hand vertical navigation panel used across
 * the admin dashboard. It dynamically loads navigation items based on the
 * authenticated user's role using `getNav("admin")`.
 *
 * Features:
 * - Fixed vertical sidebar with shadow and background styling.
 * - Responsive navigation highlighting based on current URL (`useLocation`).
 * - Logo branding at the top.
 * - Dynamically rendered navigation links based on role-based config.
 * - Static logout button (functionality to be implemented separately).
 *
 * Notes:
 * - Styling uses Tailwind CSS utility classes.
 * - Nav items are expected to be defined in `navigation/index.js` or equivalent.
 * - Consider moving the logout button to auth context or Redux handler.
 *
 * Improvements to Consider:
 * - Add ARIA roles for accessibility.
 * - Extract `NavLink` rendering into a reusable `<SidebarItem />` component.
 * - Implement actual logout logic on the logout button.
 */

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  // Initialize Redux dispatch function
  const dispatch = useDispatch();
  //  Initialize navigation function
  const navigate = useNavigate();

  // Destructure authentication-related state from Redux
  const { role } = useSelector((state) => state.auth);
  // Get current pathname for active link highlighting
  const { pathname } = useLocation();
  // State to hold all navigation items
  const [allNav, setAllNav] = useState([]);

  // Fetch navigation items for the admin role on initial render
  useEffect(() => {
    const navs = getNav(role);
    setAllNav(navs);
  }, [role]);

  // console.log(allNav); // Debug: log the nav items for verification
  return (
    <div>
      {/* Overlay for mobile when sidebar is open */}
      <div
        onClick={() => setShowSidebar(false)}
        className={`fixed duration-200 ${
          !showSidebar ? "invisible" : "visible"
        } w-screen h-screen bg-[#8cbce780] top-0 left-0 z-10`}
      ></div>

      {/* Sidebar panel */}
      <div
        className={`w-[260px] fixed bg-[#e6e7fb] z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all ${
          showSidebar ? "left-0" : "-left-[260px] lg:left-0"
        }`}
      >
        {/* Logo */}
        <div className="h-[70px] flex justify-center items-center">
          <Link to="/" className="w-[180px] h-[50px]">
            <img className="w-full h-full" src={logo} alt="Logo" />
          </Link>
        </div>
        {/* Navigation items */}
        <div className="px-[16px]">
          <ul>
            {allNav.map((currentNav, index) => (
              <li key={index}>
                <Link
                  to={currentNav.path}
                  className={`${
                    pathname === currentNav.path
                      ? "bg-blue-600 shadow-indigo-500/50 text-white duration-500"
                      : "text-[#030811] font-bold duration-200"
                  } px-[12px] py-[9px] round-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1`}
                >
                  <span>{currentNav.icon}</span>
                  <span>{currentNav.title}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => dispatch(logout({ navigate, role }))}
                className="text-[#030811] font-bold duration-200
                  px-[12px] py-[9px] round-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1 cursor-pointer"
              >
                <span>
                  <RiLogoutBoxLine />
                </span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

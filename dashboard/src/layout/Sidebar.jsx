import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getNav } from "../navigation/index";
import { RiLogoutBoxLine } from "react-icons/ri";
/**
 * Sidebar Component
 * -----------------
 * This component renders the application's sidebar menu for the admin panel.
 * It fetches the appropriate navigation items using `getNav("admin")` and stores
 * them in local state (`allNav`). The sidebar includes:
 *  - A fixed-width vertical layout.
 *  - A logo at the top.
 *  - Future support for dynamic navigation links (currently pending).
 */

const Sidebar = () => {
  const { pathname } = useLocation();

  const [allNav, setAllNav] = useState([]);

  // Fetch navigation items for the admin role on initial render
  useEffect(() => {
    const navs = getNav("admin");
    setAllNav(navs);
  }, []);

  // console.log(allNav); // Debug: log the nav items for verification
  return (
    <div>
      <div></div>
      <div
        className={`w-[260px] fixed bg-[#e6e7fb] z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all`}
      >
        <div className="h-[70px] flex justify-center items-center">
          <Link to="/" className="w-[180px] h-[50px]">
            <img className="w-full h-full" src="/images/logo.png" alt="Logo" />
          </Link>
        </div>
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
                className="text-[#030811] font-bold duration-200
                  px-[12px] py-[9px] round-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1"
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

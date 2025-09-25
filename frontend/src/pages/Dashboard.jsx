import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaList } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { FaBorderAll } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { TbLockPassword } from "react-icons/tb";

// User dashboard with sidebar navigation
const Dashboard = () => {
  // Control sidebar visibility on mobile
  const [filterShow, setFilterShow] = useState(false);

  return (
    <div>
      <Header />

      <div className="bg-slate-200 mt-5 ">
        {/* Mobile sidebar toggle button */}
        <div className="w-[90%] mx-auto max-lg:block hidden pl-5">
          <div>
            <button
              onClick={() => setFilterShow(!filterShow)}
              className="text-center py-3 px-3 bg-green-500 text-white"
            >
              <FaList />
            </button>
          </div>
        </div>

        <div className="h-full mx-auto pl-5">
          <div className="py-5 flex max-lg:w-[90%] mx-auto relative ">
            {/* Sidebar navigation */}
            <div
              className={`rounded-md z-50 max-lg:absolute ${
                filterShow ? "-left-4" : "-left-[360px]"
              } w-[270px] ml-4 bg-white`}
            >
              {/* Navigation menu items */}
              <ul className="py-2 text-slate-600 px-4 ">
                <li className="flex justify-start items-center gap-2 py-2">
                  <span className="text-xl">
                    <IoIosHome />
                  </span>
                  <Link to="/dashboard" className="block ">
                    Dashboard
                  </Link>
                </li>

                <li className="flex justify-start items-center gap-2 py-2">
                  <span className="text-xl">
                    <FaBorderAll />
                  </span>
                  <Link to="/dashboard/my-orders" className="block ">
                    My Orders
                  </Link>
                </li>

                <li className="flex justify-start items-center gap-2 py-2">
                  <span className="text-xl">
                    <FaHeart />
                  </span>
                  <Link to="/dashboard/my-wishlist" className="block ">
                    Wishlist
                  </Link>
                </li>

                <li className="flex justify-start items-center gap-2 py-2">
                  <span className="text-xl">
                    <IoChatbubbleEllipses />
                  </span>
                  <Link to="/dashboard" className="block ">
                    Chat
                  </Link>
                </li>

                <li className="flex justify-start items-center gap-2 py-2">
                  <span className="text-xl">
                    <TbLockPassword />
                  </span>
                  <Link to="/dashboard/change-password" className="block ">
                    Change Password
                  </Link>
                </li>

                <li className="flex justify-start items-center gap-2 py-2">
                  <span className="text-xl">
                    <TbLogout2 />
                  </span>
                  <Link to="/dashboard" className="block ">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>

            {/* Main content area */}
            <div className="w-[calc(100%-270px)] max-lg:w-full">
              <div className="mx-4 max-lg:mx-0">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;

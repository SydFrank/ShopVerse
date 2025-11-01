import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import React, { useEffect, useState } from "react";
import { socket } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { updateSellers, updateCustomer } from "../store/Reducers/chatReducer";

/**
 * MainLayout Component
 * --------------------
 * Serves as the primary layout wrapper for all private or nested routes.
 * Utilizes React Router's <Outlet> to render matched child components.
 *
 * Structure:
 * - Displays a static heading "Main Layout"
 * - Renders child routes dynamically via <Outlet>
 *
 * Usage:
 * Typically used as the layout component in a route configuration,
 * where private or nested routes are rendered under this layout.
 *
 * Example (React Router v6+):
 * {
 *   path: "/",
 *   element: <MainLayout />,
 *   children: [
 *     { path: "dashboard", element: <Dashboard /> },
 *     { path: "settings", element: <Settings /> }
 *   ]
 * }
 */

const MainLayout = () => {
  // Retrieve user information from Redux store
  const { userInfo } = useSelector((state) => state.auth);
  // Initialize Redux dispatch function
  const dispatch = useDispatch();

  // Establish socket connection based on user role
  useEffect(() => {
    if (userInfo && userInfo.role === "seller") {
      socket.emit("add_seller", userInfo._id, userInfo);
    } else {
      socket.emit("add_admin", userInfo);
    }
  }, [userInfo]);

  useEffect(() => {
    socket.on("activeCustomer", (customers) => {
      dispatch(updateCustomer(customers));
    });
    socket.on("activeSeller", (sellers) => {
      dispatch(updateSellers(sellers));
    });
  });

  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="bg-[#cddad9] w-full min-h-screen">
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="ml-0 lg:ml-[260px] pt-[95px] transition-all">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;

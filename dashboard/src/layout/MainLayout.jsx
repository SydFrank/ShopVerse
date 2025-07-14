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

import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  return (
    <div className="bg-[#cddad9] w-full min-h-screen">
      <Header />
      <Sidebar />
      <div className="ml-0 lg:ml-[260px] pt-[95px] transition-all">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;

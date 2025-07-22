/**
 * Admin Navigation Configuration
 * -------------------------------
 * This module defines the structured navigation menu for the admin panel.
 * Each menu item is represented as an object that includes metadata used
 * to dynamically render and control navigation visibility based on user roles.
 *
 * Fields:
 * - id:        A unique numeric identifier for the menu item.
 * - title:     The display name shown in the sidebar or navigation UI.
 * - icon:      A JSX element representing the icon (from react-icons).
 * - role:      Access control identifier (e.g., 'admin') used to filter items by user role.
 * - path:      Route path that integrates with React Router for navigation.
 *
 * Usage:
 * This array can be imported into layout components such as sidebars or header menus
 * to dynamically render routes based on the authenticated user’s role and permissions.
 *
 * Notes:
 * - All icons are sourced from the 'react-icons' library.
 * - Update this configuration when adding new admin routes.
 * - Ensure consistency between route paths and the application's router setup.
 */

import { AiOutlineDashboard, AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";
import { FaUserTimes } from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";
import { IoIosChatbubbles } from "react-icons/io";

export const allNav = [
  // Type definition for a single navigation item
  {
    id: 1,
    title: "Dashboard",
    icon: <AiOutlineDashboard />,
    role: "admin",
    path: "/admin/dashboard",
  },
  {
    id: 2,
    title: "Orders",
    icon: <AiOutlineShoppingCart />,
    role: "admin",
    path: "/admin/dashboard/orders",
  },
  {
    id: 3,
    title: "Category",
    icon: <BiCategory />,
    role: "admin",
    path: "/admin/dashboard/category",
  },
  {
    id: 4,
    title: "Sellers",
    icon: <FaUsers />,
    role: "admin",
    path: "/admin/dashboard/sellers",
  },
  {
    id: 5,
    title: "Payment Request",
    icon: <MdPayment />,
    role: "admin",
    path: "/admin/dashboard/payment-request",
  },
  {
    id: 6,
    title: "Deactive Sellers",
    icon: <FaUserTimes />,
    role: "admin",
    path: "/admin/dashboard/deactive-sellers",
  },
  {
    id: 7,
    title: "Seller Request",
    icon: <FaCodePullRequest />,
    role: "admin",
    path: "/admin/dashboard/sellers-request",
  },
  {
    id: 8,
    title: "Live Chat",
    icon: <IoIosChatbubbles />,
    role: "admin",
    path: "/admin/dashboard/chat-sellers",
  },
];

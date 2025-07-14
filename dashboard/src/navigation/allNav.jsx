/**
 * Navigation Configuration - Admin Panel
 * --------------------------------------
 * This file defines the navigation structure for the admin interface.
 * Each navigation item is represented as an object containing metadata
 * such as the display title, associated icon, user role, and route path.
 *
 * Fields:
 * - id:         Unique identifier for the menu item.
 * - title:      Label shown in the navigation UI.
 * - icon:       Icon component imported from react-icons.
 * - role:       User role that can access the menu item (e.g., "admin").
 * - path:       Route path to be used with React Router for navigation.
 *
 * Example Use:
 * This array can be consumed by a sidebar or menu component to dynamically
 * render items based on the authenticated user’s role and permissions.
 */

import { AiOutlineDashboard } from "react-icons/ai";

export const allNav = [
  {
    id: 1,
    title: "Dashboard",
    icon: <AiOutlineDashboard />,
    role: "admin",
    path: "/admin/dashboard",
  },
  {
    id: 2,
    title: "Dashboard",
    icon: <AiOutlineDashboard />,
    role: "seller",
    path: "/admin/dashboard",
  },
];

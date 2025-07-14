/**
 * getNav - Filter Navigation by User Role
 * ---------------------------------------
 * Filters the full navigation list (`allNav`) and returns only the items
 * that match the provided user role. This function is useful for rendering
 * role-based navigation menus (e.g., admin, user, moderator).
 *
 * @param {string} role - The role of the authenticated user.
 * @returns {Array} Array of navigation items permitted for the specified role.
 */

import { allNav } from "./allNav";

export const getNav = (role) => {
  const finalNav = [];
  for (let i = 0; i < allNav.length; i++) {
    if (role === allNav[i].role) {
      finalNav.push(allNav[i]);
    }
  }
  return finalNav;
};

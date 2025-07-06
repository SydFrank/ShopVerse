/**
 * Router Component
 * ---------------------------
 * This component takes a list of route configurations (allRoutes)
 * and renders the matched component using React Router's useRoutes() hook.
 */
import React from "react";
import { useRoutes } from "react-router-dom";

const Router = ({ allRoutes }) => {
  // Generate route elements based on route configuration
  const routes = useRoutes([...allRoutes]); // Clone the array to avoid the side effects

  // Render the matched route element
  return routes;
};

export default Router;

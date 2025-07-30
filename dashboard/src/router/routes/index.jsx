import { privateRoutes } from "./privateRoutes";
import MainLayout from "../../layout/MainLayout";
import ProtectRoute from "./ProtectRoute";

/**
 * getRoutes
 * ---------
 * Dynamically wraps each private route's element with the ProtectRoute component to enforce authentication and authorization.
 * Returns a route object with the app's MainLayout as the root, and all protected private routes as its children.
 *
 * Note: This function mutates the elements of privateRoutes in place by wrapping them with ProtectRoute.
 *       Each route receives its own config as the 'route' prop, and its original element as children.
 *
 * @returns {Object} Route configuration for the main application, including protected private routes.
 */

export const getRoutes = () => {
  privateRoutes.map((r) => {
    // Wrap each private route's element with ProtectRoute for access control
    r.element = <ProtectRoute route={r}>{r.element}</ProtectRoute>;
  });

  return {
    path: "/",
    element: <MainLayout />, // Main app layout component
    children: privateRoutes, // All protected private routes
  };
};

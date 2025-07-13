import { privateRoutes } from "./privateRoutes";
import MainLayout from "../../layout/MainLayout";

export const getRoutes = () => {
  return {
    path: "/",
    element: <MainLayout />, // Main layout component that wraps the application
    children: privateRoutes, // Include all private routes defined in privateRoutes
  };
};

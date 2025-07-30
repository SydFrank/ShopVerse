import { privateRoutes } from "./privateRoutes";
import MainLayout from "../../layout/MainLayout";
import ProtectRoute from "./ProtectRoute";

export const getRoutes = () => {
  privateRoutes.map((r) => {
    console.log(r);
    r.element = <ProtectRoute route={r}>{r.element}</ProtectRoute>; // Wrap each private route element with ProtectRoute
  });

  return {
    path: "/",
    element: <MainLayout />, // Main layout component that wraps the application
    children: privateRoutes, // Include all private routes defined in privateRoutes
  };
};

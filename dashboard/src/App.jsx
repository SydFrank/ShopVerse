import { useEffect, useState } from "react";
import Router from "./router/Router";
import publicRoutes from "./router/routes/publicRoutes";
import { getRoutes } from "./router/routes/index";
import { useDispatch, useSelector } from "react-redux";
import { get_user_info } from "./store/Reducers/authReducer";

/**
 * App Component
 * -------------
 * The root of the React application.
 * Initializes routing configuration by combining public and private routes,
 * and passes them into the Router component for rendering.
 *
 * Features:
 * - Fetches dynamic/private routes (e.g. user dashboard) and merges with public routes.
 * - On authentication (token present), fetches current user info.
 * - Provides unified route configuration to the Router component.
 */

function App() {
  // Redux dispatch to trigger actions (e.g. fetching user info)
  const dispatch = useDispatch();

  // Retrieve JWT token from auth state in Redux
  const { token } = useSelector((state) => state.auth);

  // State for all route definitions (public + private)
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);

  /**
   * useEffect: On mount, fetch dynamic/private routes and merge with public routes.
   * Note: The spread on allRoutes is only performed once (on mount), no dependency on publicRoutes.
   */
  useEffect(() => {
    const routes = getRoutes();
    setAllRoutes((prev) => [...prev, routes]);
  }, []);

  /**
   * useEffect: When token changes (i.e. user logs in/out), fetch user info if authenticated.
   */
  useEffect(() => {
    if (token) {
      dispatch(get_user_info());
    }
  }, [token, dispatch]);

  // Pass full route configuration to Router for rendering
  return <Router allRoutes={allRoutes} />;
}

export default App;

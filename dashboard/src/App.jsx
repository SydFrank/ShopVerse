import { useEffect, useState } from "react";
import Router from "./router/Router";
import publicRoutes from "./router/routes/publicRoutes";
import { getRoutes } from "./router/routes/index";

/**
 * App Component
 * -------------
 * The root of the React application.
 * Initializes routing configuration by combining public and private routes,
 * then passes them into the Router component for rendering.
 */

function App() {
  // State to hold the complete route configuration (public + private)
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  // console.log(allRoutes);

  /**
   * useEffect Hook
   * --------------
   * Runs once on component mount (empty dependency array).
   * Dynamically fetches the main route configuration (e.g., private routes nested under layout)
   * and merges it with the existing public routes.
   */
  useEffect(() => {
    const routes = getRoutes();
    // console.log(routes);
    setAllRoutes([...allRoutes, routes]);
  }, []);
  return <Router allRoutes={allRoutes} />;
}

export default App;

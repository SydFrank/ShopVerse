import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Card from "./pages/Card";
import Shipping from "./pages/Shipping";
import Details from "./pages/Details";
import Login from "./pages/Login";
import Register from "./pages/Register";
import React, { useEffect } from "react"; // useEffect for side effects on component mount
// Redux imports for state management
import { useDispatch } from "react-redux"; // Redux hooks for dispatching actions and selecting state
import { get_category } from "./store/reducers/homeReducer";
import CategoryShop from "./pages/CategoryShop";

function App() {
  // Redux dispatch hook for triggering actions
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_category()); // Fetch categories on component mount
  }, []); // Include dispatch in dependencies for React hooks compliance

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shops" element={<Shop />} />
        <Route path="/card" element={<Card />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/products?" element={<CategoryShop />} />
        <Route path="/product/details/:slug" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

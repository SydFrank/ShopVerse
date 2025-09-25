import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Shipping from "./pages/Shipping";
import Details from "./pages/Details";
import Login from "./pages/Login";
import Register from "./pages/Register";
import React, { useEffect } from "react"; // useEffect for side effects on component mount
// Redux imports for state management
import { useDispatch } from "react-redux"; // Redux hooks for dispatching actions and selecting state
import { get_category } from "./store/reducers/homeReducer";
import CategoryShop from "./pages/CategoryShop";
import SearchProducts from "./pages/SearchProducts";
import Payment from "./pages/Payment";
import Dashboard from "./pages/Dashboard";
import ProtectUser from "./utils/ProtectUser";
import Subindex from "./components/dashboard/Subindex";
import Orders from "./components/dashboard/Orders";
import ChangePassword from "./components/dashboard/ChangePassword";
import Wishlist from "./components/dashboard/Wishlist";

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
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/products?" element={<CategoryShop />} />
        <Route path="/products/search?" element={<SearchProducts />} />
        <Route path="/product/details/:slug" element={<Details />} />
        <Route path="/payment" element={<Payment />} />

        <Route path="/dashboard" element={<ProtectUser />}>
          <Route path="" element={<Dashboard />}>
            <Route path="" element={<Subindex />} />
            <Route path="my-orders" element={<Orders />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="my-wishlist" element={<Wishlist />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

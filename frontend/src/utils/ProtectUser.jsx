import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

// Protected route component for authenticated users only
const ProtectUser = () => {
  // Get user authentication status from Redux store
  const { userInfo } = useSelector((state) => state.auth);

  // Allow access to protected routes if user is authenticated
  if (userInfo) {
    return <Outlet />;
  } else {
    // Redirect to login page if user is not authenticated
    return <Navigate to="/login" replace={true} />;
  }
};

export default ProtectUser;

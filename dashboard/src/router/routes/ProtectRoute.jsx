import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ route, children }) => {
  const { role, userInfo } = useSelector((state) => state.auth);

  // 1. Check if the user is logged in
  if (role) {
    // 5. If the route has a specific role requirement
    if (userInfo) {
      // 3. If logged in, check if the user has the required role
      if (userInfo.role === route.role) {
        return <Suspense fallback={null}>{children}</Suspense>;
      } else {
        // 4. If the user does not have the required role, redirect to unauthorized page
        return <Navigate to={"/unauthorized"} replace />;
      }
    }
  } else {
    // 2. If not logged in, redirect to login page
    return <Navigate to={"/login"} replace />;
  }
};
export default ProtectRoute;

import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ route, children }) => {
  const { role, userInfo } = useSelector((state) => state.auth);

  // 1. Check if the user is logged in
  if (role) {
    if (route.role) {
      if (userInfo) {
        // 5. If logged in && userInfo, check if the user has the required role
        if (userInfo.role === route.role) {
          if (route.status) {
            if (route.status === userInfo.status) {
              // 6. If the user has the required status, check if the status matches
              return <Suspense fallback={null}>{children}</Suspense>;
            } else {
              // 7. If the user does not have the required status, redirect accordingly
              if (userInfo.status === "pending") {
                return <Navigate to="/seller/account-pending" replace />;
              } else {
                // 8. If the user is deactivated, redirect to deactivated account page
                return <Navigate to="/seller/account-deactive" replace />;
              }
            }
          } else {
            // 4. If the user does not have the status, then deal with the visibility
            if (route.visibility) {
              if (route.visibility.some((r) => r === userInfo.status)) {
                return <Suspense fallback={null}>{children}</Suspense>;
              } else {
                return <Navigate to="/seller/account-pending" replace />;
              }
            } else {
              //
              return <Suspense fallback={null}>{children}</Suspense>;
            }
          }
        }
      } else {
        // 4. If the user is logged in but does not have the userInfo, the user can not get access to anything ,redirect to unauthorized page
        return <Navigate to="/unauthorized" replace />;
      }
    } else {
      if (route.ability === "seller") {
        return <Suspense fallback={null}>{children}</Suspense>;
      }
    }
  } else {
    // 2. If not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }
};

export default ProtectRoute;

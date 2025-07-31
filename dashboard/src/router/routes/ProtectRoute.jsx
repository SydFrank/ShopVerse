import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * ProtectRoute Component
 * ----------------------
 * Guards access to a route by checking user authentication, role, and status.
 * Redirects users to appropriate pages if they do not meet the requirements.
 *
 * Props:
 * - route: Object containing route-specific access requirements (role, status, visibility, ability).
 * - children: The component tree to render if access is granted.
 */

const ProtectRoute = ({ route, children }) => {
  // Get the user's role and userInfo from Redux state
  const { role, userInfo } = useSelector((state) => state.auth);

  // Step 1: Check if the user is logged in (role exists)
  if (role) {
    // Step 2: Check if the route requires a specific role
    if (route.role) {
      // Step 3: Check if userInfo is loaded
      if (userInfo) {
        // Step 4: Check if the user's role matches the required role
        if (userInfo.role === route.role) {
          // Step 5: If the route requires a specific status (e.g., active, pending)
          if (route.status) {
            // Step 6: Grant access if user's status matches required status
            if (route.status === userInfo.status) {
              return <Suspense fallback={null}>{children}</Suspense>;
            } else {
              // Step 7: Redirect based on user's actual status
              if (userInfo.status === "pending") {
                // If user's status is pending, redirect to pending page
                return <Navigate to="/seller/account-pending" replace />;
              } else {
                // If user's status is deactivated, redirect to deactivated page
                return <Navigate to="/seller/account-deactive" replace />;
              }
            }
          } else {
            // Step 8: If no specific status is required, check for visibility restrictions
            if (route.visibility) {
              // Step 9: Grant access if user's status is in the visibility list
              if (route.visibility.some((r) => r === userInfo.status)) {
                return <Suspense fallback={null}>{children}</Suspense>;
              } else {
                // Step 10: Otherwise, treat user as pending and redirect
                return <Navigate to="/seller/account-pending" replace />;
              }
            } else {
              // Step 11: No status or visibility restrictions, grant access
              return <Suspense fallback={null}>{children}</Suspense>;
            }
          }
        } else {
          // Step 12: User's role does not match required role, redirect to unauthorized
          return <Navigate to="/unauthorized" replace />;
        }
      }
      // If userInfo is not loaded, do nothing (could add a loading state here)
    } else {
      // Step 13: If no role is required but the route requires seller ability
      if (route.ability === "seller") {
        return <Suspense fallback={null}>{children}</Suspense>;
      }
      // (Optional: handle other ability types if needed)
    }
  } else {
    // Step 14: Not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }
};

export default ProtectRoute;

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
  const { role, userInfo } = useSelector((state) => state.auth);

  // 1. Check if the user is logged in (role exists)
  if (role) {
    // 2. If the route requires a specific role
    if (route.role) {
      // 3. Check if user info is loaded
      if (userInfo) {
        // 4. Ensure the user has the required role
        if (userInfo.role === route.role) {
          // 5. If the route requires a specific status (e.g., active, pending)
          if (route.status) {
            // 6. Grant access if user's status matches required status
            if (route.status === userInfo.status) {
              return <Suspense fallback={null}>{children}</Suspense>;
            } else {
              // 7. Redirect based on user's actual status
              if (userInfo.status === "pending") {
                // If user's status is pending, redirect to pending page
                return <Navigate to="/seller/account-pending" replace />;
              } else {
                // If user's status is deactivated, redirect to deactivated page
                return <Navigate to="/seller/account-deactive" replace />;
              }
            }
          } else {
            // 8. If no specific status is required, check for visibility restrictions
            if (route.visibility) {
              // 9. Grant access if user's status is in the visibility list
              if (route.visibility.some((r) => r === userInfo.status)) {
                return <Suspense fallback={null}>{children}</Suspense>;
              } else {
                // 10. Otherwise, treat user as pending
                return <Navigate to="/seller/account-pending" replace />;
              }
            } else {
              // 11. No status or visibility restrictions, grant access
              return <Suspense fallback={null}>{children}</Suspense>;
            }
          }
        }
      } else {
        // 12. Logged in but userInfo not loaded: redirect to unauthorized page
        return <Navigate to="/unauthorized" replace />;
      }
    } else {
      // 13. If no role is required but the route requires seller ability
      if (route.ability === "seller") {
        return <Suspense fallback={null}>{children}</Suspense>;
      }
      // (Optional: handle other ability types if needed)
    }
  } else {
    // 14. Not logged in: redirect to login page
    return <Navigate to="/login" replace />;
  }
};

export default ProtectRoute;

// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     return children;
//   }
//   return React.createElement(Navigate, { to: "/login", replace: true });
// };

// export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiresAuth }) => {
  const token = localStorage.getItem("token");

  // If the route requires authentication and the user is not logged in
  if (requiresAuth && !token) {
    return React.createElement(Navigate, { to: "/login", replace: true });
  }

  // If the route is public and the user is logged in
  if (!requiresAuth && token) {
    return React.createElement(Navigate, { to: "/locate-buyer/find-comps", replace: true });
  }

  // Render the child components for valid cases
  return children;
};

export default ProtectedRoute;


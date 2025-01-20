import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute({ roles }) {
  const { isAuthenticated, userInfo } = useSelector((state) => state.user);
  const location = useLocation();

  // return isAuthenticated && roles.includes(userInfo?.apps?.jobPortal?.role) ? (
  // 	<Outlet />
  // ) : (
  // 	<Navigate to="/" />
  // );
  if(isAuthenticated && userInfo?.apps?.jobPortal) {
    return <Outlet />
  } else {
    localStorage.setItem("redirectPath", location.pathname + location.search);
    return <Navigate to="/" />
  }
}

export default ProtectedRoute;

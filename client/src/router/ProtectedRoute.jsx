import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ roles }) {
  const { isAuthenticated, userInfo } = useSelector((state) => state.user);

  // return isAuthenticated && roles.includes(userInfo?.apps?.jobPortal?.role) ? (
  // 	<Outlet />
  // ) : (
  // 	<Navigate to="/" />
  // );
  return isAuthenticated ? (
  	<Outlet />
  ) : (
  	<Navigate to="/" />
  );
}

export default ProtectedRoute;

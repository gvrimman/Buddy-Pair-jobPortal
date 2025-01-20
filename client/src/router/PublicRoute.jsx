import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PublicRoute() {
  const { isAuthenticated, userInfo } = useSelector((state) => state.user);

  if (isAuthenticated && userInfo?.apps?.jobPortal) {
    // const role = userInfo?.apps?.jobPortal?.role;
    // if (role === "employer") return <Navigate to="/job-portal/employer" />;
    // if (role === "employee") return <Navigate to="/job-portal/employee" />;
    // return <Navigate to="/job-portal" />;
    const redirectPath = localStorage.getItem("redirectPath");
    if (redirectPath) {
      localStorage.removeItem("redirectPath");
      return <Navigate to={redirectPath} />;
    } else return <Navigate to={"/job-portal"} />;
  }

  return <Outlet />;
}

export default PublicRoute;

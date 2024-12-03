import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PublicRoute() {
	const { isAuthenticated, userInfo } = useSelector((state) => state.user);

	if (isAuthenticated) {
		const role = userInfo?.apps?.jobPortal?.role;
		if (role === "employer") return <Navigate to="/job-portal/employer" />;
		if (role === "employee") return <Navigate to="/job-portal/employee" />;
	}

	return <Outlet />;
}

export default PublicRoute;

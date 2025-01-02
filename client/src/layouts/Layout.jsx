import React from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import { Outlet } from "react-router-dom";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";

function Layout() {
	return (
		<div className="flex flex-col md:flex-row gap-3 mt-1 sticky top-0 w-full mx-auto">
			{/* desktop */}
			<LeftSide />
			{/* mobile */}
			<TopNav />

			<Outlet />

			{/* mobile */}
			<BottomNav />
			{/* desktop */}
			<RightSide />
		</div>
	);
}

export default Layout;

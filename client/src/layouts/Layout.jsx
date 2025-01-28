import React from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import { Outlet } from "react-router-dom";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";
import { useNetworkStatus } from "../hooks/useNetworkStatus";

function Layout() {
	const isOnline = useNetworkStatus();
	return (
		<div className="flex flex-col md:flex-row gap-3 mt-1 sticky top-0 w-full max-w-[1600px] mx-auto">
			{!isOnline && (
				<div className="fixed top-0 left-0 w-full bg-opacity-70 rounded-tl-none rounded-tr-none rounded-lg bg-yellow-600 text-gray-700 text-lg font-semibold text-center py-0.5 z-[100]">
					You are offline. Some features may not work.
				</div>
			)}
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

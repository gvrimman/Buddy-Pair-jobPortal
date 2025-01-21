import React, { useEffect, useState } from "react";
import { MdHome, MdOutlineChatBubble, MdWork } from "react-icons/md";
import { IoBagAddSharp } from "react-icons/io5";
import { PiUserFill } from "react-icons/pi";
import { NavLink, useLocation } from "react-router-dom";

const link = [
	{
		title: "profile",
		link: "/job-portal/profile",
		icon: <PiUserFill />,
	},
	{
		title: "jobs",
		link: "/job-portal/jobs",
		icon: <MdWork />,
	},
	{
		title: "home",
		link: "/job-portal",
		icon: <MdHome />,
	},
	{
		title: "chat",
		link: "/job-portal/messages",
		icon: <MdOutlineChatBubble />,
	},
	{
		title: "requests",
		link: "/job-portal/requests",
		icon: <IoBagAddSharp />,
	},
];
function BottomNav() {
	const [hideNav, setHideNav] = useState(false);
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === "/job-portal/messages") {
			setHideNav(true);
		}else {
			setHideNav(false);
		}
	}, [location.pathname]);
	return (
		<div
			className={`md:hidden fixed z-10 bottom-0 left-0 right-0 ${
				hideNav && "hidden"
			}`}>
			<div className="m-4 shadow-2xl bg-white py-2 rounded-full flex items-center justify-around">
				{link.map((item, i) => (
					<div key={i} className="text-3xl text-purple-500">
						<NavLink
							end={true}
							to={item?.link}
							className={({ isActive }) =>
								isActive
									? "text-white bg-purple-500 block p-2 rounded-full"
									: "bg-purple-50 block p-2 rounded-full"
							}>
							{item?.icon}
						</NavLink>
					</div>
				))}
			</div>
		</div>
	);
}

export default BottomNav;

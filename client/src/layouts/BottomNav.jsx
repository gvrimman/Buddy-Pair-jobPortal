import React from "react";
import { MdHome, MdOutlineChatBubble, MdWork } from "react-icons/md";
import { IoBagAddSharp } from "react-icons/io5";
import { PiUserFill } from "react-icons/pi";
import { NavLink } from "react-router-dom";

const link = [
	{
		title: "profile",
		link: "/",
		icon: <PiUserFill />,
	},
	{
		title: "jobs",
		link: "/",
		icon: <MdWork />,
	},
	{
		title: "home",
		link: "/job-portal/employer",
		icon: <MdHome />,
	},
	{
		title: "chat",
		link: "/",
		icon: <MdOutlineChatBubble />,
	},
	{
		title: "requests",
		link: "/",
		icon: <IoBagAddSharp />,
	},
];
function BottomNav() {
	return (
		<div className="md:hidden fixed z-10 bottom-0 left-0 right-0">
			<div className="m-4 shadow-2xl bg-white py-2 rounded-full flex items-center justify-around">
				{link.map((item, i) => (
					<div key={i} className="text-3xl text-purple-500">
						<NavLink
							to={item?.link}
							className={({ isActive }) =>
								isActive
									? "text-white bg-purple-900 block p-2 rounded-full"
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

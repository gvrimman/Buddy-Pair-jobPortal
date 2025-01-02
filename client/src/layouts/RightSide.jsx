import React from "react";
import { NavLink } from "react-router-dom";
import { RiLogoutCircleLine } from "react-icons/ri";

function RightSide() {
	// side bar links
	const Links = [
		{
			title: "Home",
			link: "/",
		},
		{
			title: "Profile",
			link: "/job-portal/employer",
		},
		{
			title: "Find Jobs",
			link: "/job-portal/employer/candidates",
		},
		{
			title: "Messages",
			link: "/",
		},
		{
			title: "Notifications",
			link: "/",
		},
		{
			title: "Requests",
			link: "/",
		},
	];
	return (
		<div className="flex-1 p-3 rounded-lg bg-gradient-to-t from-purple-50 to-purple-100 hidden md:block h-screen sticky top-1">
			<div className="flex items-center gap-3">
				<div className="w-14 border-pink-400 border-[3px] overflow-hidden aspect-square rounded-full">
					<img
						className="h-full w-full"
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNJryFTSQUV8Zuu_EGw2iUCpMbIIKWHBl2eQ&s"
						alt=""
					/>
				</div>
				<div>
					<h5 className="font-bold text-sm text-pink-600">Jon Doe</h5>
					<span className="text-xs font-medium text-green-700 leading-2">
						Online
					</span>
				</div>
			</div>
			<div className=" mt-7">
				<ul>
					{Links.map((link, i) => (
						<li key={i} className="font-semibold text-gray-600 my-1 hover:bg-purple-200 rounded-lg hover:text-white transition-all ease-in-out duration-300">
							<NavLink
								to={link?.link}
								className={({ isActive }) =>
									isActive
										? " block p-2 bg-purple-500 text-white rounded-lg"
										: "block p-2"
								}>
								{link?.title}
							</NavLink>
						</li>
					))}
				</ul>
				<div className="absolute bottom-6 left-1/2 -translate-x-1/2">
					<button className="flex items-center gap-2 font-semibold text-gray-800 w-full rounded hover:underline underline-offset-2">
						<RiLogoutCircleLine />
						<span>Logout</span>
					</button>
				</div>
			</div>
		</div>
	);
}

export default RightSide;

import React from "react";
import { NavLink } from "react-router-dom";

function LeftSide() {
	// side bar links
	const Links = [
		{
			title: "Professional Community",
			link: "/",
		},
		{
			title: "Job Portal",
			link: "/job-portal",
		},
		{
			title: "Matrimony",
			link: "/",
		},
		{
			title: "E commerce",
			link: "/",
		},
		{
			title: "Study Abroad",
			link: "/",
		},
	];
	return (
		<div className="w-[20vw] p-3 rounded-lg bg-white border-2 border-purple-500 hidden md:block h-screen sticky top-1">
			<div>
				<h2 className="font-bold text-2xl text-purple-500">
					BuddyPair
				</h2>
			</div>
			<div className=" mt-7">
				<ul>
					{Links.map((link, i) => (
						<li
							key={i}
							className="font-semibold text-gray-800 my-1 hover:bg-purple-200 rounded-lg hover:text-white transition-all ease-in-out duration-300">
							<NavLink
								to={link?.link}
								className={({ isActive }) =>
									isActive
										? " block p-2 bg-white border-2 border-purple-500 rounded-lg text-purple-500 hover:bg-purple-100"
										: "block p-2"
								}>
								{link?.title}
							</NavLink>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default LeftSide;

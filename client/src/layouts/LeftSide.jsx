import React from "react";
import { NavLink } from "react-router-dom";

function LeftSide() {
	// side bar links
	const Links = [
		{
			title: "Proffessional Community",
			link: "/",
		},
		{
			title: "Job Portal",
			link: "/job-portal",
		},
		{
			title: "Matirimony",
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
		<div className="w-[20vw] p-3 rounded-lg bg-gradient-to-t from-purple-50 to-purple-100 hidden md:block h-screen sticky top-1">
			<div>
				<h2 className="font-bold text-2xl text-purple-700">
					BuddyPair
				</h2>
			</div>
			<div className=" mt-7">
				<ul>
					{Links.map((link, i) => (
						<li
							key={i}
							className="font-semibold text-gray-600 my-1 hover:bg-purple-200 rounded-lg hover:text-white transition-all ease-in-out duration-300">
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
			</div>
		</div>
	);
}

export default LeftSide;

import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { IoPersonOutline } from "react-icons/io5";
import { CiMenuFries } from "react-icons/ci";

import SideBar from "./SideBar";
import MessageNotification from "./MessageNotification";
import ProfileMenu from "./ProfileMenu";

function NormalHeader({ value, setValue }) {
	const [dropMenu, setDropMenu] = useState(false);

	return (
		<div className="relative">
			<header className="lg:hidden bg-white shadow-sm">
				<nav
					className={`h-20 mx-3  ${
						value ? "flex justify-between items-center" : "hidden"
					} `}>
					<div className="antialiased tracking-wide text-[#673ab7] text-xl font-semibold">
						<Link to={"/job-portal/employer"}>JOB PORTAL</Link>
					</div>
					<div className="flex gap-2">
						<MessageNotification />
						<NavLink
							className="p-1 rounded-md text-xl font-bold "
							onClick={() => setDropMenu(!dropMenu)}>
							<IoPersonOutline />
						</NavLink>
						<NavLink
							onClick={() => setValue(false)}
							className="p-1 rounded-md text-xl font-bold">
							<CiMenuFries />
						</NavLink>
					</div>
				</nav>

				<SideBar value={value} setValue={setValue} />
			</header>
			{dropMenu && (
				<ProfileMenu
					drop={dropMenu}
					setDrop={setDropMenu}
					from={"employer"}
				/>
			)}
		</div>
	);
}

export default NormalHeader;

import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { CgProfile } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoBookmarkOutline } from "react-icons/io5";
import ProfileMenu from "./ProfileMenu";
import MessageNotification from "./MessageNotification";

function LargeHeader() {
	const [dropMenu, setDropMenu] = useState(false);
	const navigate = useNavigate();
	return (
		<div className="relative">
			<header className="hidden lg:block  bg-[#f7f7f8] text-black shadow-md">
				<nav className=" max-w-[1440px] h-20 mx-auto px-7 flex flex-1 justify-between items-center">
					<div className="flex items-center gap-5">
						<div className="antialiased tracking-wide text-xl font-bold">
							<Link to={"/job-portal/employer"}>JOB PORTAL</Link>
						</div>
						<div className="flex gap-3">
							<Link
								className="hover:scale-105 hover:text-[#673ab7]"
								to={"/job-portal/employer/candidates"}>
								Candidates
							</Link>
							<Link
								className="hover:scale-105 hover:text-[#673ab7]"
								to={"/job-portal/employer/companies"}>
								Companies
							</Link>
						</div>
					</div>
					<div className="flex items-center gap-3">
						{/* <NavLink
							to={"/job-portal/saved-jobs"}
							className="p-1 rounded-md text-2xl bg-[#ede7f6] text-[#673ab7] hover:bg-[#673ab7] hover:text-[#ffffff] hover:scale-105">
							<IoBookmarkOutline />
						</NavLink> */}
						<div
							onClick={() =>
								navigate(
									"/job-portal/employer/dashboard/messages"
								)
							}>
							<MessageNotification />
						</div>
						<NavLink
							to={"/notifications"}
							className="p-1 rounded-md text-2xl bg-[#ede7f6] text-[#673ab7] hover:bg-[#673ab7] hover:text-[#ffffff] hover:scale-105">
							<IoMdNotificationsOutline />
						</NavLink>

						<NavLink
							className="p-1 rounded-md text-2xl bg-[#ede7f6] text-[#673ab7] hover:bg-[#673ab7] hover:text-[#ffffff] hover:scale-105"
							onClick={() => setDropMenu(!dropMenu)}>
							<CgProfile />
						</NavLink>
					</div>
				</nav>
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

export default LargeHeader;

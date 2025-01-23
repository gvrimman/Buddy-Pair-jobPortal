import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { CgProfile } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoBookmarkOutline } from "react-icons/io5";
import MessageNotification from "../employer/MessageNotification";
import ProfileMenu from "../employer/ProfileMenu";
import { useSelector } from "react-redux";

function LargeHeader() {
	const [dropMenu, setDropMenu] = useState(false);
	const { bookmarkedJobs } = useSelector((state) => state.employee);
	const { unreadCount } = useSelector((state) => state.notification);
	const navigate = useNavigate();

	return (
		<div className="relative">
			<header className="hidden lg:block bg-[#f7f7f8] text-black shadow-md">
				<nav className="max-w-[1440px] h-20 mx-auto px-7 flex flex-1 justify-between items-center">
					<div className="flex items-center gap-5">
						<div className="antialiased tracking-wide text-xl font-bold">
							<Link to={"/job-portal/employee"}>JOB PORTAL</Link>
						</div>
						<div className="flex gap-3">
							<Link
								className="hover:scale-105 hover:text-[#673ab7]"
								to={"/job-portal/employee/jobs"}>
								Find Jobs
							</Link>
							<Link
								className="hover:scale-105 hover:text-[#673ab7]"
								to={"/job-portal/employee/companies"}>
								Company
							</Link>
						</div>
					</div>
					<div className="flex items-center gap-3">
						<NavLink
							to={
								"/job-portal/employee/dashboard/bookmarked-jobs"
							}
							className="relative p-1 rounded-md text-2xl bg-[#ede7f6] text-[#673ab7] hover:bg-[#673ab7] hover:text-[#ffffff] hover:scale-105">
							<IoBookmarkOutline />
							{bookmarkedJobs?.length === 0 ? null : (
								<span className="absolute -top-3 -right-3 min-w-6 min-h-6 flex items-center justify-center bg-theme-500 text-white text-sm rounded-full ">
									{bookmarkedJobs?.length}
								</span>
							)}
						</NavLink>

						<NavLink to={"/job-portal/employee/dashboard/messages"}>
							<MessageNotification />
						</NavLink>

						<NavLink
							to={"/job-portal/employee/dashboard/notification"}
							className="relative p-1 rounded-md text-2xl bg-[#ede7f6] text-[#673ab7] hover:bg-[#673ab7] hover:text-[#ffffff] hover:scale-105">
							<IoMdNotificationsOutline />
							{unreadCount === 0 ? null : (
								<span className="absolute -top-3 -right-3 min-w-6 min-h-6 flex items-center justify-center bg-theme-500 text-white text-sm rounded-full ">
									{unreadCount}
								</span>
							)}
						</NavLink>

						<NavLink
							onClick={() => setDropMenu(!dropMenu)}
							className="p-1 rounded-md text-2xl bg-[#ede7f6] text-[#673ab7] hover:bg-[#673ab7] hover:text-[#ffffff] hover:scale-105">
							<CgProfile />
						</NavLink>
					</div>
				</nav>
			</header>
			{dropMenu && (
				<ProfileMenu
					drop={dropMenu}
					setDrop={setDropMenu}
					from={"employee"}
				/>
			)}
		</div>
	);
}

export default LargeHeader;

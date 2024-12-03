import React from "react";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa6";
import { useSelector } from "react-redux";

function ChatHeader({ user, handleBack }) {
	const { onlineUsers } = useSelector((state) => state.socket);
	const isUserOnline = onlineUsers.includes(user?.userId);
	return (
		<div className="mt-3 h-20 bg-customBgColor flex items-center justify-between px-2 shadow-md shadow-gray-300 rounded-md ">
			<button
				className="lg:hidden text-3xl text-slate-600"
				onClick={handleBack}>
				<FaCircleChevronLeft />
			</button>
			<div className="ms-3 flex items-center gap-3">
				<h2 className="capitalize text-sm font-semibold">
					{user?.user?.username || "unknown"}
				</h2>
				<div className={`avatar ${isUserOnline ? "online" : ""}`}>
					<div className="w-14 h-14 border border-black rounded-full overflow-hidden">
						{user?.user?.profilePic ? (
							<img
								src={user?.user?.profilePic}
								alt="user-image"
								className="w-full h-full object-cover"
							/>
						) : (
							<div className="w-full h-full flex items-center justify-center text-2xl border border-black  rounded-full">
								<FaRegUser />
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ChatHeader;

import React from "react";

import { CiMenuKebab } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import { useSelector } from "react-redux";

function ChatHeader({ user }) {
  const { onlineUsers } = useSelector((state) => state.socket);
  const isUserOnline = onlineUsers.includes(user._id);
  return (
		<div className="mt-3 h-20 bg-customBgColor grid grid-cols-2 shadow-md shadow-gray-300 rounded-md">
			<div className="ms-3 flex items-center gap-3">
				<div className={`avatar ${isUserOnline ? "online" : ""}`}>
					<div className="w-14 h-14 border border-black rounded-full overflow-hidden">
						{user?.profileImage ? (
							<img
								src={user?.profileImage}
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
				<h2 className="capitalize text-sm font-semibold">
					{user?.userId?.username || "unknown"}
				</h2>
			</div>
			<div className="flex justify-end items-center">
				<div className="text-lg mr-3">
					<CiMenuKebab />
				</div>
			</div>
		</div>
  );
}

export default ChatHeader;

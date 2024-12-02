import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FaRegUser } from "react-icons/fa6";

import { extractTime } from "../../../utils/converTime";
import { markUserMessagesAsRead } from "../../../apis/messageApi";

function ChatBox({ userImg, userId, chat, receiver }) {
  const fromMe = chat.senderId === userId;
  const extractedTime = extractTime(chat.createdAt);
  const chatClass = fromMe ? "justify-start" : "justify-end";
  const profilePic = fromMe ? userImg : receiver.user.profilePic;
  const shakeClass = chat.shouldShake ? "shake" : "";
  const dispatch = useDispatch();

  useEffect(() => {
    if (chat.senderId === receiver.userId) {
      dispatch(markUserMessagesAsRead(receiver.userId));
    }
  }, [receiver]);

  return (
		<div className={`${chatClass} flex items-start gap-4 `}>
			<div className="w-10 h-10 border border-black rounded-full overflow-hidden">
				{profilePic ? (
					<img
						src={profilePic}
						alt="user-image"
						className="w-full h-full object-cover"
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center text-2xl text-gray-600">
						<FaRegUser />
					</div>
				)}
			</div>

			<div
				className={`w-full lg:w-3/5 max-w-xs bg-white text-black p-3 rounded-lg shadow-md ${shakeClass}`}>
				<p className="text-sm font-semibold break-words whitespace-normal">
					{chat?.message}{" "}
				</p>
				<time className="block text-xs text-right text-gray-500">
					{extractedTime}
				</time>
			</div>
		</div>
  );
}

export default ChatBox;

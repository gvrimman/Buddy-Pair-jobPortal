import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { FaRegUser } from "react-icons/fa6";

import { extractTime } from "../../../utils/converTime";
import { markUserMessagesAsRead } from "../../../apis/messageApi";

function ChatBox({ userImg, userId, chat, receiver }) {
  const fromMe = chat.senderId === userId;
  const extractedTime = extractTime(chat.createdAt);
  const chatClass = fromMe ? "chat-end mr-2" : "chat-start ms-2";
  const profilePic = fromMe ? userImg : receiver.user.profilePic;
  const shakeClass = chat.shouldShake ? "shake" : "";
  const dispatch = useDispatch();

  useEffect(() => {
    if (chat.senderId === receiver.userId) {
      dispatch(markUserMessagesAsRead(receiver.userId));
    }
  }, [receiver]);

  return (
    <div className={`chat ${chatClass} `}>
      <div className="chat-image avatar">
        <div className="w-10 h-10 border border-black rounded-full overflow-hidden">
          {profilePic ? (
            <img
              src={profilePic}
              alt="user-image"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl  rounded-full">
              <FaRegUser />
            </div>
          )}
        </div>
      </div>

      <div
        className={`w-full lg:w-3/6 chat-bubble bg-white text-black shadow ${shakeClass}`}
      >
        <p className="w-5/6 text-sm font-semibold">{chat?.message} </p>
        <time className="flex justify-end text-xs opacity-75">
          {extractedTime}
        </time>
      </div>
    </div>
  );
}

export default ChatBox;

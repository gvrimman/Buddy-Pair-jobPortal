import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ChatHeader from "./ChatHeader";
import ChatBox from "./ChatBox";
import ChatInput from "./ChatInput";
import useListenMessage from "../../../hooks/useListenMessage";
import { getChats } from "../../../apis/messageApi";

function MainBox() {
  useListenMessage(); // Hook to listen for incoming messages

  const [userId, setUserId] = useState(null); // Current user's ID
  const { socket } = useSelector((state) => state.socket);
  const { isLoading, selectedUser, chats } = useSelector((state) => state.chat);
  const { userInfo, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const lastChat = useRef(null);

  // Fetch chat messages when a new user is selected
  useEffect(() => {
    if (selectedUser?.userId && socket) {
      dispatch(getChats(selectedUser?.userId));
      socket.emit("joinRoom", { chatId: selectedUser?.chatId });
    }
  }, [selectedUser, dispatch, socket]);

  // Set userId when the user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setUserId(userInfo.userId);
    }
  }, [isAuthenticated, userInfo]);

  // Scroll to the last chat when the chat list updates
    useEffect(() => {
      setTimeout(() => {
        lastChat.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }, [chats]);

  return (
    <div className="sticky top-20 z-10 w-full h-screen bg-green-200 overflow-hidden px-4 pb-3 rounded-md shadow">
      <div>
        <ChatHeader user={selectedUser} />
      </div>
      <div className="w-full h-screen relative py-2 bg-customBgColor shadow-md shadow-gray-300 rounded-md">
        <div className="w-full h-screen pt-3 flex flex-col gap-3 overflow-y-auto custom-scrollbar">
          {chats?.map((chat, index) => (
            <div key={index} ref={lastChat}>
              <ChatBox
                chat={chat}
                receiver={selectedUser}
                userImg={userInfo?.apps?.jobPortal?.profileImage}
                userId={selectedUser?.userId}
              />
            </div>
          ))}
          {!isLoading && chats?.length === 0 && (
            <p className="text-center font-semibold text-customViolet">
              Send a message to start the chat
            </p>
          )}
        </div>
        <div className="absolute bottom-56 w-full">
          <ChatInput receiver={selectedUser} />
        </div>
      </div>
    </div>
  );
}

export default MainBox;

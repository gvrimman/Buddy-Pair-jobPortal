import React, { useEffect, useRef, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import { useDispatch, useSelector } from "react-redux";

import { RiMessage3Line } from "react-icons/ri";

// import { useSocketContext } from "../../../context/SocketContext";
// import useListenMessage from "../../../hooks/useListenMessage";
// import { markAllUnreadMessages } from "../../../redux/chatSlice";

function MessageNotification() {
  const [isOpen, setIsOpen] = useState(false);
  // const { userLists, messages } = useSelector((state) => state.chat);
  // const { markOneMessageAsRead } = useSocketContext();
  const dispatch = useDispatch();
  const timeAgoRef = useRef();
  // useListenMessage();

  let sender;
  
  // const modifiedMessages = messages?.map((n) => {
  //   sender = userLists?.find((user) => user._id === n.senderId);
  //   return {
  //     ...n,
  //     senderName: sender?.username,
  //   };
  // });

  const handleMarkAsRead = () => {
    // dispatch(markAllUnreadMessages());
    setIsOpen(!isOpen);
  };

  const handleOneMessage = (message) => {
    markOneMessageAsRead(message, userLists, messages);
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative ">
      <div
        className="relative w-fit p-1 rounded-md text-2xl lg:bg-[#ede7f6]  lg:text-[#673ab7] lg:hover:bg-[#673ab7] lg:hover:text-[#ffffff] hover:scale-105 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <RiMessage3Line />
        {/* {messages?.length === 0 ? null : (
          <span className="absolute -top-3 -right-3 min-w-6 min-h-6 flex items-center justify-center bg-customViolet text-white text-sm rounded-full ">
            {messages?.length}
          </span>
        )} */}
      </div>
      {isOpen ? (
        <div className="w-max max-h-80 absolute top-10 -right-14 lg:-left-48 p-3 grid gap-2 bg-white rounded-md shadow overflow-y-auto custom-scrollbar">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="font-semibold">Messages</h1>
            <p
              className="text-sm cursor-pointer hover:font-semibold hover:text-customViolet"
              onClick={handleMarkAsRead}
            >
              Mark all as read
            </p>
          </div>
          {modifiedMessages?.length === 0 ? (
            <div className="w-full text-sm py-2 px-3 bg-customBgColor text-slate-950">
              No message yet...
            </div>
          ) : null}
          {modifiedMessages &&
            modifiedMessages.map((m, index) => (
              <div
                key={index}
                className={`grid gap-1 ${
                  m.isRead ? "bg-customBgColor" : "bg-blue-100"
                } p-2  rounded-md hover:text-blue-500 cursor-pointer hover:font-semibold `}
                ref={timeAgoRef}
                onClick={() => handleOneMessage(m)}
              >
                <span className="capitalize text-sm">
                  {m.senderName} sent you a new message
                </span>
                <span className="capitalize text-xs">
                  <ReactTimeAgo date={m.createdAt} locale="en-US" />
                </span>
              </div>
            ))}
        </div>
      ) : null}
    </div>
  );
}

export default MessageNotification;

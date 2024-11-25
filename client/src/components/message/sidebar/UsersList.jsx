import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaRegUser } from "react-icons/fa6";
import { setSelected } from "../../../Redux/reducers/socketReducer";
import { setSelectedUser } from "../../../Redux/reducers/chatReducer";
import useListenMessage from "../../../hooks/useListenMessage";
import { useSocket } from "../../../hooks/useSocket";




function UsersList({ user }) {
  const { onlineUsers } = useSelector((state) => state.socket);
  const [unreadCount, setUnreadCount] = useState(null);
  const { selectedUser, messages } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const { findEachUserUnreadMessages } = useSocket();


  const isUserOnline = onlineUsers.includes(user.userId);

  useListenMessage();

  const handleSelectedUser = () => {
    dispatch(setSelectedUser(user));
    dispatch(setSelected(true));
  };

  useEffect(() => {
    const unread = findEachUserUnreadMessages(user.userId, messages);
    setUnreadCount(unread.length);
  }, [user, messages]);

  return (
    <div
      className={`px-2 py-3 grid grid-cols-4 items-center cursor-pointer rounded-lg ${
        selectedUser?.userId === user?.userId
          ? "bg-customViolet text-white"
          : ""
      } hover:hover:bg-customViolet hover:text-white`}
      onClick={handleSelectedUser}
    >
      <div className={`mx-auto avatar ${isUserOnline ? "online" : ""}`}>
        <div className="w-12 h-12 border border-black rounded-full overflow-hidden">
          {user?.user.profilePic ? (
            <img
              src={user?.user.profilePic}
              alt={user.user.username}
              className="w-full h-full   object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center  rounded-full">
              <FaRegUser />
            </div>
          )}
        </div>
      </div>
      <div className="col-span-2">
        <h2 className="capitalize text-sm font-semibold">
          {user?.user?.username || "unknown"}
        </h2>
      </div>
      <div className="flex flex-col items-end gap-1">
        <p className="text-sm mr-2">
          35 <span className="text-xs">mins</span>
        </p>
        {user && unreadCount ? (
          <p className="min-w-5 min-h-5 flex justify-center items-center text-xs font-semibold bg-customViolet text-white rounded-full">
            {unreadCount}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default UsersList;

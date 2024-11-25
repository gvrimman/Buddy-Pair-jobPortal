import React from "react";
import { useDispatch } from "react-redux";

import { FaRegUser } from "react-icons/fa6";
// import { useSocketContext } from "../../../../context/SocketContext";
// import { setSelectedUser } from "../../../../redux/chatSlice";



function SearchedUser({ user, setValue }) {
  // const { setSelected } = useSocketContext();
  const dispatch = useDispatch();

  const handleUserSelection = () => {
    dispatch(setSelectedUser(user));
    setSelected(true);
    setValue("");
  };

  return (
    <div
      className="w-full bg-blue-100 p-3 flex items-center gap-3 border cursor-pointer z-10"
      onClick={handleUserSelection}
    >
      <div>
        {user?.picture ? (
          <img
            src={user?.picture}
            alt="user-picture"
            className="w-8 h-8 object-cover rounded-full"
          />
        ) : (
          <div className="outline w-8 h-8 rounded-full flex justify-center items-center text-xl">
            <FaRegUser />
          </div>
        )}
      </div>
      <div>
        <h2 className="capitalize text-sm font-semibold">
          {user?.username || "Unknown"}
        </h2>
      </div>
    </div>
  );
}

export default SearchedUser;

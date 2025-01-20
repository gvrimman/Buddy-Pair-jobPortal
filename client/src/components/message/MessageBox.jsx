import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MainBox from "./mainbox/MainBox";
import SearchBar from "./sidebar/SearchBar";
import UsersList from "./sidebar/UsersList";
import DefaultChatBox from "./DefaultChatBox";
import SkeltonList from "./sidebar/SkeltonList";
import { setSelectedUserById } from "../../Redux/reducers/chatReducer";
import { setSelected } from "../../Redux/reducers/socketReducer";
import { getOtherUsers } from "./../../apis/messageApi";
import { useSocket } from "./../../hooks/useSocket"; 

function MessageBox() {
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const { userLists } = useSelector((state) => state.chat);
  const { selected } = useSelector((state) => state.socket);

  useEffect(() => {
    dispatch(getOtherUsers());
  }, [dispatch]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get("user");
    if (user && userLists) {
      dispatch(setSelectedUserById(user));
      dispatch(setSelected(true));
    }
  }, [dispatch, userLists]);

  console.log(userLists);
   const handleBack = () => {
		dispatch(setSelected(false));
   };

  return (
		<div className="max-w-[900px] w-full h-screen md:flex gap-2 ">
			{/* userlist */}
			<div
				className={`w-full ${
					selected ? "hidden md:block lg:w-[35%]" : "lg:w-[35%]"
				} h-screen bg-white px-3 lg:px-5 pt-3 rounded-md shadow`}>
				<SearchBar />
				<div className=" grid gap-4 my-4 overflow-y-auto custom-scrollbar ">
					{!userLists ? (
						<SkeltonList />
					) : (
						userLists?.map((item) => (
							<UsersList key={item._id} user={item} />
						))
					)}
					{!userLists.length && <h3 className="p-4 font-bold text-xl text-center text-purple-500 flex justify-center items-center">Their is no Users to show</h3>}
				</div>
			</div>
			{/* chatbox */}
			<div
				className={`w-full lg:w-[70%] ${
					selected ? "block" : "hidden"
				} lg:block`}>
				{selected ? (
					<MainBox handleBack={handleBack} />
				) : (
					<DefaultChatBox />
				)}
			</div>
		</div>
  );
}

export default MessageBox;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MainBox from "./mainbox/MainBox";
import SearchBar from "./sidebar/SearchBar";
import UsersList from "./sidebar/UsersList";
import DefaultChatBox from "./DefaultChatBox";
import SkeltonList from "./sidebar/SkeltonList";
import { getOtherUsers } from "./../../apis/messageApi";

function MessageBox() {
  const dispatch = useDispatch();
  const { userLists } = useSelector((state) => state.chat);
  const { selected } = useSelector((state) => state.socket);



  useEffect(() => {
    dispatch(getOtherUsers());
  }, [dispatch]);

  return (
    <div className="w-full h-[90%] md:flex gap-2">
      <div className="w-full lg:w-[35%]  bg-white px-3 lg:px-5 pt-3 grid gap-4 rounded-md shadow">
        <SearchBar />
        <div className=" grid gap-4 mb-4 overflow-y-auto custom-scrollbar">
          {!userLists ? (
            <SkeltonList />
          ) : (
            userLists?.map((item) => <UsersList key={item._id} user={item} />)
          )}
        </div>
      </div>
      <div className="w-full lg:w-[70%]  ">
        {selected ? <MainBox /> : <DefaultChatBox />}
      </div>
    </div>
  );
}

export default MessageBox;

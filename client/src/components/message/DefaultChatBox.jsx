import React from "react";
import { TiMessages } from "react-icons/ti";

function DefaultChatBox() {
  return (
    <div className="h-full pt-5 bg-white text-black flex flex-col justify-start items-center gap-3 rounded-lg shadow">
      <h1 className="text-center text-lg font-semibold ">
        Select a chat to start messaging
      </h1>
      <div className="mx-auto text-3xl">
        <TiMessages />
      </div>
    </div>
  );
}

export default DefaultChatBox;

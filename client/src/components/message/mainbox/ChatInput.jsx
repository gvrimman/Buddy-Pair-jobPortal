import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify"; 

import messagePop from "/assets/sounds/message-pop-alert.mp3";
import { setSendChat } from "../../../apis/messageApi";
import { showError } from "../../../utils/toast";
// import { setSendChat } from "../../../../redux/chatSlice";

function ChatInput({ receiver }) {
  const [chatValue, setChatValue] = useState("");
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.socket);
  const { userInfo } = useSelector((state) => state.user);
  const handleChangeValue = (e) => {
    setChatValue(e.target.value);
  };

  const handleSendBtn = async () => {
    if (!chatValue) return;
    try {
      dispatch(
        setSendChat({
          user: userInfo._id,
          id: receiver.userId.toString(),
          message: chatValue,
          chatId: receiver.chatId.toString(),
          socket
        })
      );
      const audio = new Audio(messagePop);
      audio.play();
      setChatValue("");
    } catch (error) {
      showError("Something Error Occured Sending Message");
    }
  };

  const handleKeyBtn = (e) => {
    if (e.key === "Enter") {
      handleSendBtn();
    }
  };

  return (
    // <div className="h-[80px] lg:mx-3 px-2 flex items-center gap-2  fixed bottom-3 w-[85vw] sm:w-[90vw] md:w-[40vw] lg:w-[55vw] xl:w-[35vw]">
    <div className="h-fit flex items-center gap-3">
      <div className="w-full bg-white p-2 border-2 border-slate-500 rounded-lg">
        <input
          type="text"
          className="w-full ps-2 bg-white text-black focus:outline-none placeholder:text-customViolet placeholder:font-semibold"
          placeholder="Message"
          value={chatValue}
          onChange={handleChangeValue}
          onKeyDown={handleKeyBtn}
        />
      </div>
      <button
        onClick={handleSendBtn}
        className="bg-customViolet text-white text-center text-2xl p-[10px] rounded-full"
      >
        <IoMdSend />
      </button>
    </div>
  );
}

export default ChatInput;

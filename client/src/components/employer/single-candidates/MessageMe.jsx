import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../../utils/axios";
import { showSuccess, showError } from "../../../utils/toast";

function MessageMe() {
  const navigate = useNavigate();
  const { candidate } = useSelector((state) => state.employer);

  const handleClick = async () => {
    try {
      const response = await axiosInstance.post("/message/create", {
        id: candidate?.userId?._id,
      });
      if (response.data.success) {
        navigate(
          `/job-portal/messages/?user=${candidate?.userId?._id}`
        );
        showSuccess(response.data.message);
      } else {
        showError(response.data.message || "Failed to send message");
      }
    } catch (error) {
      showError("An error occurred while sending the message.");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full lg:w-auto px-4 py-2 bg-purple-600 hover:bg-purple-800 text-white text-base tracking-wider rounded-md"
    >
      Message Me
    </button>
  );
}


export default MessageMe;

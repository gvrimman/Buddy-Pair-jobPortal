import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../../utils/axios";
import { showSuccess, showError } from "../../../utils/toast";

function MessageMe() {
    const navigate = useNavigate();
    const { candidate } = useSelector((state) => state.employer);

  const handleClick = async () => {
    const response = await axiosInstance.post("/message/create", {
      id: candidate.userId._id,
    });
    if(response.data.success) {
        navigate(
          "/job-portal/employer/dashboard/messages/?user=" +
            candidate.userId._id
        );
        showSuccess(response.data.message);
    } else {
        showError(response.data.message || "Failed to send message");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white text-base tracking-wider rounded-md"
    >
      Message Me
    </button>
  );
}

export default MessageMe;

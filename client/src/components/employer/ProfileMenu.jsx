import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../../Redux/reducers/userReducer";
import { showError, showSuccess } from "./../../utils/toast";
import axiosInstance from "./../../utils/axios";
import { persistor } from "../../Redux/store/store";

function ProfileMenu({ drop, setDrop, from }) {
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			const response = await axiosInstance.post("/auth/logout");
			showSuccess(response?.data?.message);
			dispatch(clearUser());
			persistor.purge();
			navigate("/");
		} catch (error) {
			console.log(error);
			showError(error?.response?.data?.message);
		}
	};

	const handleDashboardBtn = () => {
		if (from === "employer") {
			navigate("/job-portal/employer/dashboard");
		} else if (from === "employee") {
			navigate("/job-portal/employee/dashboard");
		}
		setDrop(!drop);
	};

	return (
		<div className="grid gap-2 absolute top-16 right-10 bg-white px-3 py-3 border-1 shadow-md rounded-lg ">
			<button
				onClick={handleDashboardBtn}
				className="w-full tracking-wide text-[#673ab7] font-semibold border-1 p-2 rounded-lg hover:bg-[#ede7f6]">
				Dashboard
			</button>
			<button
				onClick={handleLogout}
				className="w-full tracking-wide text-[#673ab7] font-semibold border-1 p-2 rounded-lg hover:bg-[#ede7f6]">
				Logout
			</button>
		</div>
	);
}

export default ProfileMenu;

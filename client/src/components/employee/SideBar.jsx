import React, { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { IoMdClose } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { employeeLinks } from "../../utils/Links";
import axiosInstance from "../../utils/axios";
import { showError, showSuccess } from "../../utils/toast";
import { clearUser } from "../../Redux/reducers/userReducer";
import { persistor } from "../../Redux/store/store";
import { useDispatch } from "react-redux";

function SideBar({ value, setValue }) {
	const pathname = null;
	const navigate = useNavigate()
	const dispatch = useDispatch();

	
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

	return (
		<div
			className={`w-5/6 md:w-2/6 h-screen absolute top-2  bg-white transition-all ease-in-out duration-500 z-50 ${
				value ? "-left-[85%]" : "left-0 ps-5"
			}`}>
			<div className="flex flex-col gap-2">
				<div className="my-3 flex justify-between items-center">
					<h1 className=" antialiased tracking-wide  text-xl font-bold">
						JOB PORTAL
					</h1>
					<div
						onClick={() => setValue(true)}
						className="w-fit text-md font-medium border-2 border-slate-700 rounded-full p-1 cursor-pointer">
						<IoMdClose />
					</div>
				</div>
				{employeeLinks?.map((item) => (
					<NavLink
						className={` mt-2 flex items-center gap-4 px-3 py-2 font-semibold  ${
							pathname === item.path &&
							" scale-105 translate-x-1 bg-[#ede7f6] text-[#673ab7] border-1 "
						} transition ease-in-out duration-300 hover:bg-[#ede7f6] hover:text-[#673ab7] hover:font-semibold rounded-md`}
						to={item.path}
						key={item.text}
						onClick={() => setValue(true)}>
						<span className="text-lg">{item.icon}</span>
						<p className="capitalize antialiased text-md">
							{item.text}
						</p>
					</NavLink>
				))}
				<NavLink
					className="mt-2 flex items-center gap-4 px-3 py-2 font-semibold  
            hover:scale-105 hover:translate-x-1 border-1 
            transition ease-in-out duration-300 hover:bg-[#ede7f6] hover:text-[#673ab7] hover:font-semibold rounded-md">
					<span className="text-lg">
						<CiLogout />
					</span>
					<p
						onClick={handleLogout}
						className="capitalize antialiased text-md">
						Logout
					</p>
				</NavLink>
			</div>
		</div>
	);
}

export default SideBar;

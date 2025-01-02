import React, { useEffect } from "react";
import EmployerHomeBanner from "../../components/employer/EmployerHomeBanner";
import { useDispatch } from "react-redux";
import { getAllNotifications } from "../../apis/notificationApi";
import Home from "./Home";
import ProfileView from "./ProfileView";
import SideBar from "../../layouts/Layout";
function EmployerHome() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllNotifications());
	}, []);
	return (
		<div>
			<Home />
			{/* <ProfileView /> */}
		</div>
	);
}

export default EmployerHome;

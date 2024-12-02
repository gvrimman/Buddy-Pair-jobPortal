import React, { useEffect } from "react";
import EmployerHomeBanner from "../../components/employer/EmployerHomeBanner";
import { useDispatch } from "react-redux";
import { getAllNotifications } from "../../apis/notificationApi";
function EmployerHome() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllNotifications());
	}, []);
	return (
		<div>
			<EmployerHomeBanner />
		</div>
	);
}

export default EmployerHome;

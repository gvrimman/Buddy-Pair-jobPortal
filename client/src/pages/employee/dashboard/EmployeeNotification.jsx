import React, { useEffect } from "react";
import Notification from "../../../components/common/Notification";
import { useDispatch } from "react-redux";
import { getAllNotifications } from "../../../apis/notificationApi";

function EmployeeNotification() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllNotifications());
	}, []);

	return (
		<div className="h-screen">
			<Notification />
		</div>
	);
}

export default EmployeeNotification;

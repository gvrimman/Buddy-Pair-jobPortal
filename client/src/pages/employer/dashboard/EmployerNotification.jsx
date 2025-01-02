import React, { useEffect } from 'react'
import Notification from '../../../components/common/Notification';
import { getAllNotifications } from '../../../apis/notificationApi';
import { useDispatch } from 'react-redux';


function EmployerNotification() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllNotifications());
	}, []);
  return (
		<div className="h-screen max-w-[900px] w-full">
			<Notification />
		</div>
  );
}

export default EmployerNotification
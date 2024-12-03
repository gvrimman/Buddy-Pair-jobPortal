import React, { useEffect } from "react";
import HomeBanner from "../../components/employee/HomeBanner";
import { useDispatch } from "react-redux";
import { getAllNotifications } from "../../apis/notificationApi";
function Home() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllNotifications());
	}, []);
  
	return (
		<div>
			<HomeBanner />
		</div>
	);
}

export default Home;

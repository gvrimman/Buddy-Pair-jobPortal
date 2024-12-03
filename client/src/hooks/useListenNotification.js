import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../Redux/reducers/notificationReducer";

function useListenNotification() {
	const socket = useSelector((state) => state.socket.socket);
	const dispatch = useDispatch();

	useEffect(() => {
		if (socket) {
			if (socket.connected) {
				console.log("Socket connected, registering listener");
				socket.on("receiveNotification", handleNotification);
			} else {
				console.log("Waiting for socket connection...");
				socket.on("connect", () => {
					console.log("Socket connected, registering listener");
					socket.on("receiveNotification", handleNotification);
				});
			}

			function handleNotification(notification) {
				console.log("Notification received:", notification);
				dispatch(addNotification(notification));
			}

			return () => {
				console.log("Cleaning up listeners");
				socket.off("receiveNotification");
				socket.off("connect", handleNotification);
			};
		} else {
			console.error("Socket is undefined");
		}
	}, [socket, dispatch]);

	const sendNotifications = (receiverId, type, message, link) => {
		if (socket) {
			socket.emit("sendNotification", {
				receiverId,
				type,
				message,
				link,
			});
		}
	};

	return { sendNotifications };
}

export default useListenNotification;

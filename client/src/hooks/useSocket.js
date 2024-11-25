import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setSelectedUser } from "../Redux/reducers/chatReducer";
import {
	setSocket,
	setOnlineUsers,
	setSelected,
	resetSocket,
	selectSocket,
    selectOnlineUsers,
} from "../Redux/reducers/socketReducer";

export const useSocket = (userId) => {
	const dispatch = useDispatch();
	const socket = useSelector(selectSocket);
	const onlineUsers = useSelector(selectOnlineUsers);

	useEffect(() => {
		if (userId) {
			const newSocket = io(import.meta.env.VITE_API_URL, {
				query: { userId },
			});

			dispatch(setSocket(newSocket));

			newSocket.on("connect", () => {
				console.log("Connected to socket server");
			});

			newSocket.on("getOnlineUsers", (users) => {
				dispatch(setOnlineUsers(users));
			});

			return () => {
				newSocket.close();
				dispatch(resetSocket());
			};
		} else {
			if (socket) {
				socket.close();
				dispatch(resetSocket());
			}
		}
	}, [userId, dispatch]);

	const markOneMessageAsRead = useCallback(
		(message, userLists, messages) => {
			const user = userLists.find(
				(user) => user._id === message?.senderId
			);
			dispatch(setSelected(true));
			dispatch(setSelectedUser(user));
		},
		[dispatch]
	);

	const findEachUserUnreadMessages = useCallback((id, messages) => {
		return messages.filter((m) => m.senderId === id);
	}, []);

	return {
		socket,
		onlineUsers,
		markOneMessageAsRead,
		findEachUserUnreadMessages,
	};
};

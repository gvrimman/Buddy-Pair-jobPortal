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

export const useSocket = () => {
  const dispatch = useDispatch();
  const socket = useSelector(selectSocket);
  const onlineUsers = useSelector(selectOnlineUsers);

  useEffect(() => {
    // Initialize socket connection using cookies for authentication
    const newSocket = io(import.meta.env.VITE_API_URL, {
      withCredentials: true,
    });

    dispatch(setSocket(newSocket));

    newSocket.on("connect", () => {
      console.log("Connected to socket server");
    });

    newSocket.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });

    newSocket.on("connect_error", (error) => {
      if (newSocket.active) {
        console.log("[Server]: A temporary failure occoured. will reconnect.");
      } else {
        console.log("[Server]: An error occoured on connection ", error);
      }
    });

    newSocket.on("disconnect", (reason, details) => {
      console.log("[Server]: Disconnected...!");
      console.log("[Server]: reason: ", reason);
    });

    newSocket.onAny((eventname, ...args) => {
      console.log(`[Server]: Event triggered: ${eventname} `, ...args);
    });

    return () => {
      newSocket.close();
      dispatch(resetSocket());
    };
  }, [dispatch]);

  const markOneMessageAsRead = useCallback(
    (message, userLists, messages) => {
      const user = userLists.find((user) => user._id === message?.senderId);
      dispatch(setSelected(true));
      dispatch(setSelectedUser(user));
    },
    [dispatch]
  );

  return {
    socket,
    onlineUsers,
    markOneMessageAsRead,
  };
};

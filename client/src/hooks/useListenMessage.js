import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import IncomingMsgAlert from "/assets/sounds/message-long-pop.wav";
import { setChat, setUnreadMessages } from "../Redux/reducers/chatReducer";

function useListenMessage() {
  const socket = useSelector((state) => state.socket.socket);
  const { chats, selectedUser } = useSelector((state) => state.chat);
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      //Sending Message:
      socket?.on("newMessage", (newMessage) => {
        newMessage.shouldShake = true;
        if(selectedUser.userId === newMessage.senderId) {
          const audio = new Audio(IncomingMsgAlert);
          audio.play();
        }
        
        const isChatOpen =
          selectedUser.userId === newMessage.senderId ? true : false;
        if (isChatOpen) {
          dispatch(setChat(newMessage));
        }
      });

      // Setting Notification As Read or Unread:
      socket?.on("getNotification", (res) => {
        const isChatOpen = selectedUser?.userId === res.senderId ? true : false;
        if (!isChatOpen) {
          dispatch(setUnreadMessages(res));
        }
      });

      return () => {
        socket?.off("newMessage");
        socket?.off("getNotification");
      };
    }
  }, [socket, chats, selectedUser, isAuthenticated]);
}

export default useListenMessage;

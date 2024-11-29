import {
	fetchStart,
	fetchMessages,
	fetchChats,
	setChat,
	fetchError,
	fetchSuccess,
	markMessageAsRead,
	markAllMessageAsRead,
} from "../Redux/reducers/chatReducer";
import axiosInstance from "../utils/axios";
import { showError } from "../utils/toast";

export const getOtherUsers = () => async (dispatch) => {
	dispatch(fetchStart());

	try {
		const response = await axiosInstance.get("/message/chat/all");
		// console.log(response);
		dispatch(fetchSuccess(response?.data?.data));
	} catch (error) {
		dispatch(fetchError(error.message));
		showError(error?.response?.data?.message);
	}
};

export const getChats = (id) => async (dispatch) => {
	dispatch(fetchStart());

	try {
		const response = await axiosInstance.get(`/message/${id}`);
		dispatch(fetchChats(response?.data?.data));
	} catch (error) {
		dispatch(fetchError(error.message));
		showError(error?.response?.data?.message);
	}
};

export const setSendChat = (data) => async (dispatch) => {
	const { id, message, chatId, socket, user } = data;
	dispatch(fetchStart());
	try {
		socket.emit("sendMessage", { receiverId: id, chatId, content: message.trim() });
		dispatch(
      setChat({
        receiverId: id,
        senderId: user,
        chatRoom: chatId,
        message,
      })
    );
	} catch (error) {
		dispatch(fetchError(error.message));
		showError(error?.response?.data?.message);
	}
};

export const getUnreadUserMessages = (id) => async (dispatch) => {
	dispatch(fetchStart());
	try {
		const response = await axiosInstance.get(`/message/${id}/unread`);
		dispatch(fetchMessages(response?.data?.data));
	} catch (error) {
		dispatch(fetchError(error.message));
		showError(error?.response?.data?.message);
	}
};

export const markUserMessagesAsRead = (id) => async (dispatch) => {
	dispatch(fetchStart());
	try {
		const response = await axiosInstance.post(`/message/${id}/read`);
		dispatch(markMessageAsRead(response?.data?.data));
	} catch (error) {
		dispatch(fetchError(error.message));
		showError(error?.response?.data?.message);
	}
};

export const markAllUnreadMessages = () => async (dispatch) => {
	dispatch(fetchStart());
	try {
		const response = await axiosInstance.post(`/message/read`);
		dispatch(markAllMessageAsRead(response?.data?.data));
	} catch (error) {
		dispatch(fetchError(error.message));
		showError(error?.response?.data?.message);
	}
};

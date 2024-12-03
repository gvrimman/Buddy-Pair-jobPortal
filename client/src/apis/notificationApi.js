import {
	fetchError,
	fetchNotifications,
	fetchStart,
	markNotificationAsRead,
} from "../Redux/reducers/notificationReducer";
import axiosInstance from "./../utils/axios";
import { showSuccess, showError } from "./../utils/toast";

export const getAllNotifications = () => async (dispatch) => {
	dispatch(fetchStart());
	try {
		const response = await axiosInstance.get("/notification");
		dispatch(fetchNotifications(response?.data?.data));
	} catch (error) {
		dispatch(fetchError(error?.response?.data?.message));
		showError(error?.response?.data?.message);
	}
};

export const markAsReadNotification = (id) => async (dispatch) => {
	dispatch(fetchStart());
	try {
		const response = await axiosInstance.put(
			`/notification/mark-read/${id}`
		);
		dispatch(markNotificationAsRead(id));
	} catch (error) {
		dispatch(fetchError(error?.response?.data?.message));
		showError(error?.response?.data?.message);
	}
};

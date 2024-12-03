import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false,
	notifications: [],
	unreadCount: 0,
	error: null,
};

const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		fetchStart: (state) => {
			state.isLoading = true;
			state.error = null;
		},
		fetchNotifications: (state, action) => {
			state.isLoading = false;
			state.notifications = action.payload;
			state.unreadCount = action.payload.filter((n) => !n.isRead).length;
		},
		addNotification: (state, action) => {
			state.isLoading = false;
			state.notifications = [...state.notifications, action.payload];
			state.unreadCount = state.unreadCount + 1;
		},
		markNotificationAsRead: (state, action) => {
			state.isLoading = false;
			state.notifications = state.notifications.map((n) => {
				if (n._id === action.payload && !n.isRead) {
					n.isRead = true;
					state.unreadCount -= 1;
				}
				return n;
			});
		},
		fetchError: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const {
	fetchStart,
	fetchNotifications,
	addNotification,
	markNotificationAsRead,
	fetchError,
} = notificationSlice.actions;
export default notificationSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false,
	success: false,
	userLists: null,
	messages: [],
	chats: null,
	selectedUser: null,
	error: null,
};

const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		fetchStart: (state) => {
			state.isLoading = true;
			state.error = null;
		},
		fetchSuccess: (state, action) => {
			state.isLoading = false;
			state.success = true;
			state.userLists = action.payload;
		},
		fetchChats: (state, action) => {
			state.isLoading = false;
			state.chats = action.payload;
		},
		setChat: (state, action) => {
			state.isLoading = false;
			state.chats = [...state.chats, action.payload];
		},
		fetchMessages: (state, action) => {
			// unread messages
			state.isLoading = false;
			state.messages = action.payload;
		},
		setUnreadMessages: (state, action) => {
			const { _id, read } = action.payload;
			if (!read) {
				const messageExist = state.messages.some((n) => n._id === _id);
				if (!messageExist) {
					state.messages = [...state.messages, action.payload];
				}
			}
		},
		markMessageAsRead: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload;
		},
		markAllMessageAsRead: (state, action) => {
			state.isLoading = false;
			state.messages = [];
		},
		setSelectedUser: (state, action) => {
			state.isLoading = false;
			state.selectedUser = action.payload;
		},
		setSendChatMessage: (state, action) => {
			state.chats = action.payload;
		},
		fetchError: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const {
	setChat,
	fetchStart,
	fetchSuccess,
	fetchError,
	fetchChats,
	fetchMessages,
	setSelectedUser,
	markMessageAsRead,
	markAllMessageAsRead,
	setSendChatMessage,
	setUnreadMessages,
} = chatSlice.actions;
export default chatSlice.reducer;

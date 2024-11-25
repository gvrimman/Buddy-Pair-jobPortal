import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	socket: null,
	onlineUsers: [],
	selected: false,
};

const socketSlice = createSlice({
	name: "socket",
	initialState,
	reducers: {
		setSocket: (state, action) => {
			state.socket = action.payload;
		},
		setOnlineUsers: (state, action) => {
			state.onlineUsers = action.payload;
		},
		setSelected: (state, action) => {
			state.selected = action.payload;
		},
		resetSocket: (state) => {
			state.socket = null;
			state.onlineUsers = [];
			state.selected = false;
		},
	},
});

export const { setSocket, setOnlineUsers, setSelected, resetSocket } =
	socketSlice.actions;
export default socketSlice.reducer;

// Selectors
export const selectSocket = (state) => state.socket.socket;
export const selectOnlineUsers = (state) => state.socket.onlineUsers;
export const selectIsSelected = (state) => state.socket.selected;

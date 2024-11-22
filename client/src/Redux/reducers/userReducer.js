import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userInfo: null,
	isAuthenticated: false,
	isLoading : false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.isLoading = true;
			state.userInfo = action.payload;
			state.isAuthenticated = true;
			state.isLoading = false;
		},
		clearUser: (state, action) => {
			state.isLoading = true;
			state.userInfo = null;
			state.isAuthenticated = false;
			state.isLoading = false;
		},
		updateUserInfo:(state, action) => {
			state.isLoading = true;
			state.userInfo = action.payload
			state.isLoading = false
		}
	},
});

export const { setUser, clearUser, updateUserInfo } = userSlice.actions;

export default userSlice.reducer;

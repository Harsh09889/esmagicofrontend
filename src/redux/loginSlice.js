import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentLoggedInUser: null,
	isAuthenticated: false,
	isAdmin: false,
	isLoading: false,
	error: null,
};

const loginSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		loginSuccess(state, action) {
			state.currentLoggedInUser = action.payload.user;
			state.isAuthenticated = true;
			state.isAdmin = action.payload.isAdmin;
			state.isLoading = false;
			state.error = null;
		},
		loginPending(state, action) {
			state.currentLoggedInUser = null;
			state.isAuthenticated = false;
			state.isAdmin = false;
			state.isLoading = true;
			state.error = null;
		},
		loginFailure(state, action) {
			state.currentLoggedInUser = null;
			state.isAuthenticated = false;
			state.isAdmin = false;
			state.isLoading = true;
			state.error = action.payload.error;
		},
		logout(state) {
			state.currentLoggedInUser = null;
			state.isAuthenticated = false;
			state.isAdmin = false;
			state.isLoading = false;
			state.error = null;
		},
	},
});

export const { loginFailure, logout, loginPending, loginSuccess } =
	loginSlice.actions;
export default loginSlice.reducer;

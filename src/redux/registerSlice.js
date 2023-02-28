import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isSuccess: false,
	isLoading: false,
	error: null,
};

const registerSlice = createSlice({
	name: "register",
	initialState,
	reducers: {
		registerSuccess(state, action) {
			state.isSuccess = true;
			state.isLoading = false;
			state.error = null;
		},
		registerPending(state, action) {
			state.isSuccess = false;
			state.isLoading = true;
			state.error = null;
		},
		registerFailure(state, action) {
			state.isSuccess = false;
			state.isLoading = false;
			state.error = action.payload.error;
		},
		registerReset(state) {
			state.isSuccess = false;
			state.isLoading = false;
			state.error = null;
		},
	},
});

export const {
	registerFailure,
	registerReset,
	registerPending,
	registerSuccess,
} = registerSlice.actions;
export default registerSlice.reducer;

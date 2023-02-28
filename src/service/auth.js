import { loginFailure, loginPending, loginSuccess } from "../redux/loginSlice";
import {
	registerFailure,
	registerPending,
	registerSuccess,
} from "../redux/registerSlice";
import { API } from "./api";

export function loginUser(loginDetails) {
	return async function (dispatch, getState) {
		dispatch(loginPending());
		try {
			const { data } = await API.userLogin(loginDetails);
			sessionStorage.setItem("accessToken", data.token);
			sessionStorage.setItem("refreshToken", data.refreshToken);
			dispatch(loginSuccess({ user: data.user }));
		} catch (error) {
			dispatch(loginFailure());
		}
	};
}
export function getLoggedInUserFunction() {
	return async function (dispatch, getState) {
		dispatch(loginPending());
		try {
			const { data } = await API.getLoggedInUser();
			dispatch(loginSuccess({ user: data }));
		} catch (error) {
			dispatch(loginFailure());
		}
	};
}
export function loginAdmin(loginDetails) {
	return async function (dispatch, getState) {
		dispatch(loginPending());
		try {
			const { data } = await API.adminLogin(loginDetails);
			sessionStorage.setItem("accessToken", data.token);
			sessionStorage.setItem("refreshToken", data.refreshToken);
			dispatch(loginSuccess({ user: data.user }));
		} catch (error) {
			dispatch(loginFailure());
		}
	};
}

export function userSignup(signupDetails) {
	console.log(API);
	return async function (dispatch, getState) {
		dispatch(registerPending());
		try {
			const { data } = await API.userSignup(signupDetails);
			dispatch(registerSuccess({ user: data }));
		} catch (error) {
			dispatch(registerFailure({ error: error.message }));
		}
	};
}

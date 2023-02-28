import axios from "axios";
import { BASE_URL, SERVICE_URLS } from "../constants/config.js";
import jwtDecode from "jwt-decode";
import { differenceInMilliseconds, getUnixTime } from "date-fns";

const API_URL = BASE_URL;
const API = {};

export const axiosInstance = axios.create({
	baseURL: API_URL,
	withCredentials: true,
	timeout: 10000,
});

axiosInstance.interceptors.request.use(
	async function (config) {
		const token = sessionStorage.getItem("accessToken");

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
			const user = jwtDecode(token);
			const isExpired =
				differenceInMilliseconds(user.exp, getUnixTime(Date.now())) < 1;

			if (!isExpired) return config;

			sessionStorage.removeItem("accessToken");
			const refreshToken = sessionStorage.getItem("refreshToken");
			const response = await API.tokenRefresh({ refreshToken });

			const accessToken = response.data.accessToken;

			sessionStorage.setItem("accessToken", accessToken);
			config.headers.Authorization = `Bearer ${accessToken}`;

			return config;
		}

		return config;
	},

	function (error) {
		return Promise.reject(error);
	}
);

for (const [key, value] of Object.entries(SERVICE_URLS)) {
	API[key] = async (body, showUploadProgress, showDownloadProgress) => {
		return await axiosInstance({
			method: value.method,
			url: value.url,
			data: body,
			responseType: value?.responseType,

			onUploadProgress: function (progressEvent) {
				if (showUploadProgress) {
					let percentageCompleted = Math.round(
						(progressEvent.loaded * 100) / progressEvent.total
					);
					showUploadProgress(percentageCompleted);
				}
			},

			onDownloadProgress: function (progressEvent) {
				if (showDownloadProgress) {
					let percentageCompleted = Math.round(
						(progressEvent.loaded * 100) / progressEvent.total
					);
					showDownloadProgress(percentageCompleted);
				}
			},
		});
	};
}

///////////////////////////////////////////////////////
//if success -> return { isSuccess:true, data:Object }
//if failure -> return { isFailure:true, status:String, msg:string, code:int }
//////////////////////////////////////////////////////

export { API };

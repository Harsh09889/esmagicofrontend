export const BASE_URL = process.env.REACT_APP_BASE_URL;

//DEMO service call -> { url:'/', method:'POST/DELETE/GET/PUT/', params:true/false, query:true/false }
export const SERVICE_URLS = {
	userSignup: { url: "/auth/signup", method: "POST" },
	userLogin: { url: "/auth/login/user", method: "POST" },
	adminLogin: { url: "/auth/login/admin", method: "POST" },
	tokenRefresh: { url: "/auth/token/refresh", method: "POST" },
	checkAuth: { url: "/users/checkauthentication", method: "GET" },
	getLoggedInUser: { url: "/users/get/loggedinuser", method: "GET" },
	getAllUsers: { url: "/users/", method: "GET" },
};

import { configureStore } from "@reduxjs/toolkit";
import login from "./loginSlice.js";
import register from "./registerSlice.js";

const reducer = {
	login,
	register,
};

const store = configureStore({ reducer });
export default store;

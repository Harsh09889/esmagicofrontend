import React from "react";
import { useSelector } from "react-redux";
import AdminPanel from "../components/admin/AdminPanel";
import UserPanel from "../components/user/UserPanel";
import Navbar from "../components/Navbar";
function Panel() {
	const role = useSelector((state) => state.login.currentLoggedInUser.role);
	const isAdmin = role === "admin" ? true : false;

	return (
		<>
			<Navbar />
			<div>{isAdmin ? <AdminPanel /> : <UserPanel />}</div>;
		</>
	);
}

export default Panel;

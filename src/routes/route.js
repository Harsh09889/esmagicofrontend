import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Panel from "../pages/Panel";

const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const Homepage = lazy(() => import("../pages/Homepage"));
const UserSignup = lazy(() => import("../components/user/UserSignup"));
const AdminSignup = lazy(() => import("../components/admin/AdminSignup"));
const AdminLogin = lazy(() => import("../components/admin/AdminLogin"));
const UserLogin = lazy(() => import("../components/user/UserLogin"));

function IfLoggedIn() {
	const user = useSelector((state) => state.login.currentLoggedInUser);
	return user ? <Outlet /> : <Navigate to={"/auth/user"} />;
}

function IfLoggedOut() {
	const user = useSelector((state) => state.login.currentLoggedInUser);

	return !user ? <Outlet /> : <Navigate to={"/panel"} />;
}

function MainRoute() {
	// const user = useSelector((state) => state.login.currentLoggedInUser);

	useEffect(() => {}, []);

	return (
		<Routes>
			<Route
				path='/'
				element={
					<Suspense fallback={"Loading..."}>
						<Homepage />
					</Suspense>
				}
			/>
			<Route
				path='/panel'
				element={<IfLoggedIn />}>
				<Route
					path=''
					element={<Panel />}
				/>
			</Route>
			<Route
				path='/auth'
				element={<IfLoggedOut />}>
				<Route
					path=''
					element={
						<Suspense fallback={"Loading..."}>
							<Login />
						</Suspense>
					}>
					<Route
						path='user'
						element={
							<Suspense fallback={"Loading..."}>
								<UserLogin />
							</Suspense>
						}
					/>
					<Route
						path='admin'
						element={
							<Suspense fallback={"Loading..."}>
								<AdminLogin />
							</Suspense>
						}
					/>
				</Route>
				<Route
					path='signup'
					element={
						<Suspense fallback={"Loading..."}>
							<Signup />
						</Suspense>
					}>
					<Route
						path='admin'
						element={
							<Suspense fallback={"Loading..."}>
								<AdminSignup />
							</Suspense>
						}
					/>
					<Route
						path='user'
						element={
							<Suspense fallback={"Loading..."}>
								<UserSignup />
							</Suspense>
						}
					/>
				</Route>
			</Route>

			<Route
				path='/login'
				element={
					<Suspense fallback={"Loading..."}>
						<Login />
					</Suspense>
				}
			/>
			<Route
				path='/signup'
				element={
					<Suspense fallback={"Loading..."}>
						<Signup />
					</Suspense>
				}
			/>
		</Routes>
	);
}

export default MainRoute;

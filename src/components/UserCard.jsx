import {
	Card,
	CardHeader,
	CardBody,
	Typography,
	Radio,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { API, axiosInstance } from "../service/api";

export default function UserCard({ user, isAdmin, setUsers }) {
	const [role, setRole] = useState(user.role);

	function handleChange(e) {
		setRole((p) => {
			if (p === "user") return "admin";
			return "user";
		});
	}

	useEffect(() => {
		(async () => {
			// eslint-disable-next-line
			const { data: p } = await axiosInstance.put(`/users/${user._id}`, {
				role,
			});
			const { data } = await API.getAllUsers();
			setUsers(data);
		})();
		// eslint-disable-next-line
	}, [role]);

	return (
		<div className='flex justify-center pt-16'>
			<Card className='w-96'>
				<CardHeader
					floated={false}
					className='h-80'>
					<img
						className='h-full object-cover'
						src='https://img.freepik.com/free-photo/blue-user-icon-symbol-website-admin-social-login-element-concept-white-background-3d-rendering_56104-1217.jpg?w=1380&t=st=1677588623~exp=1677589223~hmac=f3a199a4be95a2a4a0e202cb94cb814e5a04023907e1459fc1444e234e9e16d1'
						alt='profile'
					/>
				</CardHeader>
				<CardBody className='text-center'>
					<Typography
						variant='h4'
						color='blue-gray'
						className='mb-2'>
						{user.name}
					</Typography>
					<Typography
						color='blue'
						className='font-medium capitalize'
						textGradient>
						Role : {user.role}
					</Typography>
					<Typography
						className='font-medium text-black'
						textGradient>
						Username : {user.username}
					</Typography>
					<Typography
						className='font-medium text-black'
						textGradient>
						Email : {user.email}
					</Typography>
				</CardBody>
				{isAdmin && (
					<div className='flex gap-10'>
						<Radio
							id='user'
							name={`${user._id}role`}
							label='User'
							value={"user"}
							checked={role === "user"}
							onChange={handleChange}
						/>
						<Radio
							id='admin'
							name={`${user._id}role`}
							label='Admin'
							value='admin'
							checked={role === "admin"}
							onChange={handleChange}
						/>
					</div>
				)}
			</Card>
		</div>
	);
}

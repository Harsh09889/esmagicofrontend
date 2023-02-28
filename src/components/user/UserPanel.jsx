import {
	Card,
	CardHeader,
	CardBody,
	Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import UpdateProfileModal from "./../UpdateProfileModal";

export default function UserPanel() {
	const user = useSelector((s) => s.login.currentLoggedInUser);
	const [showModal, setShowModal] = useState(false);
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
					<UpdateProfileModal
						open={showModal}
						setOpen={setShowModal}
						id={user._id}
					/>
				</CardBody>
			</Card>
		</div>
	);
}

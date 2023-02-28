import { Fragment, useState } from "react";
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Typography,
	CardFooter,
	Checkbox,
	Input,
	CardBody,
	CardHeader,
	Card,
} from "@material-tailwind/react";
import { API, axiosInstance } from "../service/api";
import { useDispatch } from "react-redux";
import { getLoggedInUserFunction } from "../service/auth";

export default function Example({ open, setOpen, id }) {
	// const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(!open);
	const initState = {
		name: "",
		username: "",
		email: "",
	};
	const [profile, setProfile] = useState(initState);
	const dispatch = useDispatch();

	const handleUpdate = async () => {
		const { data: p } = await axiosInstance.put(`/users/${id}`, {
			...profile,
		});
		dispatch(getLoggedInUserFunction());
	};
	const handleChange = (e) => {
		setProfile((p) => ({ ...p, [e.target.name]: e.target.value }));
	};

	return (
		<Fragment>
			<Button
				onClick={handleOpen}
				className='mt-4'
				variant='gradient'>
				Update Profile
			</Button>
			<Dialog
				open={open}
				handler={handleOpen}>
				<DialogBody divider>
					<Card className='w-96 mx-auto'>
						<CardHeader
							variant='gradient'
							color='blue'
							className='mb-4 grid h-28 place-items-center'>
							<Typography
								variant='h3'
								color='white'>
								Update Profile
							</Typography>
						</CardHeader>
						<CardBody className='flex flex-col gap-4'>
							<Input
								label='Name'
								size='lg'
								name='name'
								value={profile.name}
								onChange={handleChange}
							/>
							<Input
								label='Username'
								size='lg'
								name='username'
								value={profile.username}
								onChange={handleChange}
							/>
							<Input
								label='Email'
								size='lg'
								name='email'
								value={profile.email}
								onChange={handleChange}
							/>
						</CardBody>
					</Card>
				</DialogBody>
				<DialogFooter>
					<Button
						variant='text'
						color='red'
						onClick={(e) => {
							setProfile(initState);
							handleOpen();
						}}
						className='mr-1'>
						<span>Cancel</span>
					</Button>
					<Button
						variant='gradient'
						color='green'
						onClick={async (e) => {
							await handleUpdate();
							handleOpen();
						}}>
						<span>Confirm</span>
					</Button>
				</DialogFooter>
			</Dialog>
		</Fragment>
	);
}

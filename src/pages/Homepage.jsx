import React from "react";
import Navbar from "../components/Navbar";
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Button,
} from "@material-tailwind/react";

import { Link } from "react-router-dom";

function Homepage() {
	return (
		<div>
			<Navbar />
			<div className='flex flex-col md:flex-row items-center  py-8 justify-center gap-8'>
				<div>
					<Card className='w-full max-w-[26rem] aspect-square  shadow-lg'>
						<CardHeader
							floated={false}
							color='blue-gray'>
							<img
								src='admin.png'
								alt='ui/ux review check'
							/>
							<div className='to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 ' />
						</CardHeader>
						<CardBody>
							<div className='mb-3 flex items-center justify-center'>
								<Typography
									variant='h2'
									color='blue-gray'
									className='text-center font-medium'>
									Continue as an Admin
								</Typography>
							</div>
						</CardBody>
						<CardFooter className=''>
							<Link to={"/auth/admin"}>
								<Button
									size='lg'
									fullWidth={true}>
									Admin Login
								</Button>
							</Link>
						</CardFooter>
					</Card>
				</div>
				<div>
					<Card className='w-full max-w-[26rem] aspect-square  shadow-lg'>
						<CardHeader
							floated={false}
							color='blue-gray'>
							<img
								src='user.png'
								alt='ui/ux review check'
							/>
							<div className='to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 ' />
						</CardHeader>
						<CardBody>
							<div className='mb-3 flex items-center justify-center'>
								<Typography
									variant='h2'
									color='blue-gray'
									className='text-center font-medium'>
									Continue as a User
								</Typography>
							</div>
						</CardBody>
						<CardFooter className=''>
							<Link to={"auth/user"}>
								<Button
									size='lg'
									fullWidth={true}>
									User Login
								</Button>
							</Link>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
}

export default Homepage;

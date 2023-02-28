import { Input } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { API } from "../../service/api";
import UserCard from "./../UserCard";

function AdminPanel() {
	const [users, setUsers] = useState([]);
	const [search, setSearch] = useState("");
	const [searchedUsers, setSearchedUsers] = useState([]);
	const searchRef = useRef(null);

	useEffect(() => {
		(async () => {
			const { data } = await API.getAllUsers();
			setUsers(data);
		})();
	}, []);

	useEffect(() => {
		if (searchRef.current) clearTimeout(searchRef.current);
		searchRef.current = setTimeout(() => {
			if (search.trim()) {
				console.log("called");
				const result = users.filter(
					(user) => user.name.includes(search) || user.email.includes(search)
				);
				setSearchedUsers(result);
			} else {
				setSearchedUsers([]);
			}
		}, 1000);
		// eslint-disable-next-line
	}, [search]);

	return (
		<>
			<div className='flex flex-col w-[80%] mx-auto mt-8 items-end gap-6'>
				<Input
					size='lg'
					label='Search For users'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			{searchedUsers.length ? (
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
					{searchedUsers.map((user) => (
						<UserCard
							key={user._id}
							user={user}
							isAdmin={true}
							setUsers={setUsers}
						/>
					))}
				</div>
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
					{users.map((user) => (
						<UserCard
							key={user._id}
							user={user}
							isAdmin={true}
							setUsers={setUsers}
						/>
					))}
				</div>
			)}
		</>
	);
}

export default AdminPanel;

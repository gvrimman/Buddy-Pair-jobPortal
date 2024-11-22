import React from "react";
import TableBody from "../TableBody";
import TableHead from "../TableHead";
import { useDispatch, useSelector } from "react-redux";
import { deleteBookmarkedJob } from "../../../../apis/employeeApi";
import { TbLoader2 } from "react-icons/tb";

function BookMarked() {
	const { bookmarkedJobs, isLoading } = useSelector(
		(state) => state.employee
	);

	const dispatch = useDispatch();
	const handleDelete = (id) => {
		dispatch(deleteBookmarkedJob(id));
	};

	return (
		<div className="bg-white p-4 grid gap-4 rounded-md shadow">
			<h1 className="text-xl font-semibold tracking-wider">
				BookMarked Jobs
			</h1>
			<table>
				<div
					className={`fixed inset-0  bg-gray-500 opacity-30 transition  ${
						isLoading ? "block" : "hidden"
					}`}></div>
				<span
					className={`text-purple-900 text-2xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ${
						isLoading ? "block" : "hidden"
					} `}>
					<TbLoader2 className="animate-spin" />
				</span>
				<thead className="bg-blue-100 text-blue-500">
					<TableHead />
				</thead>
				<tbody>
					{bookmarkedJobs?.map((job, index) => (
						<TableBody
							key={index}
							job={job}
							handleDelete={handleDelete}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default BookMarked;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TableBody from "../TableBody";
import TableHead from "../TableHead";
import { deleteAAppiedJob } from "../../../../apis/employeeApi";
import { TbLoader2 } from "react-icons/tb";

function AppliedTable() {
	const { appliedJobs, isLoading } = useSelector((state) => state.employee);

	const dispatch = useDispatch();
	const handleDelete = (id) => {
		dispatch(deleteAAppiedJob(id));
	};

	return (
		<div className="bg-white p-4 grid gap-4 rounded-md shadow">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold tracking-wider">
					Applied Jobs
				</h1>
				<p className="font-semibold">
					You have applied for {appliedJobs?.length} jobs
				</p>
			</div>
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
					{appliedJobs?.length === 0 ? (
						<p className="center font-semibold my-5 w-full">No jobs applied yet</p>
					) : (
						appliedJobs?.map((job, index) => (
							<TableBody
								key={index}
								job={job}
								handleDelete={handleDelete}
							/>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}

export default AppliedTable;

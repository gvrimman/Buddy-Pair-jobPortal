import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TableBody from "../TableBody";
import TableHead from "../TableHead";
import { deleteAAppiedJob } from "../../../../apis/employeeApi";
import { TbLoader2 } from "react-icons/tb";
import { getAppliedJobs } from "../../../../Redux/reducers/employeeReducer";
import Pagination from "../../../common/Pagination";
import SkeltonList from "../../../message/sidebar/SkeltonList";

function AppliedTable() {
	const { appliedJobs, isLoading, pagination } = useSelector(
		(state) => state.employee
	);
	const dispatch = useDispatch();

	const handleDelete = (id) => {
		dispatch(deleteAAppiedJob(id));
	};

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(5);

	useEffect(() => {
		dispatch(getAppliedJobs(currentPage, itemsPerPage));
	}, [dispatch, currentPage, itemsPerPage]);

	return (
		<div className="bg-white p-4 grid gap-4 rounded-md shadow">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold tracking-wider">
					Applied Jobs
				</h1>
				<p className="font-semibold">
					You have applied for {pagination?.totalApplied} jobs
				</p>
			</div>
			<table>
				<thead className="bg-blue-100 text-blue-500">
					<TableHead />
				</thead>
				<tbody>
					{isLoading ? (
						<tr>
							<td colSpan="100%">
								<SkeltonList/>
							</td>
						</tr>
					) : appliedJobs?.length === 0 ? (
						<p className="center font-semibold my-5 w-full">
							No jobs applied yet
						</p>
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
			<Pagination
				pagination={pagination}
				setCurrentPage={setCurrentPage}
			/>
		</div>
	);
}

export default AppliedTable;

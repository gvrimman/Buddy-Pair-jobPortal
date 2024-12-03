import React, { useEffect, useState } from "react";
import TableBody from "../TableBody";
import TableHead from "../TableHead";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteBookmarkedJob,
	getBookmarkedJobs,
} from "../../../../apis/employeeApi";
import { TbLoader2 } from "react-icons/tb";
import Pagination from "../../../common/Pagination";
import SkeltonList from "../../../message/sidebar/SkeltonList";

function BookMarked() {
	const { bookmarkedJobs, isLoading, pagination } = useSelector(
		(state) => state.employee
	);
	const dispatch = useDispatch();

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(5);

	const handleDelete = async (id) => {
		await dispatch(deleteBookmarkedJob(id));
		await dispatch(getBookmarkedJobs(currentPage, itemsPerPage));
	};

	useEffect(() => {
		dispatch(getBookmarkedJobs(currentPage, itemsPerPage));
	}, [dispatch, currentPage, itemsPerPage]);

	return (
		<div className="bg-white p-4 grid gap-4 rounded-md shadow">
			<div className="flex items-center justify-between">
				{" "}
				<h1 className="text-xl font-semibold tracking-wider">
					BookMarked Jobs
				</h1>
				<p className="font-semibold">
					You have {pagination?.totalBookmarked} bookmarked {""}
					jobs
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
								<SkeltonList />
							</td>
						</tr>
					) : bookmarkedJobs?.length === 0 ? (
						<p className="center font-semibold my-5 w-full">
							No bookmarked jobs
						</p>
					) : (
						bookmarkedJobs?.map((job, index) => (
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

export default BookMarked;

import React, { useEffect, useState } from "react";

import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";

import companylogo from "/assets/images/upworklogo.png";
import CommentButtons from "../../../common/CommentButtons";
import axiosInstance from "./../../../../utils/axios";
import DialogModal from "../../../common/DialogModal";
import SingleJob from "./SingleJob";
import { useNavigate } from "react-router-dom";
import { deleteAJob, getPostedJobs } from "../../../../apis/employerApi";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../common/Pagination";

function ManageTable() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { jobs, isLoading, pagination } = useSelector(
		(store) => store.employer
	);

	const [selectedJob, setSelectedJob] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(5);
	const tableHead = [
		"Title",
		"Applications",
		"Selected",
		"Created & Expired",
		"Status",
		"Action",
	];

	const [jobViewModalOpen, setJobViewModalOpen] = useState(false);

	useEffect(() => {
		dispatch(getPostedJobs(currentPage, itemsPerPage));
	}, [dispatch, currentPage, itemsPerPage]);

	// delete a job
	const handleDelete = async (jobId) => {
		await dispatch(deleteAJob(jobId));
		await dispatch(getPostedJobs(currentPage, itemsPerPage));
	};

	console.log(pagination);

	// const handlePageChange = (newPage) => {
	// 	setCurrentPage(newPage);
	// 	window.scrollTo(0, 0);
	// };

	// Pagination component
	// const Pagination = ({ pagination }) => {
	// 	if (!pagination) return null;

	// 	const { currentPage, totalPages, hasNext, hasPrev } = pagination;

	// 	return (
	// 		<div className="flex justify-center items-center gap-2 mt-4 mb-8">
	// 			<button
	// 				onClick={() => handlePageChange(currentPage - 1)}
	// 				disabled={!hasPrev}
	// 				className={`px-3 py-1 rounded ${
	// 					!hasPrev
	// 						? "bg-gray-200 cursor-not-allowed"
	// 						: "bg-blue-500 text-white hover:bg-blue-600"
	// 				}`}>
	// 				<span>&laquo;</span>
	// 			</button>

	// 			{[...Array(totalPages)].map((_, index) => {
	// 				const pageNumber = index + 1;
	// 				// Show current page, first page, last page, and one page before and after current
	// 				if (
	// 					pageNumber === 1 ||
	// 					pageNumber === totalPages ||
	// 					(pageNumber >= currentPage - 1 &&
	// 						pageNumber <= currentPage + 1)
	// 				) {
	// 					return (
	// 						<button
	// 							key={pageNumber}
	// 							onClick={() => handlePageChange(pageNumber)}
	// 							className={`px-3 py-1 rounded ${
	// 								currentPage === pageNumber
	// 									? "bg-blue-500 text-white"
	// 									: "bg-gray-200 hover:bg-gray-300"
	// 							}`}>
	// 							{pageNumber}
	// 						</button>
	// 					);
	// 				}
	// 				// Show dots for skipped pages
	// 				if (
	// 					pageNumber === currentPage - 2 ||
	// 					pageNumber === currentPage + 2
	// 				) {
	// 					return <span key={pageNumber}>...</span>;
	// 				}
	// 				return null;
	// 			})}

	// 			<button
	// 				onClick={() => handlePageChange(currentPage + 1)}
	// 				disabled={!hasNext}
	// 				className={`px-3 py-1 rounded ${
	// 					!hasNext
	// 						? "bg-gray-200 cursor-not-allowed"
	// 						: "bg-blue-500 text-white hover:bg-blue-600"
	// 				}`}>
	// 				<span>&raquo;</span>
	// 			</button>
	// 		</div>
	// 	);
	// };

	if (isLoading) {
		return <div className="text-center py-4">Loading...</div>;
	}

	return (
		<>
			<table className="w-max lg:w-full capitalize ">
				<thead>
					<tr className="bg-customBgColor text-center text-blue-500 text-sm font-semibold">
						{tableHead.map((item, index) => (
							<th
								key={index}
								className={`px-3 py-3 ${
									index === 0 ? "text-start" : ""
								}`}>
								{item}
							</th>
						))}
					</tr>
				</thead>
				<tbody className="overflow-x-auto custom-scrollbar">
					{jobs?.length === 0 ? (
						<tr>
							<td colSpan={6} className="text-center py-4">
								No jobs found
							</td>
						</tr>
					) : (
						jobs?.map((job, index) => (
							<tr key={index} className="text-sm text-center">
								<td className="ps-3 py-3 flex gap-2">
									{/* <img
								width={45}
								height={45}
								src={
									employerInfo?.companylogo
										? employerInfo.companylogo
										: companylogo
								}
								alt="company-logo"
							/> */}
									<p className="mt-1 font-semibold">
										{job?.jobTitle}
									</p>
								</td>
								<td
									onClick={() =>
										navigate(
											`/job-portal/employer/dashboard/job-applicants/${job._id}`
										)
									}
									className="py-3 text-blue-600 font-semibold underline cursor-pointer">
									{job?.applicants?.length} Applied
								</td>
								<td>{job?.shortListed?.length}</td>
								<td className="py-3">
									<p>{job.createdAt}</p>
									<p>{job.expiredAt}</p>
								</td>
								<td
									className={`py-3 font-semibold ${
										job?.status
											? "text-green-500"
											: "text-red-500"
									}`}>
									{job?.status}
								</td>
								<td className="pr-2 py-3 flex justify-center gap-2">
									<div
										onClick={() => {
											setSelectedJob(job);
											setJobViewModalOpen(
												!jobViewModalOpen
											);
										}}>
										<CommentButtons
											icon={<IoEyeOutline />}
											text={"View Application"}
										/>
										<DialogModal isOpen={jobViewModalOpen}>
											<SingleJob
												data={selectedJob}
												setJobViewModalOpen={
													setJobViewModalOpen
												}
											/>
										</DialogModal>
									</div>

									<div
										onClick={() =>
											navigate(
												`/job-portal/employer/dashboard/edit-job/${job._id}`
											)
										}>
										<CommentButtons
											icon={<MdOutlineModeEdit />}
											text={"Edit Application"}
										/>
									</div>
									<div
										onClick={() => {
											handleDelete(job._id);
										}}>
										<CommentButtons
											icon={<MdOutlineDeleteOutline />}
											text={"Delete Application"}
										/>
									</div>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
			<Pagination
				pagination={pagination}
				setCurrentPage={setCurrentPage}
			/>
		</>
	);
}

export default ManageTable;

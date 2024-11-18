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

function ManageTable() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { jobs, isLoading } = useSelector((store) => store.employer);
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
		dispatch(getPostedJobs());
	}, [dispatch]);

	// delete a job
	const handleDelete = (jobId) => {
		dispatch(deleteAJob(jobId));
	};

	return (
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
				{jobs?.map((job, index) => (
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
						<td className="py-3 text-blue-600 font-semibold underline cursor-pointer">
							{job?.applicants?.length} Applied
						</td>
						<td>{job?.shortListed?.length}</td>
						<td className="py-3">
							<p>{job.createdAt}</p>
							<p>{job.expiredAt}</p>
						</td>
						<td
							className={`py-3 font-semibold ${
								job?.status ? "text-green-500" : "text-red-500"
							}`}>
							{job?.status}
						</td>
						<td className="pr-2 py-3 flex justify-center gap-2">
							<div
								onClick={() => {
									setJobViewModalOpen(!jobViewModalOpen);
								}}>
								<CommentButtons
									icon={<IoEyeOutline />}
									text={"View Application"}
								/>
								<DialogModal isOpen={jobViewModalOpen}>
									<SingleJob
										data={job}
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
				))}
			</tbody>
		</table>
	);
}

export default ManageTable;

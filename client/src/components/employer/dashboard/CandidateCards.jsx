import React from "react";

import { CiLocationOn } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { IoCheckmarkOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import CommentButtons from "../../common/CommentButtons";
import { useDispatch, useSelector } from "react-redux";
import { TbLoader2 } from "react-icons/tb";
import {
	acceptAJob,
	getAcceptedJobs,
	getRejectedJobs,
	rejectAJob,
} from "../../../apis/employerApi";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import useListenNotification from "../../../hooks/useListenNotification";
import { useSocket } from "../../../hooks/useSocket";

function CandidateCards({ maleImg, femaleImg, fetchMoreData }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { applicants, acceptedApplicants, rejected, isLoading, hasMore } =
		useSelector((state) => state.employer);
	useSocket();

	const { sendNotifications } = useListenNotification();

	const handleApprove = async (jobId, userId) => {
		try {
			await dispatch(acceptAJob(jobId, userId));
			await dispatch(getAcceptedJobs());
			sendNotifications(
				userId,
				"accept", 
				"You have been accepted for this job",
				`employee/job/${jobId}`
			);
		} catch (error) {
			console.error("Error approving job:", error);
		}
	};

	const handleReject = async (jobId, userId) => {
		try {
			await dispatch(rejectAJob(jobId, userId));
			await dispatch(getRejectedJobs());
			sendNotifications(
				userId,
				"reject", 
				"Your Job application has been rejected",
				`employee/job/${jobId}`
			);
		} catch (error) {
			console.error("Error rejecting job:", error);
		}
	};

	return (
		<>
			<InfiniteScroll
				dataLength={applicants?.length}
				next={fetchMoreData}
				hasMore={hasMore}
				loader={<h4>Loading...</h4>}
				endMessage={
					<p className="text-center font-semibold mt-5">
						No more jobs
					</p>
				}>
				<div className="grid lg:grid-cols-2 gap-3">
					{applicants?.map((item, i) => (
						<div
							key={i}
							className="md:flex gap-3 items-start my-2 ps-3 py-4 border rounded-md shadow-md">
							<div
								className={`fixed inset-0  bg-gray-500 opacity-30 transition  ${
									isLoading ? "block" : "hidden"
								}`}></div>
							<span
								className={`text-theme-900 text-2xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ${
									isLoading ? "block" : "hidden"
								} `}>
								<TbLoader2 className="animate-spin" />
							</span>
							<div className="rounded-full overflow-hidden aspect-square w-24">
								<img
									src={
										item?.applicant?.profileImage || maleImg
									}
									className="w-full h-full object-cover"
									loading="lazy"
								/>
							</div>

							<div className="grid gap-1">
								<h3 className="capitalize font-semibold  pt-1">
									{item?.jobTitle}
								</h3>
								<div className="flex flex-wrap items-center gap-2 pt-1">
									<div className="flex items-center gap-1 text-xs md:text-sm text-slate-500 ">
										<CiLocationOn />

										<p className="capitalize text-xs md:text-sm text-slate-500">
											{item?.applicant?.location}
										</p>
									</div>
								</div>

								<div className="flex flex-wrap items-center gap-3 pt-1">
									<p className="bg-[#f7f7f8] border shadow-sm rounded-xl p-2 text-xs text-slate-600">
										{item?.applicant?.username}
									</p>
									<p className="bg-[#f7f7f8] border shadow-sm rounded-xl p-2 text-xs text-slate-600">
										{item?.applicant?.workExperience}
									</p>
								</div>

								<div className="flex items-center gap-3 pt-3">
									<div
										onClick={() =>
											navigate(
												`/job-portal/employer/candidate/${item?.applicant?._id}`
											)
										}>
										<CommentButtons
											icon={<IoEyeOutline />}
											text={"View Application"}
										/>
									</div>

									<div
										onClick={() => {
											handleApprove(
												item?._id,
												item?.applicant?.userId
											);
										}}
										className={`${
											acceptedApplicants.some(
												(acc) =>
													acc._id === item?._id &&
													acc.applicant._id ===
														item?.applicant?.userId
											)
												? "opacity-50 pointer-events-none"
												: ""
										} ${
											rejected.some(
												(rej) =>
													rej._id === item?._id &&
													rej.applicant._id ===
														item?.applicant?.userId
											)
												? "hidden pointer-events-none"
												: ""
										}`}>
										<CommentButtons
											icon={<IoCheckmarkOutline />}
											text={"Approve Application"}
										/>
									</div>
									<div
										onClick={() => {
											handleReject(
												item?._id,
												item?.applicant?.userId
											);
										}}
										className={`${
											rejected.some(
												(rej) =>
													rej._id === item?._id &&
													rej.applicant._id ===
														item?.applicant?.userId
											)
												? "opacity-50 pointer-events-none"
												: ""
										}${
											acceptedApplicants.some(
												(acc) =>
													acc._id === item?._id &&
													acc.applicant._id ===
														item?.applicant?.userId
											)
												? "hidden pointer-events-none"
												: ""
										}`}>
										<CommentButtons
											icon={<IoCloseOutline />}
											text={"Reject Application"}
										/>
									</div>
									{/* <CommentButtons
						icon={<MdOutlineDeleteOutline />}
						text={"Delete Application"}
					/> */}
								</div>
							</div>
						</div>
					))}
				</div>
			</InfiniteScroll>
		</>
	);
}

export default CandidateCards;

/* 








*/

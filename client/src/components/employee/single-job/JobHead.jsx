import React from "react";
import upwork from "/assets/images/upworklogo.png";
import { useDispatch, useSelector } from "react-redux";
import { IoBookmarkOutline } from "react-icons/io5";
import { MdBookmarkAdded } from "react-icons/md";
import JobIconDetails from "../JobIconDetails";
import { applyAjob, bookmarkAJob } from "../../../apis/employeeApi";

function JobHead() {
	const { job, appliedJobs, bookmarkedJobs } = useSelector(
		(state) => state.employee
	);
	const dispatch = useDispatch();

	const handleBookMark = (id) => {
		dispatch(bookmarkAJob(id));
	};

	const handleJobApplying = (id) => {
		dispatch(applyAjob(id));
	};

	return (
		<div className="w-full h-full py-16 bg-customBgColor flex justify-center items-center">
			<div className="grid gap-3">
				<div className="mx-auto">
					<img
						src={
							job
								? job?.owner?.apps?.jobPortal?.companyLogo
								: upwork
						}
						className="w-12 h-12 object-cover rounded-lg"
						loading="lazy"
					/>
				</div>

				<h1 className="text-center text-xl md:text-2xl font-black tracking-wider">
					{job?.jobTitle}
				</h1>

				<JobIconDetails center={true} job={job} />

				<div className="w-fit mx-auto">
					<p className="capitalize text-xs md:text-sm bg-blue-100 text-blue-600 font-semibold tracking-wider outline-none px-4 py-2 rounded-xl">
						{job?.employmentType}
					</p>
				</div>

				<div className="mt-3 flex justify-center items-center gap-4">
					<button
						disabled={appliedJobs.some((jo) => jo._id === job?._id)}
						onClick={() => handleJobApplying(job?._id)}
						className={`w-fit px-5 py-3 bg-blue-500 hover:bg-blue-600 text-sm text-white font-semibold tracking-wider rounded-lg`}>
						{appliedJobs.some((jo) => jo._id === job?._id)
							? "Applied"
							: "Apply"}
					</button>
					<button
						disabled={bookmarkedJobs.some(
							(jo) => jo._id === job?._id
						)}
						onClick={() => handleBookMark(job?._id)}
						className="p-3 text-lg bg-blue-100 hover:bg-blue-500 text-blue-500 hover:text-[#fff] cursor-pointer rounded-lg">
						{bookmarkedJobs.some((jo) => jo._id === job?._id) ? (
							<MdBookmarkAdded />
						) : (
							<IoBookmarkOutline />
						)}
					</button>
				</div>
			</div>
		</div>
	);
}

export default JobHead;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function JobCard({ data }) {
	const navigate = useNavigate();
	const location = useLocation();
	return (
		<div
			className="bg-white shadow rounded-lg p-4"
			onClick={() => {
				if (location.pathname === "/job-portal/jobs") {
					navigate(`/job-portal/jobs/${data?._id}`);
				} else {
					navigate(`/job-portal/job/${data?._id}`);
				}
			}}>
			<h2 className="text-lg font-semibold mb-2">{data?.jobTitle}</h2>
			<p className="text-gray-600 text-sm mb-1">
				<span className="font-medium">Location:</span> {data?.jobPlace}
			</p>
			<p className="text-gray-600 text-sm mb-1">
				<span className="font-medium">Salary:</span> ₹{" "}
				{data?.offeredSalary} LPA
			</p>
			<p className="text-gray-600 text-sm mb-3">
				<span className="font-medium">Job Type:</span>{" "}
				{data?.jobLocation}
			</p>
			<div className="flex flex-wrap gap-2 mb-3">
				{data?.skills.map((skill, i) => (
					<span
						key={i}
						className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded">
						{skill}
					</span>
				))}
			</div>
		</div>
	);
}

export default JobCard;

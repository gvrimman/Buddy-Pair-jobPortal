import React from "react";
import { useNavigate } from "react-router-dom";

function JobCard({ data }) {
	const navigate = useNavigate()
	return (
		<div
			className="bg-white shadow rounded-lg p-4"
			onClick={() => navigate(`/job-portal/job/${data.title}`)}>
			<h2 className="text-lg font-semibold mb-2">{data?.title}</h2>
			<p className="text-gray-600 text-sm mb-1">
				<span className="font-medium">Location:</span> {data?.location}
			</p>
			<p className="text-gray-600 text-sm mb-1">
				<span className="font-medium">Salary:</span> {data?.salary}
			</p>
			<p className="text-gray-600 text-sm mb-3">
				<span className="font-medium">Notice Period:</span>{" "}
				{data?.noticePeriod}
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

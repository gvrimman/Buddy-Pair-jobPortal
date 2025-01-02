import React from "react";
import { useNavigate } from "react-router-dom";

function ProfileCard({ data }) {
  const navigate = useNavigate()
	return (
		<div
			className="bg-white shadow rounded-lg p-4"
			onClick={() => navigate(`/job-portal/employer/profile/${data.name}`)}>
			<div className="flex items-center gap-3 mb-3">
				<div className="w-12 overflow-hidden rounded-full">
					<img
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5UsMY1i6v3JJUPiywpxzqPR0LixTR3WH-3g&s"
						className="w-full h-full"
						alt=""
					/>
				</div>
				<div>
					<h2 className="text-lg font-semibold">{data?.name}</h2>
					<span className="text-sm font-bold">{data?.title}</span>
				</div>
			</div>

			<p className="text-gray-600 text-sm mb-1">
				<span className="font-medium">Location:</span> {data?.location}
			</p>
			<p className="text-gray-600 text-sm mb-1">
				<span className="font-medium">Salary:</span> {data?.salary}
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

export default ProfileCard;

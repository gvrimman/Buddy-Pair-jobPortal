import React from "react";

import { GrFormView } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function TableBody({ job, handleDelete }) {
	const navigate = useNavigate();
	return (
		<tr className="border-b-2">
			<td className="p-4 flex gap-3">
				<img
					src={job?.owner?.apps?.jobPortal?.companyLogo}
					alt={job?.owner?.apps?.jobPortal?.companyName}
					className="w-12 h-12 object-cover rounded-lg"
				/>
				<div className="grid">
					<h3 className="font-semibold tracking-wider">
						{" "}
						{job?.jobTitle}
					</h3>
					<div className="flex items-center gap-3">
						<span className="flex items-center gap-2 text-gray-600">
							<IoBagHandleOutline />
							<p className="text-sm">
								{job?.owner?.apps?.jobPortal?.companyName}
							</p>
						</span>
						<span className="flex items-center gap-2 text-gray-600">
							<CiLocationOn />
							<p className="text-sm">{job?.jobPlace}</p>
						</span>
					</div>
				</div>
			</td>

			<td className="p-4 text-sm text-gray-600">
				{new Date(job.createdAt).toLocaleDateString()}
			</td>

			<td
				className={`p-4 text-sm font-semibold ${
					job?.status === true ? "text-green-500" : "text-red-500"
				}`}>
				{job?.status === true ? "Active" : "Inactive"}
			</td>

			<td className="p-4 flex transform md:-translate-y-2 gap-3">
				<button
					onClick={() =>
						navigate(`/job-portal/employee/job/${job._id}`)
					}
					className="flex items-center justify-center w-8 h-8 bg-blue-100 hover:bg-blue-500 text-xl text-blue-500 hover:text-white rounded-lg">
					<GrFormView />
				</button>
				<button
					onClick={() => {
						handleDelete(job._id);
					}}
					className="flex items-center justify-center w-8 h-8 bg-red-100 hover:bg-red-500 text-red-500 hover:text-white rounded-lg">
					<RiDeleteBinLine />
				</button>
			</td>
		</tr>
	);
}

export default TableBody;

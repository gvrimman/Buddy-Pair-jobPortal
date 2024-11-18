import React, { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { IoBookmarkOutline } from "react-icons/io5";
import { GrOrganization } from "react-icons/gr";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function CandidatesLists() {
	const { candidates } = useSelector((state) => state.employer);

	const [hoveredIndex, setHoveredIndex] = useState(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	console.log(candidates);
	return (
		<div className="grid gap-4 my-5 tracking-wide">
			{candidates?.map((candidate, index) => (
				<div
					key={candidate?._id || index}
					className="grid gap-4 sm:flex items-center justify-between p-4 border rounded-md"
					onMouseEnter={() => setHoveredIndex(index)}
					onMouseLeave={() => setHoveredIndex(null)}>
					<div className="grid sm:flex items-center gap-4">
						<div className="flex justify-between items-center">
							{candidate?.employeeId?.profileImage ? (
								<img
									src={candidate?.employeeId?.profileImage}
									className="w-12 h-12 rounded-full"
									alt={
										candidate?.employeeId?.name ||
										"profile picture"
									}
								/>
							) : (
								<span className="w-12 h-12 flex justify-center items-center bg-blue-100 text-blue-500 rounded-full capitalize">
									{candidate?.employeeId?.name?.charAt(0) ||
										"U"}
								</span>
							)}
							<button className="sm:hidden w-8 h-8 bg-gray-200 flex justify-center items-center rounded-full">
								<IoBookmarkOutline className="text-sm" />
							</button>
						</div>
						<div className="grid gap-2">
							<h1 className="text-base font-bold capitalize">
								{candidate?.employeeId?.name}
							</h1>

							<div className="flex flex-wrap items-center gap-2 md:gap-3">
								<div className="flex items-center gap-2">
									<h6 className="text-blue-400 text-sm font-semibold">
										{candidate?.jobDetails?.jobTitle}
									</h6>

									<div className="flex items-center gap-2 text-gray-600">
										<GrOrganization />
										<p className="text-xs capitalize">
											{candidate?.jobDetails?.companyName}
										</p>
									</div>
								</div>
								<div className="flex items-center gap-2 text-gray-600">
									<FaMoneyBill1Wave />
									<p className="text-xs capitalize">
										{candidate?.jobDetails?.ctc || 10000}
									</p>
								</div>
							</div>
							<div className="w-full flex items-center gap-2">
								{candidate?.skills?.map((skill, index) => (
									<div
										key={index}
										className=" w-fit px-3 py-1 bg-gray-200 rounded-full text-xs">
										{skill}
									</div>
								))}
							</div>
						</div>
					</div>

					<div className="flex items-center gap-2">
						<button
							className={` ${
								hoveredIndex === index ? "sm:flex" : "sm:hidden"
							} w-10 h-10 bg-gray-200 justify-center items-center rounded-full`}>
							<IoBookmarkOutline />
						</button>

						<button
							onClick={() =>
								navigate(
									`/job-portal/employer/candidate/${candidate?._id}`
								)
							}
							className="px-5 py-3 bg-blue-100 hover:bg-blue-600  text-blue-500  hover:text-white capitalize text-xs md:text-sm font-bold rounded-lg">
							view profile
						</button>
					</div>
				</div>
			))}
		</div>
	);
}

export default CandidatesLists;

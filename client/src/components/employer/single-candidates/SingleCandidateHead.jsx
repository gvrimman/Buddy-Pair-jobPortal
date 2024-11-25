import React from "react";
import female from "/assets/images/femaleprofile.jpg";
import { IoBookmarkOutline } from "react-icons/io5";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { GoClock } from "react-icons/go";
import { GrLocation } from "react-icons/gr";
import { useSelector } from "react-redux";

function SingleCandidateHead() {
	const { candidate } = useSelector((state) => state.employer);
	return (
		<div className="bg-customBgColor">
			<div className="max-w-[1440px] mx-auto pt-5 py-3 grid gap-4">
				<div className="grid justify-center gap-3">
					<div className="mx-auto">
						<img
							src={candidate?.profileImage || female}
							alt=""
							className="w-16 h-16 rounded-full"
							loading="lazy"
						/>
					</div>
					<h1 className="text-center capitalize text-xl font-semibold ">
						{candidate?.userId?.username}
					</h1>
					<p className="text-sm text-blue-600">
						{candidate?.jobDetails?.jobTitle || "No job title"}
					</p>
				</div>

				<div className="grid xl:grid-cols-3 gap-3">
					<div className="mx-4 my-2 flex flex-wrap justify-center xl:justify-start items-center gap-3">
						{candidate?.skills.map((value, index) => (
							<div
								key={index}
								className="px-3 py-1 bg-blue-100 text-xs text-blue-500 font-semibold tracking-wide capitalize rounded-full">
								{value}
							</div>
						))}
					</div>

					<div className="flex flex-wrap justify-center items-center gap-4">
						<div className="flex items-center gap-2 text-gray-500">
							<GrLocation className="text-lg" />
							<p className="text-sm">{candidate?.locationName}</p>
						</div>
						{candidate?.jobDetails?.cTc && (
							<div className="flex items-center gap-2 text-gray-500">
								<FaMoneyBill1Wave className="text-lg" />
								<p className="text-sm">
									{candidate?.jobDetails?.cTc}
								</p>
							</div>
						)}

						<div className="flex items-center gap-2 text-gray-500">
							<GoClock className="text-lg" />
							<p className="text-sm">
								{candidate?.jobDetails?.workExperience}
							</p>
						</div>
					</div>

					<div className="flex justify-center items-center gap-3">
						<a
							href={candidate?.resume}
							download
							className="px-5 py-3 bg-blue-600 hover:bg-blue-800 text-sm text-white font-medium tracking-wide rounded-lg">
							Download CV
						</a>

						<button className="p-3 bg-blue-100 text-xl text-blue-500 rounded-lg">
							<IoBookmarkOutline className="" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SingleCandidateHead;

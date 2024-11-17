import React, { useEffect } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { GoClock } from "react-icons/go";
import { IoBookmarkOutline } from "react-icons/io5";

function JobListedSection() {
	const jobs = null;

	return (
		<div className="grid lg:grid-cols-2 gap-3 my-5">
			{jobs?.map((item) => (
				<div
					key={item._id}
					className="grid grid-cols-7 gap-3 p-4 bg-white outline outline-1 outline-[#673ab7] rounded-lg">
					<div className="mt-1 ">
						<img
							src={item.owner?.companyLogo}
							alt={item.company}
							className="w-12 h-12 object-cover rounded-lg"
						/>
					</div>
					<div className="col-span-5 flex flex-col  gap-2">
						<h2
							className="text-md md:text-lg font-medium hover:text-blue-500 cursor-pointer"
							onClick={() =>
								navigate(`/job-portal/employee/job/${item._id}`)
							}>
							{item.title}
						</h2>
						<div className="md:flex lg:grid xl:grid-cols-4 gap-2  ">
							<div className="text-sm capitalize text-slate-500 flex items-center gap-2">
								<IoBagHandleOutline />
								<p>{item.owner?.companyName}</p>
							</div>

							<div className="text-sm capitalize text-slate-500 flex items-center gap-2">
								<CiLocationOn />
								<p>{item.jobPlace}</p>
							</div>

							<div className="hidden md:flex items-center gap-2 xl:col-span-2 text-sm text-slate-500 ">
								<GoClock />
								<p>
									{new Date(
										item.deadline
									).toLocaleDateString()}
								</p>
							</div>

							<div className="hidden md:flex items-center text-sm capitalize text-slate-500  gap-2">
								<FaMoneyBill1Wave />
								<p>{item.offeredSalary}</p>
							</div>
						</div>
						<div className="w-fit flex flex-wrap items-center gap-2 xl:gap-4 mt-2">
							<p className="antialiased capitalize text-xs md:text-sm bg-white outline outline-1 outline-blue-500 px-2 py-[2px] rounded-lg">
								{item.employmentType}
							</p>
						</div>
					</div>
					<div
						className="mt-1 mx-auto text-lg hover:text-blue-500 cursor-pointer"
						onClick={() => handleBookMark(item._id)}>
						<IoBookmarkOutline />
					</div>
				</div>
			))}
		</div>
	);
}

export default React.memo(JobListedSection);

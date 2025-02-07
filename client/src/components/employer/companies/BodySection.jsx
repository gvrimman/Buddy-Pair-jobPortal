import React, { useEffect, useState } from "react";
import { GrView } from "react-icons/gr";
import { GrLocation } from "react-icons/gr";
import { MdOutlineEmail } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllCompanies } from "../../../apis/employerApi";
import InfiniteScroll from "react-infinite-scroll-component";
import { TbLoader2 } from "react-icons/tb";

function BodySection({ query, page, setPage }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { companies, hasMore, isLoading } = useSelector(
		(state) => state.employer
	);

	const fetchMoreData = () => {
		if (!hasMore || isLoading) return;

		const nextPage = page + 1;
		setPage(nextPage);
		dispatch(getAllCompanies({ ...query, page: nextPage }));
	};


	return (
		<div className="grid gap-4 my-5 tracking-wide">
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
			<InfiniteScroll
				dataLength={companies?.length}
				next={fetchMoreData}
				hasMore={hasMore}
				loader={<h4>Loading...</h4>}
				endMessage={
					<p className="text-center font-semibold mt-5">
						No more users
					</p>
				}>
				{companies?.map((company, index) => (
					<div
						key={index}
						className="bg-white flex justify-between items-start p-4 border rounded-lg ">
						<div className="grid md:flex gap-3">
							<div className="">
								<img
									src={company?.companyLogo}
									className="w-12 h-12 object-cover rounded-lg"
									loading="lazy"
								/>
							</div>
							<div className="grid gap-1">
								<h1 className="text-lg font-semibold tracking-wider">
									{company?.companyName}
								</h1>

								<div className="flex flex-wrap gap-3">
									<div className="flex gap-2 items-center">
										<span>
											<MdOutlineEmail />
										</span>
										<p className="text-sm sm:text-sm">
											{company?.companyEmail}
										</p>
									</div>
									<div className="flex gap-2 items-center">
										<span>
											<GrLocation />
										</span>
										<p className="text-sm  capitalize">
											{company?.companyAddress}
										</p>
									</div>
								</div>

								<div className="mt-2 flex flex-wrap gap-3">
									<div className="w-fit px-3 py-1 text-sm tracking-wide odd:bg-blue-100 text-blue-500 even:bg-green-100 even:text-green-500 rounded-xl">
										{company?.industryType}
									</div>
								</div>
							</div>
						</div>

						<div className="transform -translate-y-2">
							<button
								onClick={() =>
									navigate(
										`/job-portal/company/${company._id}`
									)
								}
								className="w-10 h-10 flex justify-center items-center  text-blue-500 hover:bg-slate-200 hover:animate-pulse rounded-full">
								<GrView />
							</button>
						</div>
					</div>
				))}
			</InfiniteScroll>
		</div>
	);
}

export default BodySection;

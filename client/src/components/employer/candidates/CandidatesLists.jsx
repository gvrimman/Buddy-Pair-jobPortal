import React, { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { IoBookmarkOutline } from "react-icons/io5";
import { GrOrganization } from "react-icons/gr";
import { TbLoader2 } from "react-icons/tb";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { getCandidates } from "../../../apis/employerApi";

function CandidatesLists({ page, setPage }) {
	const dispatch = useDispatch();
	const { candidates, hasMore, isLoading } = useSelector(
		(state) => state.employer
	);
	const { query } = useSelector((state) => state.employee);

	const [hoveredIndex, setHoveredIndex] = useState(null);
	
	const navigate = useNavigate();

	const fetchMoreData = () => {
		if (!hasMore || isLoading) return;

		const nextPage = page + 1;
		setPage(nextPage);
		dispatch(getCandidates({ ...query, page: nextPage }));

	};

	return (
		<div className={`grid gap-4 my-5 tracking-wide`}>
			<div
				className={`fixed inset-0  bg-gray-500 opacity-30 transition  ${
					isLoading ? "block" : "hidden"
				}`}></div>
			<span
				className={`text-theme-900 text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ${
					isLoading ? "block" : "hidden"
				} `}>
				<TbLoader2 className="animate-spin" />
			</span>
			<InfiniteScroll
				dataLength={candidates?.length}
				next={fetchMoreData}
				hasMore={hasMore}
				loader={<h4>Loading...</h4>}
				endMessage={
					<p className="text-center font-semibold mt-5">
						No more users
					</p>
				}>
				<div className="mt-10">
					{candidates?.length === 0 && (
						<p className="text-center font-semibold text-2xl">
							No candidates found! Try searching by candidates name or
							location
						</p>
					)}
				</div>
				{candidates?.map((candidate, index) => (
					<div
						key={index}
						className="grid gap-4 sm:flex items-center justify-between p-4 border rounded-md"
						onMouseEnter={() => setHoveredIndex(index)}
						onMouseLeave={() => setHoveredIndex(null)}>
						<div className="grid sm:flex items-center gap-4">
							<div className="flex justify-between items-center">
								{candidate?.profileImage ? (
									<img
										src={candidate?.profileImage}
										className="w-12 h-12 rounded-full"
										alt={
											candidate?.userId?.username ||
											"profile picture"
										}
										loading="lazy"
									/>
								) : (
									<span className="w-12 h-12 flex justify-center items-center bg-blue-100 text-blue-500 rounded-full capitalize">
										{candidate?.userId?.username?.charAt(
											0
										) || "U"}
									</span>
								)}
								<button className="sm:hidden w-8 h-8 bg-gray-200 flex justify-center items-center rounded-full">
									<IoBookmarkOutline className="text-sm" />
								</button>
							</div>
							<div className="grid gap-2">
								<h1 className="text-base font-bold capitalize">
									{candidate?.userId?.username}
								</h1>

								<div className="flex flex-wrap items-center gap-2 md:gap-3">
									<div className="flex items-center gap-2">
										<h6 className="text-blue-400 text-sm font-semibold">
											{candidate?.jobDetails?.jobTitle}
										</h6>

										<div className="flex items-center gap-2 text-gray-600">
											<GrOrganization />
											<p className="text-xs capitalize">
												{
													candidate?.jobDetails
														?.companyName
												}
											</p>
										</div>
									</div>
									<div className="flex items-center gap-2 text-gray-600">
										<FaMoneyBill1Wave />
										<p className="text-xs capitalize">
											{candidate?.jobDetails?.ctc ||
												10000}
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
									hoveredIndex === index
										? "sm:flex"
										: "sm:hidden"
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
			</InfiniteScroll>
		</div>
	);
}

export default CandidatesLists;

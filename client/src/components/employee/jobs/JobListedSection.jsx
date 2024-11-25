import React, { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { GoClock } from "react-icons/go";
import { IoBookmarkOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { TbLoader2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { bookmarkAJob, getJobs } from "../../../apis/employeeApi";
import { MdBookmarkAdded } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";

function JobListedSection({ query, setQuery, data, setData }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { jobs, isLoading, bookmarkedJobs, hasMore } = useSelector(
		(state) => state.employee
	);

	const [page, setPage] = useState(1);

	const fetchMoreData = () => {
		if (!hasMore || isLoading) return;

		const nextPage = page + 1;
		setPage(nextPage);
		dispatch(getJobs({ ...query, page: nextPage }));
	};

	useEffect(() => {
		setData((prevData) => {
			const newJobs = jobs.filter(
				(job) => !prevData.some((dataItem) => dataItem._id === job._id)
			);
			return [...prevData, ...newJobs];
		});
	}, [jobs]);


	const handleBookMark = (id) => {
		dispatch(bookmarkAJob(id));
	};
	return (
		<div className="">
			<div
				className={`fixed inset-0  bg-gray-500 opacity-30 transition  ${
					isLoading ? "block" : "hidden"
				}`}></div>
			<span
				className={`text-purple-900 text-2xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ${
					isLoading ? "block" : "hidden"
				} `}>
				<TbLoader2 className="animate-spin" />
			</span>
			<InfiniteScroll
				dataLength={data?.length}
				next={fetchMoreData}
				hasMore={hasMore}
				loader={<h4>Loading...</h4>}
				endMessage={
					<p className="text-center font-semibold mt-5">
						No more jobs
					</p>
				}>
				<div className="grid lg:grid-cols-2 gap-3 my-5">
					{data?.map((item) => (
						<div
							key={item._id}
							className="grid grid-cols-7 gap-3 p-4 bg-white outline outline-1 outline-[#673ab7] rounded-lg">
							<div className="mt-1 ">
								<img
									src={item?.owner?.companyLogo}
									alt={item?.owner?.companyName}
									loading="lazy"
									className="w-12 h-12 object-cover rounded-lg"
								/>
							</div>
							<div className="col-span-5 flex flex-col  gap-2">
								<h2
									className="text-md md:text-lg font-medium hover:text-blue-500 cursor-pointer"
									onClick={() =>
										navigate(
											`/job-portal/employee/job/${item._id}`
										)
									}>
									{item?.jobTitle}
								</h2>
								<div className="md:flex lg:grid ">
									<div className="text-sm capitalize text-slate-500 flex items-center gap-2">
										<IoBagHandleOutline />
										<p>{item.owner?.companyName}</p>
									</div>

									<div className="text-sm capitalize text-slate-500 flex items-center gap-2">
										<CiLocationOn />
										<p>{item?.jobPlace}</p>
									</div>

									<div className="hidden md:flex items-center gap-2 xl:col-span-2 text-sm text-slate-500 ">
										<GoClock />
										<p>
											{new Date(
												item?.deadline
											).toLocaleDateString()}
										</p>
									</div>

									<div className="hidden md:flex items-center text-sm capitalize text-slate-500  gap-2">
										<FaMoneyBill1Wave />
										<p>{item?.offeredSalary}</p>
									</div>
								</div>
								<div className="w-fit flex flex-wrap items-center gap-2 xl:gap-4 mt-2">
									<p className="antialiased capitalize text-xs md:text-sm bg-white outline outline-1 outline-blue-500 px-2 py-[2px] rounded-lg">
										{item?.employmentType}
									</p>
								</div>
							</div>
							<div
								className="mt-1 mx-auto text-lg hover:text-blue-500 cursor-pointer"
								onClick={() => handleBookMark(item._id)}>
								{bookmarkedJobs.some(
									(job) => job._id === item?._id
								) ? (
									<MdBookmarkAdded />
								) : (
									<IoBookmarkOutline />
								)}
							</div>
						</div>
					))}
				</div>
			</InfiniteScroll>
		</div>
	);
}

export default React.memo(JobListedSection);

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import JobBody from "../../components/employee/single-job/JobBody";
import JobHead from "../../components/employee/single-job/JobHead";
import RelatedJob from "../../components/employee/single-job/RelatedJob";
import { getJobById } from "../../apis/employeeApi";
import { TbLoader2 } from "react-icons/tb";

function SingleJob() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { isLoading } = useSelector((state) => state.employee);
	useEffect(() => {
		dispatch(getJobById(id));
	}, [id, dispatch]);

	return (
		<div className="bg-white mt-20">
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
			<JobHead />
			<JobBody />
			<RelatedJob />
		</div>
	);
}

export default SingleJob;

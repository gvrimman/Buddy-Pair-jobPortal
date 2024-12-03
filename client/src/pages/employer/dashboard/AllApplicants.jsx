import React, { useEffect, useState } from "react";
import Applicants from "../../../components/employer/dashboard/applicants/Applicants";
import {
	getAcceptedJobs,
	getApplicants,
	getRejectedJobs,
} from "../../../apis/employerApi";
import { useDispatch, useSelector } from "react-redux";
import { clearApplicants } from "../../../Redux/reducers/employerReducer";

function AllApplicants() {
	const dispatch = useDispatch();
	const { hasMore, isLoading } = useSelector((state) => state.employer);
	const [page, setPage] = useState(1);
	const fetchMoreData = async () => {
		if (!hasMore || isLoading) return;

		const nextPage = page + 1;
		setPage(nextPage);
		dispatch(getApplicants(nextPage));
		dispatch(getAcceptedJobs());
		dispatch(getRejectedJobs());
	};

	useEffect(() => {
		dispatch(clearApplicants());
		dispatch(getApplicants(page));
	}, [dispatch]);

	useEffect(() => {
		dispatch(getAcceptedJobs());
	}, [dispatch]);
	useEffect(() => {
		dispatch(getRejectedJobs());
	}, [dispatch]);

	return (
		<div className="h-screen">
			<Applicants fetchMoreData={fetchMoreData} />
		</div>
	);
}

export default AllApplicants;

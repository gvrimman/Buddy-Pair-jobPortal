import React, { useEffect, useState } from "react";
import Applicants from "../../../components/employer/dashboard/applicants/Applicants";
import {
	getAcceptedJobs,
	getJobApplicants,
	getRejectedJobs,
} from "../../../apis/employerApi";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { clearApplicants } from "../../../Redux/reducers/employerReducer";

function JobApplicatns() {
	const dispatch = useDispatch();
	const { id } = useParams();

	const [page, setPage] = useState(1);


	useEffect(() => {
		dispatch(clearApplicants());
		dispatch(getJobApplicants({ id, page }));
	}, []);

	useEffect(() => {
		dispatch(getAcceptedJobs());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getRejectedJobs());
	}, [dispatch]);

		const fetchMoreData = () => {
			if (!hasMore || isLoading) return;

			const nextPage = page + 1;
			setPage(nextPage);
			dispatch(getJobApplicants({ id, nextPage }));
			dispatch(getAcceptedJobs());
			dispatch(getRejectedJobs());
		};

	return (
		<div className="h-screen">
			<Applicants fetchMoreData={fetchMoreData} />
		</div>
	);
}

export default JobApplicatns;

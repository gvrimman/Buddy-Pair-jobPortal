import React, { useEffect } from "react";
import Applicants from "../../../components/employer/dashboard/applicants/Applicants";
import { getAcceptedJobs, getJobApplicants, getRejectedJobs } from "../../../apis/employerApi";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function JobApplicatns() {
	const dispatch = useDispatch();
	const { id } = useParams();

	useEffect(() => {
		dispatch(getJobApplicants(id));
	}, [dispatch]);

	useEffect(() => {
		dispatch(getAcceptedJobs());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getRejectedJobs());
	}, [dispatch]);
	return (
		<div className="h-screen">
			<Applicants />
		</div>
	);
}

export default JobApplicatns;

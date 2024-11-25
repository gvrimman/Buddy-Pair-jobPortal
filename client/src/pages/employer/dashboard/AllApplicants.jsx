import React, { useEffect } from "react";
import Applicants from "../../../components/employer/dashboard/applicants/Applicants";
import { getAcceptedJobs, getApplicants, getRejectedJobs } from "../../../apis/employerApi";
import { useDispatch } from "react-redux";

function AllApplicants() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getApplicants());
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

export default AllApplicants;

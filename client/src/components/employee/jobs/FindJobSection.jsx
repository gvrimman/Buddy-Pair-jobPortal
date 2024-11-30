import React, { useEffect, useState } from "react";

import JobSectionHeader from "./JobSectionHeader";
import JobListedSection from "./JobListedSection";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../../../apis/employeeApi";
import { clearJobs, clearQuery } from "../../../Redux/reducers/employeeReducer";

function FindJobSection({ toggleValue, setToggleValue, setQuery, query }) {
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);

	const handleSearchJob = () => {
		setPage(1);
		dispatch(clearJobs());
		dispatch(getJobs(query));
	};

	const handleClearFilter = () => {
		setPage(1);
		dispatch(clearJobs());
		setQuery({});
		dispatch(clearQuery());
	};

	return (
		<div
			className={`h-screen col-span-3 py-5 ms-8 mr-2 ${
				toggleValue && "blur-md overflow-hidden"
			}`}>
			<JobSectionHeader
				handleSearchJob={handleSearchJob}
				handleClearFilter={handleClearFilter}
				query={query}
				setQuery={setQuery}
				setToggleValue={setToggleValue}
				setPage={setPage}
			/>
			<JobListedSection
				query={query}
				page={page}
				setPage={setPage}
			/>
		</div>
	);
}

export default FindJobSection;

import React, { useEffect, useState } from "react";

import JobSectionHeader from "./JobSectionHeader";
import JobListedSection from "./JobListedSection";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../../../apis/employeeApi";

function FindJobSection({ toggleValue, setToggleValue, setQuery, query }) {
	const { jobs } = useSelector((state) => state.employee);
	const [data, setData] = useState([]);

	const dispatch = useDispatch();

	const handleSearchJob = () => {
		setData([]);
		dispatch(getJobs(query));
	};

	const handleClearFilter = () => {
		dispatch(getJobs());
		setQuery({});
		// setData([]);
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
			/>
			<JobListedSection
				setQuery={setQuery}
				query={query}
				data={data}
				setData={setData}
			/>
		</div>
	);
}

export default FindJobSection;

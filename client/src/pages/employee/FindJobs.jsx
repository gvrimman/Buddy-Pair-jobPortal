import React, { useEffect, useState } from "react";
import JobSideSection from "../../components/employee/jobs/JobSideSection";
import JobSideBarSection from "../../components/employee/jobs/JobSideBarSection";
import FindJobSection from "../../components/employee/jobs/FindJobSection";
import { useDispatch } from "react-redux";
import { getJobs } from "../../apis/employeeApi";

function FindJobs() {
	const dispatch = useDispatch();
	const [toggleJobSection, setToggleJobSection] = useState(false);
	const [query, setQuery] = useState({});


	return (
		<div className="max-w-[1440px] mx-auto px-7 grid lg:grid-cols-4">
			<JobSideSection setQuery={setQuery} query={query} />

			<JobSideBarSection
				setQuery={setQuery}
				toggleValue={toggleJobSection}
				setToggleValue={setToggleJobSection}
			/>
			<FindJobSection
				query={query}
				setQuery={setQuery}
				toggleValue={toggleJobSection}
				setToggleValue={setToggleJobSection}
			/>
		</div>
	);
}

export default FindJobs;

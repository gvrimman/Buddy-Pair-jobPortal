import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import JobSideSection from "../../components/employee/jobs/JobSideSection";
import JobSideBarSection from "../../components/employee/jobs/JobSideBarSection";
import FindJobSection from "../../components/employee/jobs/FindJobSection";
import { clearQuery } from "../../Redux/reducers/employeeReducer";

function FindJobs() {
	const { queries } = useSelector((state) => state.employee);
	const [toggleJobSection, setToggleJobSection] = useState(false);
	const [query, setQuery] = useState({});

	useEffect(() => {
		setQuery(queries);
	}, [queries]);
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

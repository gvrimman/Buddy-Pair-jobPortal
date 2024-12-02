import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import JobSideSection from "../../components/employee/jobs/JobSideSection";
import JobSideBarSection from "../../components/employee/jobs/JobSideBarSection";
import FindJobSection from "../../components/employee/jobs/FindJobSection";

function FindJobs() {
	const [toggleJobSection, setToggleJobSection] = useState(false);

	return (
		<div className="max-w-[1440px] mx-auto px-7 grid lg:grid-cols-4">
			<JobSideSection
			  />

			<JobSideBarSection
				toggleValue={toggleJobSection}
				setToggleValue={setToggleJobSection}
			/>
			<FindJobSection
				toggleValue={toggleJobSection}
				setToggleValue={setToggleJobSection}
			/>
		</div>
	);
}

export default FindJobs;

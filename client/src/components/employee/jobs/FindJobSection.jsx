import React, { useEffect } from "react";

import JobSectionHeader from "./JobSectionHeader";
import JobListedSection from "./JobListedSection";


function FindJobSection({ toggleValue, setToggleValue, setQuery, query }) {
	return (
		<div
			className={`h-screen col-span-3 py-5 ms-8 mr-2 ${
				toggleValue && "blur-md overflow-hidden"
			}`}>
			<JobSectionHeader
				query={query}
				setQuery={setQuery}
				setToggleValue={setToggleValue}
			/>
			<JobListedSection />
		</div>
	);
}

export default FindJobSection;

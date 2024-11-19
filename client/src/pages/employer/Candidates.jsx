import React, { useEffect, useState } from "react";
import CandidatesSideSection from "../../components/employer/candidates/CandidatesSideSection";
import CandidatesSideBar from "../../components/employer/candidates/CandidatesSideBar";
import CandidatesSection from "../../components/employer/candidates/CandidatesSection";

function Candidates() {
	const [toggleJobSection, setToggleJobSection] = useState(false);
	const [query, setQuery] = useState({});
	console.log(query);
	return (
		<div className="max-w-[1440px] mx-auto px-7 grid lg:grid-cols-4">
			<CandidatesSideSection setQuery={setQuery} />
			<CandidatesSideBar
				toggleValue={toggleJobSection}
				setToggleValue={setToggleJobSection}
			/>
			<CandidatesSection
				query={query}
				setQuery={setQuery}
				toggleValue={toggleJobSection}
				setToggleValue={setToggleJobSection}
			/>
		</div>
	);
}

export default Candidates;

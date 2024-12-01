import React, { useEffect, useState } from "react";
import CandidatesSideSection from "../../components/employer/candidates/CandidatesSideSection";
import CandidatesSideBar from "../../components/employer/candidates/CandidatesSideBar";
import CandidatesSection from "../../components/employer/candidates/CandidatesSection";
import { useDispatch } from "react-redux";
import { getCandidates } from "../../apis/employerApi";

function Candidates() {
	const dispatch  = useDispatch()
	const [toggleJobSection, setToggleJobSection] = useState(false);
	const [query, setQuery] = useState({});
	// useEffect(() => {
	// 	dispatch(getCandidates());
	// }, []);
	return (
		<div className="max-w-[1440px] mx-auto px-7 grid lg:grid-cols-4">
			<CandidatesSideSection query={query} setQuery={setQuery} />
			<CandidatesSideBar
				toggleValue={toggleJobSection}
				setToggleValue={setToggleJobSection}
				setQuery={setQuery}
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

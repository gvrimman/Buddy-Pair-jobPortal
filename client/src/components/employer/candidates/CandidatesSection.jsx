import React from "react";
import CandidatesSectionHeader from "./CandidatesSectionHeader";
import CandidatesLists from "./CandidatesLists";
import { useDispatch, useSelector } from "react-redux";

function CandidatesSection({ toggleValue, setToggleValue, setQuery, query }) {
	
	return (
		<div
			className={`h-screen col-span-3 py-5 ms-8 mr-2 ${
				toggleValue && "blur-md overflow-hidden"
			}`} >
			<CandidatesSectionHeader
				query={query}
				setQuery={setQuery}
				setToggleValue={setToggleValue}
			/>
			<CandidatesLists />
		</div>
	);
}

export default CandidatesSection;

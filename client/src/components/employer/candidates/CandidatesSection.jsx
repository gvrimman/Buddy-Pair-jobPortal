import React, { useEffect, useState } from "react";
import CandidatesSectionHeader from "./CandidatesSectionHeader";
import CandidatesLists from "./CandidatesLists";
import { useDispatch, useSelector } from "react-redux";
import { getCandidates } from "../../../apis/employerApi";
import { clearCandidates, clearQuery } from "../../../Redux/reducers/employerReducer";

function CandidatesSection({ toggleValue, setToggleValue, setQuery, query }) {
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);
	const handleSearchCandidate = async () => {
		setPage(1);
		dispatch(clearCandidates());
		dispatch(getCandidates(query));
	};

	const handleClearFilter = () => {
		setPage(1);
		dispatch(clearCandidates());
		setQuery({});
		dispatch(clearQuery());
	};

	return (
		<div
			className={`h-screen col-span-3 py-5 ms-8 mr-2 ${
				toggleValue && "blur-md overflow-hidden"
			}`}>
			<CandidatesSectionHeader
				handleSearchCandidate={handleSearchCandidate}
				handleClearFilter={handleClearFilter}
				query={query}
				setQuery={setQuery}
				setToggleValue={setToggleValue}
				setPage={setPage}
			/>
			<CandidatesLists query={query} page={page} setPage={setPage} />
		</div>
	);
}

export default CandidatesSection;

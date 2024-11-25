import React, { useEffect, useState } from "react";
import CandidatesSectionHeader from "./CandidatesSectionHeader";
import CandidatesLists from "./CandidatesLists";
import { useDispatch, useSelector } from "react-redux";
import { getCandidates } from "../../../apis/employerApi";

function CandidatesSection({ toggleValue, setToggleValue, setQuery, query }) {
	const { candidates } = useSelector((state) => state.employer);
	const [data, setData] = useState([]);

	const dispatch = useDispatch();
	const handleSearchCandidate = async () => {
		setData([]);
		dispatch(getCandidates(query));
	};

	// useEffect(() => {
	// 	setData(candidates);
	// }, [candidates]);


	const handleClearFilter = () => {
		dispatch(getCandidates());
		setQuery({});
		// setData([]);
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
			/>
			<CandidatesLists
				setQuery={setQuery}
				query={query}
				data={data}
				setData={setData}
			/>
		</div>
	);
}

export default CandidatesSection;

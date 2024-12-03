import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CompaniesHead from "./CompaniesHead";
import BodySection from "./BodySection";
import { getAllCompanies } from "../../../apis/employerApi";
import { clearCompanies } from "../../../Redux/reducers/employerReducer";

function CompaniesSection({ toggleValue, setToggleValue, setQuery, query }) {
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);

	const handleClearFilter = () => {
		setPage(1);
		dispatch(clearCompanies());
		setQuery({});
	};

	const handleSearchCandidate = () => {
		setPage(1);
		dispatch(clearCompanies());
		dispatch(getAllCompanies(query));
	};
	return (
		<div
			className={`h-screen col-span-3 py-5 ms-8 mr-2 ${
				toggleValue && "blur-md overflow-hidden"
			}`}>
			<CompaniesHead
				handleClearFilter={handleClearFilter}
				handleSearchCandidate={handleSearchCandidate}
				query={query}
				setQuery={setQuery}
				setToggleValue={setToggleValue}
				setPage={setPage}
			/>
			<BodySection
				query={query}
				page={page}
				setPage={setPage}
			/>
		</div>
	);
}

export default CompaniesSection;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CompaniesHead from "./CompaniesHead";
import BodySection from "./BodySection";
import { getAllCompanies } from "../../../apis/employerApi";

function CompaniesSection({ toggleValue, setToggleValue, setQuery, query }) {
	const [data, setData] = useState([]);

	const dispatch = useDispatch();
	const handleClearFilter = () => {
		dispatch(getAllCompanies());
		setQuery({});
	};

	const handleSearchCandidate = () => {
		setData([]);
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
			/>
			<BodySection
				setQuery={setQuery}
				query={query}
				data={data}
				setData={setData}
			/>
		</div>
	);
}

export default CompaniesSection;

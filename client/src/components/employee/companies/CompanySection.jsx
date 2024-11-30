import React, { useEffect, useState } from "react";
import CompanyHead from "./CompanyHead";
import CompanyBody from "./CompanyBody";
import { useDispatch } from "react-redux";
import { getAllCompaniesEmployee } from "../../../apis/employeeApi";
import { clearCompanies } from "../../../Redux/reducers/employeeReducer";

function CompanySection({ toggleValue, setToggleValue, setQuery, query }) {
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);

	const handleSearchCandidate = () => {
		setPage(1);
		dispatch(clearCompanies());
		dispatch(getAllCompaniesEmployee(query));
	};

	const handleClearFilter = () => {
		setPage(1);
		dispatch(clearCompanies());
		setQuery({});
	};

	return (
		<div
			className={`h-screen col-span-3 py-5 ms-8 mr-2 ${
				toggleValue && "blur-md overflow-hidden"
			}`}>
			<CompanyHead
				setToggleValue={setToggleValue}
				handleClearFilter={handleClearFilter}
				handleSearchCandidate={handleSearchCandidate}
				query={query}
				setQuery={setQuery}
				setPage={setPage}
			/>
			<CompanyBody query={query} page={page} setPage={setPage} />
		</div>
	);
}

export default CompanySection;

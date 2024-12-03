import React, { useEffect, useState } from "react";
import CompanyHead from "./CompanyHead";
import CompanyBody from "./CompanyBody";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompaniesEmployee } from "../../../apis/employeeApi";
import { clearCompanies, clearQuery } from "../../../Redux/reducers/employeeReducer";

function CompanySection({ toggleValue, setToggleValue }) {
	const { query } = useSelector((state) => state.employee);

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
		dispatch(clearQuery());
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
				setPage={setPage}
			/>
			<CompanyBody page={page} setPage={setPage} />
		</div>
	);
}

export default CompanySection;

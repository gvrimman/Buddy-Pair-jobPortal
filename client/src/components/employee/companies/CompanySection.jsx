import React, { useEffect, useState } from 'react'
import CompanyHead from './CompanyHead'
import CompanyBody from './CompanyBody'
import { useDispatch } from 'react-redux';
import { getAllCompaniesEmployee } from '../../../apis/employeeApi';

function CompanySection({ toggleValue, setToggleValue, setQuery, query }) {
  	const [data, setData] = useState([]);

    const dispatch = useDispatch();
	const handleClearFilter = () => {
		dispatch(getAllCompaniesEmployee());
		setQuery({});
	};

	const handleSearchCandidate = () => {
		setData([]);
		dispatch(getAllCompaniesEmployee(query));
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
			/>
			<CompanyBody
				setQuery={setQuery}
				query={query}
				data={data}
				setData={setData}
			/>
		</div>
	);
}

export default CompanySection
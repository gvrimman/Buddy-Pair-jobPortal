import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
// import { getOtherCompanies } from '../../../../redux/employerSlice';
import CompaniesSideSection from '../../components/employer/companies/CompaniesSideSection';
import CompaniesSideBar from '../../components/employer/companies/CompaniesSideBar';
import CompaniesSection from '../../components/employer/companies/CompaniesSection';

function EmployerCompanies() {
  const [toggleJobSection, setToggleJobSection] = useState(false);
  const [query, setQuery] = useState({});
  const dispatch = useDispatch();

  return (
		<div className="max-w-[1440px] py-8 mx-auto px-7 grid lg:grid-cols-4">
			<CompaniesSideSection setQuery={setQuery} query={query} />
			<CompaniesSideBar
				toggleValue={toggleJobSection}
				setToggleValue={setToggleJobSection}
				setQuery={setQuery}
				query={query}
			/>
			<CompaniesSection
				query={query}
				setQuery={setQuery}
				toggleValue={toggleJobSection}
				setToggleValue={setToggleJobSection}
			/>
		</div>
  );
}

export default EmployerCompanies
import React, { useEffect, useState } from "react";

import CompanySideSection from "../../components/employee/companies/CompanySideSection";
import CompanySideBar from "../../components/employee/companies/CompanySideBar";
import CompanySection from "../../components/employee/companies/CompanySection";

function HomeCompanies() {
  const [toggleJobSection, setToggleJobSection] = useState(false);
  const [query, setQuery] = useState({});


  return (
		<div className="max-w-[1440px] py-8 mx-auto px-7 grid lg:grid-cols-4">
			<CompanySideSection setQuery={setQuery} query={query} />
			<CompanySideBar
				toggleValue={toggleJobSection}
				setToggleValue={setToggleJobSection}
				setQuery={setQuery}
				query={query}
			/>
			<CompanySection
				query={query}
				setQuery={setQuery}
				toggleValue={toggleJobSection}
				setToggleValue={setToggleJobSection}
			/>
		</div>
  );
}

export default HomeCompanies;

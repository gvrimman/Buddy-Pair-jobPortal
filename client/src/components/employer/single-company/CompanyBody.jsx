import React from "react";
import OpenJobs from "../../employee/single-company/OpenJobs";
import SingleCompanyBox from "../../employee/single-company/SingleCompanyBox";
import { useSelector } from "react-redux";

function CompanyBody() {
  	const { company } = useSelector((state) => state.employer);

  return (
		<div className="grid lg:grid-cols-3 gap-4 mt-5">
			<div className="lg:col-span-2">
				<h1 className="text-lg font-semibold">About Company</h1>
				<p className="mt-4 mr-3 text-slate-600 tracking-wide leading-relaxed">
					{company?.companyDescription}
				</p>
				<div className="hidden lg:block">
					{/* <OpenJobs  openJobs={openJobs?.totalJobs}/> */}
				</div>
			</div>
			{/* <SingleCompanyBox company={selectedCompany} /> */}
			<div className="block lg:hidden">
				{/* <OpenJobs openJobs={openJobs?.totalJobs} /> */}
			</div>
		</div>
  );
}

export default CompanyBody;

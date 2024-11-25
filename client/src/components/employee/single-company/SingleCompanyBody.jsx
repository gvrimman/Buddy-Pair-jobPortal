import React, { useEffect } from "react";
import SingleCompanyBox from "./SingleCompanyBox";
import OpenJobs from "./OpenJobs";
import { useDispatch, useSelector } from "react-redux";

function SingleCompanyBody() {
const { company } = useSelector((state) => state.employer);
  const dispatch = useDispatch()


  return (
		<div className="grid lg:grid-cols-3 gap-4 mt-5">
			<div className="lg:col-span-2">
				<h1 className="text-lg font-semibold">About Company</h1>
				<p className="mt-4 mr-3 text-slate-600 tracking-wide leading-relaxed">
					{company?.companyDescription}
				</p>
				<div className="hidden lg:block">
					<OpenJobs openJobs={company?.totalJobs} />
				</div>
			</div>
			<SingleCompanyBox company={company} />
			<div className="block lg:hidden">
				<OpenJobs openJobs={company?.totalJobs}/>
			</div>
		</div>
  );
}

export default SingleCompanyBody;

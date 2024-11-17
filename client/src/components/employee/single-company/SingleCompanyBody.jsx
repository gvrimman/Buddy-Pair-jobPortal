import React, { useEffect } from "react";
import SingleCompanyBox from "./SingleCompanyBox";
import OpenJobs from "./OpenJobs";
import { useDispatch, useSelector } from "react-redux";

function SingleCompanyBody() {
  const { selectedCompany, openJobs, success} = useSelector((state) => state.employee);
  const dispatch = useDispatch()

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(resetEmployeeSuccess())
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);
  return (
    <div className="grid lg:grid-cols-3 gap-4 mt-5">
      <div className="lg:col-span-2">
        <h1 className="text-lg font-semibold">About Company</h1>
        <p className="mt-4 mr-3 text-slate-600 tracking-wide leading-relaxed">
          {selectedCompany?.aboutCompany}
        </p>
        <div className="hidden lg:block">
          <OpenJobs openJobs={openJobs?.totalJobs} />
        </div>
      </div>
      <SingleCompanyBox company={selectedCompany} />
      <div className="block lg:hidden">
          <OpenJobs openJobs={openJobs?.totalJobs}/>
        </div>
    </div>
  );
}

export default SingleCompanyBody;

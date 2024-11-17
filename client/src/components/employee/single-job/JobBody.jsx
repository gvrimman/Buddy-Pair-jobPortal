import React from "react";
import { useSelector } from "react-redux";

function JobBody() {
  const { selectedJob } = useSelector((state) => state.employee);
  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="px-3 grid gap-4">
        <div className="grid gap-3">
          <h3 className="text-lg font-semibold tracking-wide">
            Job Description
          </h3>
          <p className="text-sm text-slate-600 font-semibold leading-relaxed tracking-wider">
            {selectedJob?.description.replace(/'/g, "")}
          </p>
        </div>
        <div className="grid gap-3">
          <h3 className="text-lg font-semibold tracking-wide">About Company</h3>
          <p className="text-sm text-slate-600 font-semibold leading-relaxed tracking-wider">
            {selectedJob?.owner?.aboutCompany}
          </p>
        </div>
      </div>
    </div>
  );
}

export default JobBody;

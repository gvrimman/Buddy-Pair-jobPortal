import React from "react";
import { useSelector } from "react-redux";

function CandidateEducation() {
  const { candidate } = useSelector((state) => state.employer);

  return (
    <div className="mt-5 grid gap-3">
      <h1 className="text-lg font-semibold tracking-wide">Education</h1>
      <div className="px-1 flex gap-4 items-center">
        <div className="w-8 h-8 flex justify-center items-center bg-theme-100 text-theme-500 font-semibold rounded-full">
          {candidate?.educationInstitute?.charAt(0) || "?"}
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold tracking-wide">
            {candidate?.qualification || "No qualification"}
          </h3>
          <h3 className="mt-2 text-sm text-theme-500 font-semibold tracking-wide">
            {candidate?.educationInstitute || "No institute"}
          </h3>
        </div>
        <div className="h-fit px-4 py-1 bg-theme-100 text-sm text-theme-500 font-semibold rounded-full">
          {candidate?.educationType || "N/A"}
        </div>
      </div>
    </div>
  );
}

export default CandidateEducation;

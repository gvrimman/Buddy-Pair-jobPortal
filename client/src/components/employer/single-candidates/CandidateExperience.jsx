import React from "react";
import { useSelector } from "react-redux";

function CandidateExperience() {
  const { candidate } = useSelector((state) => state.employer);

  return (
    <div className="mt-5 grid gap-3">
      <h1 className="text-lg font-semibold tracking-wide">
        Recent Work Experience
      </h1>
      {candidate?.jobDetails?.jobTitle ? (
        <div className="px-1 flex gap-4 items-center">
          <div className="w-8 h-8 flex justify-center items-center bg-theme-100 text-theme-500 font-semibold rounded-full">
            {candidate?.jobDetails?.companyName?.charAt(0) || "?"}
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold tracking-wide">
              {candidate?.jobDetails?.jobTitle || "No job title"}
            </h3>
            <h3 className="mt-2 text-sm text-theme-500 font-semibold tracking-wide">
              {candidate?.jobDetails?.companyName || "No company name"}
            </h3>
          </div>
          <div className="h-fit px-4 py-1 bg-theme-100 text-sm text-theme-500 font-semibold rounded-full">
            💵 {candidate?.jobDetails?.cTc || "N/A"}
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          No recent work experience found.
        </p>
      )}
    </div>
  );
}

export default CandidateExperience;

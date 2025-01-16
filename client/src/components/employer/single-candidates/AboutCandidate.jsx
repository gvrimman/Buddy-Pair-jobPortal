import React from "react";
import { useSelector } from "react-redux";

function AboutCandidate() {
  const { candidate } = useSelector((state) => state.employer);

  return (
    <div className="grid gap-3">
      <h1 className="text-lg font-semibold tracking-wide">About Candidate</h1>
      <p className="px-1 text-sm text-gray-700 tracking-wider leading-relaxed">
        {candidate?.about || "No details provided about the candidate."}
      </p>
    </div>
  );
}


export default AboutCandidate;

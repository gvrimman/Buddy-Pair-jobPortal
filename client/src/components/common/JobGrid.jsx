import React from "react";
import JobCard from "./JobCard";

function JobGrid({ data }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-5">
      {data.map((job, idx) => (
        <JobCard key={idx} data={job} />
      ))}
    </div>
  );
}

export default JobGrid;

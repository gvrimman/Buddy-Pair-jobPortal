import React from "react";
import { GrLocation } from "react-icons/gr";
import { IoBagHandleOutline } from "react-icons/io5";
import { GoClock } from "react-icons/go";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function OpenJobs({ openJobs }) {
  const navigate = useNavigate();

  return (
    <div className="mt-5">
      <h1 className="text-xl font-semibold tracking-wider">Available Jobs</h1>
      {openJobs.length === 0 ? (
        <h2 className="mx-2 my-4 text-sm text-slate-700 font-semibold tracking-wider">
          Currently, there are no job openings at this company. Please check
          back later for future opportunities.
        </h2>
      ) : (
        <div className="grid my-3">
          {openJobs?.map((job, index) => (
            <div
              key={index}
              className="bg-[#f7f7f8] grid gap-4  my-2 p-4 rounded-md border hover:shadow-lg  "
            >
              <h2
                className="text-lg hover:text-blue-500 font-semibold tracking-wide cursor-pointer"
                onClick={() => navigate(`/job-portal/employee/job/${job._id}`)}
              >
                {job.title}
              </h2>
              <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    <IoBagHandleOutline />
                  </span>
                  <p className="text-sm capitalize">{job.owner?.companyName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    <GrLocation />
                  </span>
                  <p className="text-sm capitalize">{job.jobPlace}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    <GoClock />
                  </span>
                  <p className="text-sm capitalize">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    <FaMoneyBill1Wave />
                  </span>
                  <p className="text-sm capitalize">{job.offeredSalary}</p>
                </div>
              </div>
              <div className="w-fit">
                <p className="capitalize text-xs md:text-sm bg-blue-100 text-blue-600 font-semibold tracking-wider outline-none px-4 py-2 rounded-xl">
                  employmentType
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OpenJobs;

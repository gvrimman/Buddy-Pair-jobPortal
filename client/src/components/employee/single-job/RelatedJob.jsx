import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IoBookmarkOutline } from "react-icons/io5";

import JobIconDetails from "../JobIconDetails";

function RelatedJob() {
  const { relatedJobs } = useSelector((state) => state.employee);
  const { id } = useParams();

  const year = new Date().getFullYear();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBookMark = (id) => {
    dispatch(setJobBookMarked(id));
  };

  
  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="px-3 grid gap-3">
        <h1 className="text-xl font-semibold tracking-wide">Related Jobs</h1>
        <p className="text-sm text-slate-500 tracking-wider">
          {year} jobs live
        </p>

        <div className="grid gap-4">
          {relatedJobs?.map((job, index) => (
            <div
              key={index}
              className="p-4 flex justify-between items-start gap-3 border shadow-lg rounded-xl"
            >
              <div className="grid md:flex gap-3">
                <div className="flex justify-start ">
                  <img
                    src={job.owner?.companyLogo}
                    className="w-12 h-12 object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>

                <div className="mx-auto grid gap-3">
                  <h3
                    className="text-base md:text-lg font-semibold hover:text-blue-500 tracking-wide cursor-pointer"
                    onClick={() =>
                      navigate(`/job-portal/employee/job/${job._id}`)
                    }
                  >
                    {job.title}
                  </h3>

                  <JobIconDetails job={job} />

                  <div className="w-fit">
                    <p className="capitalize text-xs md:text-sm bg-blue-100 text-blue-600 font-semibold tracking-wider outline-none px-4 py-2 rounded-xl">
                      {job.employmentType}
                    </p>
                  </div>
                </div>
              </div>

              <div className="transform -translate-y-2">
                <button onClick={() => handleBookMark(job._id)} className="w-10 h-10 flex justify-center items-center text-lg hover:bg-slate-200 rounded-full">
                  <IoBookmarkOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RelatedJob;

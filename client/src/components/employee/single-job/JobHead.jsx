import React from "react";
import upwork from "/assets/images/upworklogo.png";
import { useDispatch, useSelector } from "react-redux";
import { IoBookmarkOutline } from "react-icons/io5";

import JobIconDetails from "../JobIconDetails";
import { setJobApplied, setJobBookMarked } from "../../../../redux/employeeSlice";

function JobHead() {
  const { selectedJob } = useSelector((state) => state.employee);
  const dispatch = useDispatch();

  const handleBookMark = (id) => {
    dispatch(setJobBookMarked(id));
  };

  const handleJobApplying = (id) => {
    dispatch(setJobApplied(id));
  };

  return (
    <div className="w-full h-full py-16 bg-customBgColor flex justify-center items-center">
      <div className="grid gap-3">
        <div className="mx-auto">
          <img
            src={selectedJob ? selectedJob.owner?.companyLogo : upwork}
            className="w-12 h-12 object-cover rounded-lg"
          />
        </div>
        
        <h1 className="text-center text-xl md:text-2xl font-black tracking-wider">
          {selectedJob?.title}
        </h1>

        <JobIconDetails center={true} job={selectedJob} />
        
        <div className="w-fit mx-auto">
          <p className="capitalize text-xs md:text-sm bg-blue-100 text-blue-600 font-semibold tracking-wider outline-none px-4 py-2 rounded-xl">
            {selectedJob?.employmentType}
          </p>
        </div>

        <div className="mt-3 flex justify-center items-center gap-4">
          <button onClick={() => handleJobApplying(selectedJob?._id)} className="w-fit px-5 py-3 bg-blue-500 hover:bg-blue-600 text-sm text-white font-semibold tracking-wider rounded-lg">
            Apply Job
          </button>
          <button onClick={() => handleBookMark(selectedJob?._id)} className="p-3 text-lg bg-blue-100 hover:bg-blue-500 text-blue-500 hover:text-[#fff] cursor-pointer rounded-lg">
            <IoBookmarkOutline />
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobHead;

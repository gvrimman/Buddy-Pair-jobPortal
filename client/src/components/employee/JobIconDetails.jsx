import React from "react";
import { GrLocation } from "react-icons/gr";
import { IoBagHandleOutline } from "react-icons/io5";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { GoClock } from "react-icons/go";

function JobIconDetails({job, center}) {
  return (
    <div className={`${center && "mx-auto"} grid md:flex md:items-center gap-[5px] md:gap-[18px]`}>
      <div className="flex items-center gap-2">
        <span className="text-lg">
          <IoBagHandleOutline />
        </span>
        <p className="text-sm sm:text-base capitalize">{job?.owner?.companyName}</p>
      </div>

      <div className="capitalize flex items-center gap-2">
        <span className="text-lg">
          <GrLocation />
        </span>
        <p className="text-sm sm:text-base capitalize">{job?.jobPlace} || London,Uk</p>
      </div>

      <div className="flex items-center gap-2 ">
        <span className="text-lg">
          <GoClock />
        </span>
        <p className="text-sm sm:text-base capitalize">
          {new Date(job?.deadline).toLocaleDateString()} || Aug, 10, 2024
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-lg">
          <FaMoneyBill1Wave />
        </span>
        <p className="text-sm sm:text-base capitalize">{job?.offeredSalary} || 40000</p>
      </div>
    </div>
  );
}

export default JobIconDetails;

import React from "react";
import { useSelector } from "react-redux";

import { GrLocation } from "react-icons/gr";
import { MdOutlineEmail } from "react-icons/md";
import { IoBookmarkOutline } from "react-icons/io5";

function SingleCompanyHead() {
  const { selectedCompany} = useSelector((state) => state.employee);
  
  return (
    <div className="w-full h-full py-16 bg-customBgColor flex justify-center items-center">
      <div className="grid gap-3">
        <div className="mx-auto">
          <img
            src={selectedCompany?.companyLogo}
            className="w-12 h-12 object-cover rounded-lg"
          />
        </div>

        <h1 className="text-center text-xl md:text-2xl font-black tracking-wider">
          {selectedCompany?.companyName}
        </h1>

        <div className="flex gap-3">
          <div className="flex gap-2 items-center">
            <span className="text-lg">
              <MdOutlineEmail />
            </span>
            <p className="text-sm sm:text-base">{selectedCompany?.companyMail}</p>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-lg font-semibold">
              <GrLocation />
            </span>
            <p className="text-sm sm:text-base capitalize">{selectedCompany?.companyAddress?.city}</p>
          </div>
        </div>

        <div className="mt-3 flex justify-center items-center gap-4">
          <button className="w-fit px-5 py-3 bg-blue-500 hover:bg-blue-600 text-sm text-white font-semibold tracking-wider rounded-lg">
            Apply Job
          </button>
          <button className="p-3 text-lg bg-blue-100 hover:bg-blue-500 text-blue-500 hover:text-[#fff] cursor-pointer rounded-lg">
            <IoBookmarkOutline />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleCompanyHead;

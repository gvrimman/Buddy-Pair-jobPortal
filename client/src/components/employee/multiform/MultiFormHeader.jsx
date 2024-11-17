import React from "react";
import { useSelector } from "react-redux";

function MultiFormHeader() {
  const { pageIndex, pageTitle } = useSelector((state) => state.employeeInfo);
  return (
    <div className="h-28 grid items-center grid-cols-4 ">
      {pageTitle.map((text, index) => (
        <div key={index} className="flex justify-center items-center gap-3">
          <div
            className={`w-10 h-10 flex justify-center items-center ${
              pageIndex === index + 1 ? "bg-green-500" : "bg-[#673ab7]"
            }  text-white text-lg font-medium  rounded-full`}
          >
            {index + 1}
          </div>
          <p className="hidden lg:block capitalize text-lg font-medium">
            {text}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MultiFormHeader;

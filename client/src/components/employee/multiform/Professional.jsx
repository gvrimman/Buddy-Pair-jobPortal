import React, { useState } from "react";

import { FaArrowRotateRight } from "react-icons/fa6";
import { FaArrowRotateLeft } from "react-icons/fa6";

import PersonalProject from "./PersonalProject";
import Certificate from "./Certificate";

function Professional() {
  const [rotate, setRotate] = useState(true);

  return (
    <div className="lg:w-4/12 h-[78%] mx-auto my-3 bg-white p-4 shadow-lg">
      <div className="flex justify-between">
        <div>
          {rotate ? (
            <h1 className="text-lg font-semibold">Your Project</h1>
          ) : (
            <h1 className="text-lg font-semibold">Your Certificate </h1>
          )}
        </div>
        <div
          onClick={() => setRotate(!rotate)}
          className="w-8 h-8 p-1 flex items-center justify-center bg-sky-100 text-[#673ab7] rounded-full cursor-pointer"
        >
          {rotate ? <FaArrowRotateRight /> : <FaArrowRotateLeft />}
        </div>
      </div>
      {rotate ? <PersonalProject /> : <Certificate />}
    </div>
  );
}

export default Professional;

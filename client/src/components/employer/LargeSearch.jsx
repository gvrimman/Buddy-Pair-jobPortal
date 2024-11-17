import React from "react";

import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";

function LargeSearch() {
  return (
    <div className="hidden lg:block">
      <form
        noValidate
        autoComplete="off"
        className="flex  bg-white w-fit mt-4 px-5 py-8 rounded-lg shadow-lg"
      >
        <div className="flex items-center gap-2 text-slate-950">
          <div className="text-xl ">
            <CiSearch />
          </div>
          <input
            className="outline-none bg-white"
            type="text"
            placeholder="job title or candidate"
          />
        </div>
        <div className="flex items-center gap-2 text-slate-950">
          <div className="text-xl ">
            <CiLocationOn />
          </div>
          <input
            className="outline-none bg-white"
            type="text"
            placeholder="City or postcode"
          />
        </div>
        <button className="outline-none bg-[#673ab7] text-white px-5 py-3 rounded-md">
          Find Candidates
        </button>
      </form>
    </div>
  );
}

export default LargeSearch;

import React from "react";

import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";

function NormalSearch() {
  return (
    <div className="w-full grid justify-center md:justify-start lg:hidden mt-4 px-4">
      <form noValidate autoComplete="off" className="grid gap-3">
        <div className="px-3 py-4 flex items-center gap-2 bg-white text-slate-950 rounded-md shadow-md shadow-slate-400 ">
          <div className="text-xl ">
            <CiSearch />
          </div>
          <input
            className="bg-white outline-none"
            type="text"
            placeholder="job title or company"
          />
        </div>
        <div className="px-3 py-4 flex items-center gap-2 bg-white text-slate-950 rounded-md shadow-md shadow-slate-400">
          <div className="text-xl ">
            <CiLocationOn />
          </div>
          <input
            className="bg-white outline-none"
            type="text"
            placeholder="City or postcode"
          />
        </div>
        <button className="outline-none bg-[#673ab7] text-white px-5 py-3 rounded-md">
          Find Jobs
        </button>
      </form>
    </div>
  );
}

export default NormalSearch;

import React, { useEffect, useState } from "react";

import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function NormalSearchInput() {
  const [inputValue, setInputValue] = useState({
    title: "",
    jobPlace: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  return (
    <div className="w-full grid justify-center md:justify-start lg:hidden mt-4 px-4">
      <form noValidate autoComplete="off" className="grid gap-3">
        <div className="px-3 py-4 flex items-center gap-2 bg-white text-slate-950 rounded-md shadow-md shadow-slate-400 ">
          <div className="text-xl ">
            <CiSearch />
          </div>
          <input
            className="outline-none"
            type="text"
            placeholder="job title"
            name="title"
          />
        </div>
        <div className="px-3 py-4 flex items-center gap-2 bg-white text-slate-950 rounded-md shadow-md shadow-slate-400">
          <div className="text-xl ">
            <CiLocationOn />
          </div>
          <input
            className="outline-none"
            type="text"
            placeholder="Location"
            name="jobPlace"
          />
        </div>
        <button
          className="outline-none bg-[#673ab7] text-white px-5 py-3 rounded-md"
        >
          Find Jobs
        </button>
      </form>
    </div>
  );
}

export default NormalSearchInput;

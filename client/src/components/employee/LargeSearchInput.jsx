import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";


function LargeSearchInput() {
  const [inputValue, setInputValue] = useState({
    title: "",
    jobPlace: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();



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
            className="outline-none"
            type="text"
            placeholder="job title"
            name="title"
          />
        </div>
        <div className="flex items-center gap-2 text-slate-950">
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

export default LargeSearchInput;

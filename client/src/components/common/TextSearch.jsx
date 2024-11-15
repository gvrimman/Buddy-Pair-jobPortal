import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
// import { useJobSearchContext } from "../../../../context/JobSearchContext";

function TextSearch({ firsttitle, secondtitle }) {
  const [inputValue, setInputValue] = useState({
    title: "",
    jobPlace: "",
  });
  // const { clearSearch, setSearchTexts } = useJobSearchContext();

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });  
  };

  // useEffect(() => {
  //   setSearchTexts(inputValue);
  // }, [inputValue, setSearchTexts]);

  // useEffect(() => {
  //   if (clearSearch) {
  //     setInputValue({ title: "", jobPlace: "" });
  //   }
  // }, [clearSearch, setInputValue]);

  return (
    <div className=" h-fit grid gap-4">
      <h1 className="font-semibold text-lg">{firsttitle}</h1>
      <div className="w-fit px-3 py-3 flex justify-between items-center gap-2 border-1 border-[#ecedf2] text-slate-950 bg-white rounded-md">
        <div className="mt-1">
          <CiSearch />
        </div>
        <input
          className="w-fit outline-none"
          type="text"
          placeholder="job title"
          name="title"
          value={inputValue.title}
          onChange={handleChange}
        />
      </div>

      <h1 className="font-semibold text-lg">{secondtitle}</h1>
      <div className="w-fit px-3 py-3 flex justify-between items-center gap-2 border-1 border-[#ecedf2] text-slate-950 bg-white rounded-md">
        <div className="mt-1">
          <CiLocationOn />
        </div>
        <input
          className="outline-none"
          type="text"
          placeholder="City "
          name="jobPlace"
          value={inputValue.jobPlace}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default TextSearch;

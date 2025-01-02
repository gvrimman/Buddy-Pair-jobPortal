import React, { useState } from "react";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { CgClose, CgSortAz } from "react-icons/cg";
import DropdownCheckbox from "./DropdownCheckbox";
import { MdFilterAltOff } from "react-icons/md";
import { RiFilterFill } from "react-icons/ri";

import {
	experienceData,
	filterSkillOptions,
	joiningDayRange,
	preferredJobType,
	salaryRanges,
} from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../../Redux/reducers/employeeReducer";

function Filter({search}) {
	const { query } = useSelector((state) => state.employee);
	const dispatch = useDispatch();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isFilterOpen, setIsFilterOpen] = useState(false);

	const handleChange = (e) => {
		dispatch(setQuery({ ...query, [e.target.name]: e.target.value }));
	};
	return (
    <div className="sm:flex flex-col items-center bg-white pt-3 sticky top-0 z-10 px-2">
      <div className="flex gap-2 flex-wrap w-full sm:flex-nowrap sm:z-50">
        <Input
          onChange={handleChange}
          onFocus={() => setIsFilterOpen(true)}
          label="search by canditates"
          className="text-sm"
          type="text"
          name="name"
          value={query?.name || ""}
        />
        <Input
          onChange={handleChange}
          onFocus={() => setIsFilterOpen(true)}
          label="search by location"
          className="text-sm"
          type="text"
          name="location"
          value={query?.location || ""}
        />
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`outline-none border bg-[#e0c7f8] text-lg text-purple-800 font-semibold p-3 rounded-md shadow-none hidden ${
            isFilterOpen ? "sm:hidden" : "sm:block"
          }`}
        >
          <span>
            <RiFilterFill />
          </span>
        </button>
      </div>
      <div className="flex gap-2 items-center sm:hidden">
        <Button
          className="w-full my-2 bg-purple-500 text-white"
          onClick={search}
        >
          search
        </Button>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="outline-none border bg-[#e0c7f8] text-lg text-purple-500 font-semibold p-3 rounded-md shadow-none"
        >
          <span>
            <RiFilterFill />
          </span>
        </Button>
      </div>
      <div
        onClick={() => setIsModalOpen(false)}
        className={`bg-[#0000005d] fixed inset-0 transition duration-300 sm:hidden ${
          isModalOpen ? "visible" : "invisible"
        }`}
      />
      <div
        className={`fixed z-30 rounded-t-2xl bg-white bottom-0 left-0 right-0 h-[65dvh] w-full px-3 sm:px-0 sm:static sm:flex gap-3 items-end transition-all 
					${isFilterOpen ? "sm:h-fit py-3" : "sm:invisible sm:max-h-0"}
					${isModalOpen ? "translate-y-0" : "translate-y-[100%] sm:translate-y-0"}`}
      >
        <div className="text-end sm:hidden">
          <Button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-300 p-2 text-black text-base rounded-full"
          >
            <span>
              <CgClose />
            </span>
          </Button>
        </div>
        <div className="mb-4 mt-4 sm:m-0 flex flex-col sm:flex-row sm:flex-wrap gap-3 w-full ">
          <div className="flex-1 min-w-fit">
            <DropdownCheckbox
              label={"Employment Type"}
              option={preferredJobType}
            />
          </div>

          <div className="flex-1 min-w-fit">
            <DropdownCheckbox label={"Experience"} option={experienceData} />
          </div>
          <div className="flex-1 min-w-fit">
            <DropdownCheckbox label={"Skills"} option={filterSkillOptions} />
          </div>
          <div className="flex-1 min-w-fit">
            <DropdownCheckbox label={"Salary Range"} option={salaryRanges} />
          </div>
          <div className="flex-1 min-w-fit">
            <DropdownCheckbox label={"Joining Days"} option={joiningDayRange} />
          </div>
        </div>

        <div className="absolute bottom-5 left-3 right-3 sm:static flex gap-2">
          <Button
            onClick={() => {
              search(), setIsFilterOpen(false);
            }}
            className="w-full sm:w-fit outline-none border bg-purple-500 text-sm text-white font-semibol rounded-md shadow-none p-2"
          >
            apply
          </Button>
          <Button
            onClick={() => {
              setIsFilterOpen(false);
            }}
            className="outline-none border bg-[#f8c9c7] text-xl text-red-500 font-semibold rounded-md shadow-none p-2"
          >
            <span>
              <MdFilterAltOff />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Filter;

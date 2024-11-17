import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { GrAdd } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import { IoSaveOutline } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
  setNextPageIndex,
  setPrevPageIndex,
} from "../../../../redux/employeeInfoSlice";
import { resetEmployeeSuccess } from "../../../../redux/employeeSlice";

function MultiFormBtns({ saveParentValue }) {
  const { pageIndex } = useSelector((state) => state.employeeInfo);
  const { loading, success } = useSelector((state) => state.employee);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePrevBtn = () => {
    dispatch(setPrevPageIndex(pageIndex - 1));
  };

  const handleNextBtn = () => {
    saveParentValue();
  };

  const handleSkipBtn = () => {
    dispatch(setNextPageIndex(pageIndex + 1));
  }

  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => {
        console.log("Success", success);
        dispatch(resetEmployeeSuccess());
        dispatch(setNextPageIndex(pageIndex + 1));

        if (pageIndex === 4) {
          navigate("/job-portal/employee");
        }
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [success, pageIndex, dispatch]);

  const handleSaveBtn = () => {
    saveParentValue();
  };

  return (
    <div className="grid gap-3">
      {/* <div className="flex justify-end gap-2 mt-2">
        <button className="h-10 w-10 flex justify-center items-center text-xl bg-sky-100 text-red-500 font-medium  rounded-full ">
          <AiOutlineDelete />
        </button>
        <button className="h-10 w-10 flex justify-center items-center text-xl bg-sky-100 text-[#673ab7] font-medium  rounded-full ">
          <GrAdd />
        </button>
      </div> */}
      <div className="my-3 flex justify-between items-center">
        <div>
          <button
            onClick={handlePrevBtn}
            className={`${
              pageIndex === 1 ? "hidden" : "flex"
            } h-10 w-10 justify-center items-center text-xl bg-[#673ab7] text-white font-medium rounded-full`}
          >
            <GrLinkPrevious />
          </button>
        </div>
        <div className="flex gap-3">
          <button
          onClick={handleSkipBtn}
            className={`${
              pageIndex === 4 ? "hidden" : "flex"
            } px-4 justify-center items-center text-sm bg-blue-600 text-white font-semibold tracking-wider rounded-full`}
          >Skip</button>
          
          <button
            onClick={handleNextBtn}
            className={`${
              pageIndex === 4 ? "hidden" : "flex"
            } h-10 w-10 justify-center items-center text-xl bg-[#673ab7] text-white font-medium rounded-full`}
          >
            {loading ? (
              <span className="animate-spin">
                <AiOutlineLoading3Quarters />
              </span>
            ) : (
              <GrLinkNext />
            )}
          </button>
          <button
            onClick={handleSaveBtn}
            className={`${
              pageIndex === 4 ? "flex" : "hidden"
            } capitalize h-10 w-10 justify-center items-center text-xl bg-[#673ab7] text-white font-medium rounded-full`}
          >
            <IoSaveOutline />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MultiFormBtns;

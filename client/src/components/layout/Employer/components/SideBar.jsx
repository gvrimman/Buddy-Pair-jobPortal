import React, { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { IoMdClose } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { employerSideBarLinks } from "../../../../utils/Links";


function SideBar({ value, setValue }) {
  // const { logoutSuccess } = useSelector((state) => state.userAuth);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setUserLocalLogout());
  };

  // useEffect(() => {
  //   if (logoutSuccess) {
  //     const timer = setTimeout(() => {
  //       setValue(true);
  //       navigate("/auth/signin");
  //     }, 2000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [logoutSuccess, navigate]);

  return (
    <div
      className={`w-5/6 md:w-2/6 h-screen absolute top-3 bg-white  transition-all ease-in-out duration-500 ${
        value ? "-left-[85%]" : "left-5"
      }`}
    >
      <div className="flex flex-col gap-2">
        <div className="my-3 flex justify-between items-center">
          <h1 className=" antialiased tracking-wide  text-xl font-bold">
            JOB PORTAL
          </h1>
          <div
            onClick={() => setValue(true)}
            className="w-fit text-md font-medium border-2 border-slate-700 rounded-full p-1 cursor-pointer"
          >
            <IoMdClose />
          </div>
        </div>
        {employerSideBarLinks?.map((item) => (
          <NavLink
            className={` mt-2 flex items-center gap-4 px-3 py-2 font-semibold ${
              pathname === item.path &&
              " scale-105 translate-x-1 bg-[#ede7f6] text-[#673ab7] border-1 "
            } transition ease-in-out duration-300 hover:bg-[#ede7f6] hover:text-[#673ab7] hover:font-semibold rounded-md`}
            to={item.path}
            key={item.text}
            onClick={() => setValue(true)}
          >
            <span className="text-lg">{item.icon}</span>
            <p className="capitalize antialiased text-md">{item.text}</p>
          </NavLink>
        ))}
        <NavLink
          className="mt-2 flex items-center gap-4 px-3 py-2 font-semibold  
        hover:scale-105 hover:translate-x-1  
        transition ease-in-out duration-300 hover:bg-[#ede7f6] hover:text-[#673ab7] hover:font-semibold rounded-md"
          onClick={handleLogout}
        >
          <span className="text-lg">
            <CiLogout />
          </span>
          <p className="capitalize antialiased text-md">Logout</p>
        </NavLink>
      </div>
    </div>
  );
}

export default SideBar;

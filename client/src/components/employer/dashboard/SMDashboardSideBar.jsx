import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { employerDashboardLinks } from "../../../utils/Links";


function SMDashboardSideBar({ setValue }) {
  const { pathname } = useLocation();
  return (
    <div className="xl:hidden h-full px-4 mt-10 border-r">
      <div
        onClick={() => setValue(false)}
        className="my-4 w-fit ml-auto  font-medium border-2 border-slate-700 rounded-full p-[6px] cursor-pointer"
      >
        <IoMdClose />
      </div>
      <div className="flex flex-col gap-2">
        {employerDashboardLinks?.map((item, index) => (
          <NavLink
            key={index}
            className={`flex items-center gap-4 px-3 py-3 font-semibold  ${
              pathname === item.path && "bg-[#ede7f6] text-[#673ab7] border-1 "
            } transition ease-in-out duration-300 hover:bg-[#ede7f6] hover:text-[#673ab7] hover:font-semibold rounded-md`}
            onClick={() => setValue(false)}
            to={item.path}
          >
            <span className="text-lg">{item.icon}</span>
            <p className="capitalize antialiased text-sm lg:text-base">
              {item.text}
            </p>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default SMDashboardSideBar;

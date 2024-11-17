import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { employerDashboardLinks } from "../../../utils/Links";


function DashboardSideBar() {
  const { pathname } = useLocation();
  return (
    <div className="hidden fixed xl:block my-5 mx-[20px] ">
      <div className="flex flex-col gap-2">
        {employerDashboardLinks?.map((item, index) => (
          <NavLink
            className={`flex items-center gap-4 ps-2 pr-5 py-3 font-semibold  ${
              pathname === item.path && " bg-[#ede7f6] text-[#673ab7] border-1 "
            } transition ease-in-out duration-300 hover:bg-[#ede7f6] hover:text-customViolet hover:font-semibold rounded-md`}
            to={item.path}
            key={index}
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

export default DashboardSideBar;

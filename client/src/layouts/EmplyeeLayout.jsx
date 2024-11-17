import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LargeHeader from "../components/employee/LargeHeader";
import NormalHeader from "../components/employee/NormalHeader";



function EmployeeLayout() {
  const [toggleSideBar, setToggleSideBar] = useState(true);
  const [hide, setHide] = useState(true);


  return (
    <div className=" bg-[#f7f7f8] antialiased">
      {hide && (
        <div className="fixed top-0 left-0 right-0 z-20">
          <LargeHeader />
          <NormalHeader value={toggleSideBar} setValue={setToggleSideBar} />
        </div>
      )}

      <div
        className={` ${hide ? "relative mt-[60px] " : ""} ${
          toggleSideBar ? "" : "blur-md"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default EmployeeLayout;

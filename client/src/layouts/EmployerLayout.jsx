import React, { useEffect, useState } from "react";

import { Outlet, useLocation } from "react-router-dom";
// import { useAuthContext } from "../../../context/AuthContext";
import { useDispatch } from "react-redux";
// import { getUnreadUserMessages } from "../../../redux/chatSlice";
import LargeHeader from "../components/employer/LargeHeader";
import NormalHeader from "../components/employer/NormalHeader";

function EmployerLayout() {
  const [toggleSideBar, setToggleSideBar] = useState(true);
  const [hide, setHide] = useState(true);
  const { pathname } = useLocation();
  // const { userId } = useAuthContext();
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getUnreadUserMessages(userId));
  // }, [dispatch, userId]);

  useEffect(() => {
    if (pathname === "/employer/information-form") {
      setHide(false);
    }
  }, [pathname]);

  return (
    <div className="relative  bg-customBgColor">
      {hide && (
        <div className="fixed top-0 left-0 right-0 z-20">
          <LargeHeader />
          <NormalHeader value={toggleSideBar} setValue={setToggleSideBar} />
        </div>
      )}
      <div
        className={`${hide ? "absolute top-[85px] left-0 right-0 " : ""} ${
          !toggleSideBar && "blur-md"
        } `}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default EmployerLayout;

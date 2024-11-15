import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { setUserLocalLogout } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

function  ProfileMenu({ drop, setDrop, from }) {
  const { logoutSuccess } = useSelector((state) => state.userAuth)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // dispatch(setUserLocalLogout());
  };

  useEffect(() => {
    if (logoutSuccess) {
      const timer = setTimeout(() => {
        navigate("/auth/signin");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [logoutSuccess, navigate])

  const handleDashboardBtn = () => {  
    if (from === "employer") {
      navigate("/job-portal/employer/dashboard");
    } else if (from === "employee") {
      navigate("/job-portal/employee/dashboard");
    }
    setDrop(!drop);
  };
  
  return (
    <div className="grid gap-2 absolute top-16 right-10 bg-white px-3 py-3 border-1 shadow-md rounded-lg ">
      <button
        onClick={handleDashboardBtn}
        className="w-full tracking-wide text-[#673ab7] font-semibold border-1 p-2 rounded-lg hover:bg-[#ede7f6]"
      >
        Dashboard
      </button>
      <button
        onClick={handleLogout}
        className="w-full tracking-wide text-[#673ab7] font-semibold border-1 p-2 rounded-lg hover:bg-[#ede7f6]"
      >
        Logout
      </button>
    </div>
  );
}

export default ProfileMenu;

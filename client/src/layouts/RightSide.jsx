import React, { useState } from "react";
import { NavLink, useNavigate, Link, useLocation } from "react-router-dom";
import { RiLogoutCircleLine, RiLoginCircleLine } from "react-icons/ri";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../Redux/reducers/userReducer";
import axiosInstance from "../utils/axios";
import { persistor } from "../Redux/store/store";
import { showError, showSuccess } from "../utils/toast";

function RightSide() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.user);
  const [showPolicySubMenu, setShowPolicySubMenu] = useState(false);
  // side bar links
  const Links = [
    {
      title: "Home",
      link: "/job-portal",
    },
    {
      title: "Profile",
      link: "/job-portal/profile",
    },
    {
      title: "Jobs",
      link: "/job-portal/jobs",
    },
    {
      title: "Applied jobs",
      link: "/job-portal/requests",
    },
    {
      title: "Messages",
      link: "/job-portal/messages",
    },
    {
      title: "Notifications",
      link: "/job-portal/notifications",
    },
    {
      title: "About Us",
      link: "/job-portal/about-us",
    },
    {
      title: "Contact Us",
      link: "/job-portal/contact-us",
    },
  ];

  const SubMenuLinks = [
    {
      title: "Privacy Policy",
      link: "/job-portal/privacy-policy",
    },
    {
      title: "Refund Policy",
      link: "/job-portal/refund-policy",
    },
    {
      title: "Terms & Conditions",
      link: "/job-portal/terms-conditions",
    },
  ];

  const logout = async () => {
    try {
			const response = await axiosInstance.post("auth/logout");
			showSuccess(response?.data?.message);
			dispatch(clearUser());
			persistor.purge();
      localStorage.setItem("redirectPath", location.pathname + location.search);
			navigate("/");
		} catch (error) {
			showError(error?.response?.data?.message);
		}
  };

  return (
    <div className="w-[20vw] p-3 rounded-lg bg-white border-2 border-purple-500 hidden md:block h-screen sticky top-1">
      <div className="flex items-center gap-3">
        {userInfo && (
          <div className="w-14 border-pink-400 border-[3px] overflow-hidden aspect-square rounded-full">
            <img
              className="h-full w-full"
              src={
                userInfo && userInfo?.apps?.jobPortal?.profileImage
                  ? userInfo?.apps?.jobPortal?.profileImage
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNJryFTSQUV8Zuu_EGw2iUCpMbIIKWHBl2eQ&s"
              }
              alt={userInfo?.username}
            />
          </div>
        )}
        {userInfo && (
          <div>
            <h5 className="font-bold text-sm text-pink-600">
              {userInfo?.username}
            </h5>
            <span className="text-xs font-medium text-green-700 leading-2">
              Online
            </span>
          </div>
        )}
      </div>
      <div className=" mt-7">
        <ul className="overflow-auto h-[calc(100vh-150px)] hide-scrollbar">
          {Links.map((link, i) => (
            <li
              key={i}
              className="font-semibold text-gray-800 my-1 hover:bg-purple-200 rounded-lg hover:text-white transition-all ease-in-out duration-300"
            >
              <NavLink
                end={true}
                to={link?.link}
                className={({ isActive }) =>
                  isActive
                    ? "block p-2 bg-white border-2 border-purple-500 rounded-lg text-purple-500 hover:bg-purple-100"
                    : "block p-2"
                }
              >
                {link?.title}
              </NavLink>
            </li>
          ))}
          <li className="font-semibold text-gray-800 my-1 hover:bg-purple-200 rounded-lg hover:text-white transition-all ease-in-out duration-300">
            <button
              className="w-full text-left block p-2 rounded-lg"
              onClick={() => setShowPolicySubMenu(!showPolicySubMenu)}
            >
              <span className="flex gap-1 items-center">
                Policy{" "}
                {showPolicySubMenu ? <MdArrowDropUp /> : <MdArrowDropDown />}
              </span>
            </button>
          </li>
          {showPolicySubMenu &&
            SubMenuLinks.map((link, i) => (
              <li
                key={i}
                className="font-semibold ml-3 text-gray-800 my-1 hover:bg-purple-200 rounded-lg hover:text-white transition-all ease-in-out duration-300"
              >
                <NavLink
                  end={true}
                  to={link?.link}
                  className={({ isActive }) =>
                    isActive
                      ? "block p-2 bg-white border-2 border-purple-500 rounded-lg text-purple-500 hover:bg-purple-100"
                      : "block p-2"
                  }
                >
                  {link?.title}
                </NavLink>
              </li>
            ))}
        </ul>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          {userInfo ? (
            <button
              onClick={logout}
              className="flex items-center gap-2 font-semibold text-gray-800 w-full rounded hover:underline underline-offset-2"
            >
              <RiLogoutCircleLine />
              <span>Logout</span>
            </button>
          ) : (
            <Link
              to={"/"}
              className="flex items-center gap-2 font-semibold text-gray-800 w-full rounded hover:underline underline-offset-2"
            >
              <RiLoginCircleLine />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default RightSide;

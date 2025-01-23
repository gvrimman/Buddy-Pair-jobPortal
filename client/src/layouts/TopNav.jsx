import React, { useEffect, useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { BsBell } from "react-icons/bs";
import { NavLink, useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../Redux/reducers/userReducer";
import axiosInstance from "../utils/axios";
import { persistor } from "../Redux/store/store";
import { showError, showSuccess } from "../utils/toast";
import { RiLogoutCircleLine, RiLoginCircleLine } from "react-icons/ri";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";

// side bar links
const RightLinks = [
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

const RightSubMenuLinks = [
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

const LeftLinks = [
  {
    title: "Professional Community",
    link: "/comingsoon",
  },
  {
    title: "Job Portal",
    link: "/job-portal",
  },
  {
    title: "Matrimony",
    link: "/comingsoon",
  },
  {
    title: "E commerce",
    link: "/comingsoon",
  },
  {
    title: "Study Abroad",
    link: "/comingsoon",
  },
];

function TopNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const [leftShow, setLeftShow] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const [showPolicySubMenu, setShowPolicySubMenu] = useState(false);

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

  useEffect(() => {
    if (location.pathname === "/job-portal/messages") {
      setHideNav(true);
    } else {
      setHideNav(false);
    }
  }, [location.pathname]);

  return (
    <div
      className={`md:hidden mx-2 py-3 flex items-center justify-between shadow sticky top-0 z-50 bg-white ${
        hideNav && "hidden"
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          onClick={() => setLeftShow(true)}
          className="text-3xl text-theme-600"
        >
          <HiMenuAlt1 />
        </span>
        <h2 className="font-bold text-2xl text-theme-500">BuddyPair</h2>
      </div>
      <div className="flex items-center gap-3">
        <NavLink
          to="/job-portal/notifications"
          className="text-3xl text-theme-600"
        >
          <BsBell />
        </NavLink>
        {userInfo ? (
          <div
            onClick={() => setShow(!show)}
            className="w-11 border-theme-400 border-[3px] overflow-hidden aspect-square rounded-full"
          >
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
        ) : (
          <span
            onClick={() => setShow(!show)}
            className="text-4xl text-theme-600 me-1"
          >
            <IoPersonCircleOutline />
          </span>
        )}
      </div>

      {/* rigt side menu */}
      {show && (
        <>
          <div
            onClick={() => setShow(false)}
            className="fixed inset-0 bg-transparent backdrop-blur-sm"
          />
          <div className="absolute right-0 left-10 top-0 bg-theme-400 bg-opacity-95 p-4 rounded-lg shadow-lg">
            <div className="flex items-center gap-3 relative">
              {userInfo && (
                <div className="w-14 border-theme-600 border-[3px] overflow-hidden aspect-square rounded-full">
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
                  <h5 className="font-bold text-sm text-theme-700">
                    {userInfo?.username}
                  </h5>
                  <span className="text-xs font-medium text-gray-800 leading-2">
                    Online
                  </span>
                </div>
              )}

              <span
                onClick={() => setShow(false)}
                className="absolute right-0 top-0 text-theme-900 text-2xl"
              >
                <IoMdCloseCircleOutline />
              </span>
            </div>

            {/* menus */}
            <div className=" mt-7">
              <ul className="overflow-auto h-[calc(100vh-260px)] hide-scrollbar">
                {RightLinks.map((link, i) => (
                  <li
                    key={i}
                    className="font-semibold text-gray-800 my-1 hover:bg-theme-200 rounded-lg hover:text-white transition-all ease-in-out duration-300"
                  >
                    <NavLink
                      end={true}
                      to={link?.link}
                      className={({ isActive }) =>
                        isActive
                          ? " block p-2 bg-theme-500 text-white rounded-lg"
                          : "block p-2"
                      }
                    >
                      {link?.title}
                    </NavLink>
                  </li>
                ))}
                <li className="font-semibold text-gray-800 my-1 hover:bg-theme-200 rounded-lg hover:text-white transition-all ease-in-out duration-300">
                  <button
                    className="w-full text-left block p-2 rounded-lg"
                    onClick={() => setShowPolicySubMenu(!showPolicySubMenu)}
                  >
                    <span className="flex gap-1 items-center">
                      Policy{" "}
                      {showPolicySubMenu ? (
                        <MdArrowDropUp />
                      ) : (
                        <MdArrowDropDown />
                      )}
                    </span>
                  </button>
                </li>
                {showPolicySubMenu &&
                  RightSubMenuLinks.map((link, i) => (
                    <li
                      key={i}
                      className="font-semibold ml-3 text-gray-800 my-1 hover:bg-theme-200 rounded-lg hover:text-white transition-all ease-in-out duration-300"
                    >
                      <NavLink
                        end={true}
                        to={link?.link}
                        className={({ isActive }) =>
                          isActive
                            ? " block p-2 bg-theme-500 text-white rounded-lg"
                            : "block p-2"
                        }
                      >
                        {link?.title}
                      </NavLink>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="mt-7">
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
        </>
      )}

      {/* left side menu */}
      {leftShow && (
        <>
          <div
            onClick={() => setLeftShow(false)}
            className="fixed inset-0 bg-transparent backdrop-blur-sm"
          />
          <div className="absolute right-10 w-3/4 left-0 top-0 bg-theme-400 bg-opacity-95 p-4 rounded-lg shadow-lg">
            <span
              onClick={() => setLeftShow(false)}
              className="absolute right-3 top-3 text-theme-900 text-2xl"
            >
              <IoMdCloseCircleOutline />
            </span>
            {/* menus */}
            <div className=" mt-4">
              <ul>
                {LeftLinks.map((link, i) => (
                  <li
                    key={i}
                    className="font-semibold text-gray-800 my-1 hover:bg-theme-200 rounded-lg hover:text-white transition-all ease-in-out duration-300"
                  >
                    <NavLink
                      to={link?.link}
                      className={({ isActive }) =>
                        isActive
                          ? " block p-2 bg-theme-500 text-white rounded-lg"
                          : "block p-2"
                      }
                    >
                      {link?.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TopNav;

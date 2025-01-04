import React, { useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { BsBell } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../Redux/reducers/userReducer";
import { RiLogoutCircleLine } from "react-icons/ri";
import { IoMdCloseCircleOutline } from "react-icons/io";

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
];

const LeftLinks = [
	{
		title: "Proffessional Community",
		link: "/",
	},
  {
		title: "Job Portal",
		link: "/job-portal/",
	},
	{
		title: "Matirimony",
		link: "/",
	},
	{
		title: "E commerce",
		link: "/",
	},
	{
		title: "Study Abroad",
		link: "/",
	},
];

function TopNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
	const { userInfo } = useSelector((state) => state.user);
	const [show, setShow] = useState(false);
	const [leftShow, setLeftShow] = useState(false);

  const logout = () => {
    dispatch(clearUser());
    navigate("/");
  };

	return (
    <div className="md:hidden mx-2 py-3 flex items-center justify-between shadow sticky top-0 z-50 bg-white">
      <div className="flex items-center gap-2">
        <span
          onClick={() => setLeftShow(true)}
          className="text-3xl text-purple-600"
        >
          <HiMenuAlt1 />
        </span>
        <h2 className="font-bold text-2xl text-purple-700">BuddyPair</h2>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-3xl text-purple-600">
          <BsBell />
        </span>
        <div
          onClick={() => setShow(!show)}
          className="w-11 border-pink-400 border-[3px] overflow-hidden aspect-square rounded-full"
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
      </div>

      {/* rigt side menu */}
      {show && (
        <>
          <div
            onClick={() => setShow(false)}
            className="fixed backdrop-blur inset-0"
          />
          <div className="absolute right-0 left-10 top-0 bg-gradient-to-t from-purple-100 to-purple-200 p-4 rounded-lg drop-shadow">
            <div className="flex items-center gap-3 relative">
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
              <div>
                <h5 className="font-bold text-sm text-pink-600">
                  {userInfo?.username}
                </h5>
                <span className="text-xs font-medium text-green-700 leading-2">
                  Online
                </span>
              </div>

              <span
                onClick={() => setShow(false)}
                className="absolute right-0 top-0 text-purple-900 text-2xl"
              >
                <IoMdCloseCircleOutline />
              </span>
            </div>

            {/* menus */}
            <div className=" mt-7">
              <ul>
                {RightLinks.map((link, i) => (
                  <li
                    key={i}
                    className="font-semibold text-gray-600 my-1 hover:bg-purple-200 rounded-lg hover:text-white transition-all ease-in-out duration-300"
                  >
                    <NavLink
                      to={link?.link}
                      className={({ isActive }) =>
                        isActive
                          ? " block p-2 bg-purple-500 text-white rounded-lg"
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
              <button
                onClick={logout}
                className="flex items-center gap-2 font-semibold text-gray-800 w-full rounded hover:underline underline-offset-2"
              >
                <RiLogoutCircleLine />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* left side menu */}
      {leftShow && (
        <>
          <div
            onClick={() => setLeftShow(false)}
            className="fixed backdrop-blur inset-0"
          />
          <div className="absolute right-10 left-0 top-0 bg-gradient-to-t from-purple-100 to-purple-200 p-4 rounded-lg drop-shadow">
            <span
              onClick={() => setLeftShow(false)}
              className="absolute right-3 top-3 text-purple-900 text-2xl"
            >
              <IoMdCloseCircleOutline />
            </span>
            {/* menus */}
            <div className=" mt-4">
              <ul>
                {LeftLinks.map((link, i) => (
                  <li
                    key={i}
                    className="font-semibold text-gray-600 my-1 hover:bg-purple-200 rounded-lg hover:text-white transition-all ease-in-out duration-300"
                  >
                    <NavLink
                      to={link?.link}
                      className={({ isActive }) =>
                        isActive
                          ? " block p-2 bg-purple-500 text-white rounded-lg"
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

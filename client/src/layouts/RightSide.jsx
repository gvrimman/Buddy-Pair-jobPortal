import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../Redux/reducers/userReducer";

function RightSide() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
	const { userInfo } = useSelector((state) => state.user);
	// side bar links
	const Links = [
		{
			title: "Home",
			link: "/job-portal/",
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

  const logout = () => {
    dispatch(clearUser());
    navigate("/");
  };

	return (
    <div className="w-[20vw] p-3 rounded-lg bg-gradient-to-t from-purple-50 to-purple-100 hidden md:block h-screen sticky top-1">
      <div className="flex items-center gap-3">
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
      </div>
      <div className=" mt-7">
        <ul>
          {Links.map((link, i) => (
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
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <button
            onClick={logout}
            className="flex items-center gap-2 font-semibold text-gray-800 w-full rounded hover:underline underline-offset-2"
          >
            <RiLogoutCircleLine />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RightSide;

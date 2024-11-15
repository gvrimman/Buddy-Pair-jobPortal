import { AiOutlineHome } from "react-icons/ai";
import jobportalApp from "/assets/images/jobportal.jpg";
import { FiUsers } from "react-icons/fi";
import { GrOrganization } from "react-icons/gr";
import { IoSettingsOutline, IoBookmarkOutline } from "react-icons/io5";
import { CiPaperplane } from "react-icons/ci";
import { FaRegFileArchive } from "react-icons/fa";

import {
	RiMessage2Line,
	RiDeleteBin6Line,
	RiLogoutCircleRLine,
} from "react-icons/ri";
import { MdOutlineWorkOutline } from "react-icons/md";

export const apps = [
	{
		title: "Job Portal",
		caption: "Explore job opportunities and advance your career.",
		image: jobportalApp,
	},
];

export const employerSideBarLinks = [
	{
		path: "/job-portal/employer",
		text: "home",
		icon: <AiOutlineHome />,
		url: "",
	},
	{
		path: "/job-portal/employer/candidates",
		text: "candidates",
		icon: <FiUsers />,
		url: "job-portal/employer/candidates",
	},
	{
		path: "/job-portal/employer/companies",
		text: "companies",
		icon: <GrOrganization />,
		url: "job-portal/employer/companies",
	},
	{
		path: "/job-portal/employer/saved-candidates",
		text: "saved",
		icon: <IoBookmarkOutline />,
		url: "job-portal/employer/saved",
	},
	{
		path: "/job-portal/employer/dashboard/messages",
		text: "messages",
		icon: <RiMessage2Line />,
		url: "job-portal/employer/messages",
	},
	// {
	//   path: "/job-portal/employer/notifications",
	//   text: "notifications",
	//   icon: <IoMdNotificationsOutline />,
	//   url: "job-portal/employer/notifications",
	// },
];

export const employerDashboardLinks = [
	{
		path: "/job-portal/employer/dashboard",
		text: "dashboard",
		icon: <AiOutlineHome />,
	},
	{
		path: "/job-portal/employer/dashboard/company-profile",
		text: "company profile",
		icon: <FiUsers />,
	},
	{
		path: "/job-portal/employer/dashboard/post-job",
		text: "post a new job",
		icon: <CiPaperplane />,
	},
	{
		path: "/job-portal/employer/dashboard/manage-jobs",
		text: "manage-jobs",
		icon: <MdOutlineWorkOutline />,
	},
	{
		path: "/job-portal/employer/dashboard/all-applicants",
		text: "all applicants",
		icon: <FaRegFileArchive />,
	},
	// {
	//   path: "/employer/dashboard/shortlisted-resumes",
	//   text: "shortlisted resumes",
	//   icon: <IoBookmarkOutline />,
	// },
	{
		path: "/job-portal/employer/dashboard/messages",
		text: "messages",
		icon: <RiMessage2Line />,
	},
	// {
	//   path: "/employer/dashboard/notifications",
	//   text: "notifications",
	//   icon: <IoMdNotificationsOutline />,
	// },
];
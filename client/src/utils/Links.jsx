import { GrOrganization } from "react-icons/gr";
import { MdOutlineWorkOutline } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { IoBookmarkOutline } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegFileArchive } from "react-icons/fa";
import { CiPaperplane } from "react-icons/ci";
import { RiMessage2Line } from "react-icons/ri";
import { BsSuitcaseLg } from "react-icons/bs";
import { HiOutlineLockClosed } from "react-icons/hi2";

import jobportalApp from "/assets/images/jobportal.jpg";

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
	{
		path: "/job-portal/employer/dashboard/notifications",
		text: "notifications",
		icon: <IoMdNotificationsOutline />,
	},
];

export const employeeDashboardLinks = [
	{
		path: "/job-portal/employee/dashboard",
		text: "dashboard",
		icon: <AiOutlineHome />,
	},
	{
		path: "/job-portal/employee/dashboard/profile",
		text: "profile",
		icon: <FiUsers />,
	},
	
	{
		path: "/job-portal/employee/dashboard/applied-jobs",
		text: "applied jobs",
		icon: <BsSuitcaseLg />,
	},
	{
		path: "/job-portal/employee/dashboard/bookmarked-jobs",
		text: "bookmarked jobs",
		icon: <IoBookmarkOutline />,
	},
	{
		path: "/job-portal/employee/dashboard/messages",
		text: "messages",
		icon: <RiMessage2Line />,
	},
	{
		path: "/job-portal/employee/dashboard/notification",
		text: "notifications",
		icon: <IoMdNotificationsOutline />,
	},
	{
		path: "/job-portal/employee/dashboard/change-password",
		text: "change password",
		icon: <HiOutlineLockClosed />,
	},
];

export const employeeLinks = [
	{
		path: "/job-portal/employee",
		text: "home",
		icon: <AiOutlineHome />,
		url: "",
	},
	{
		path: "/job-portal/employee/jobs",
		text: "find jobs",
		icon: <MdOutlineWorkOutline />,
		url: "employee/jobs",
	},
	{
		path: "/job-portal/employee/companies",
		text: "companies",
		icon: <GrOrganization />,
		url: "employee/companies",
	},
	{
		path: "/job-portal/employee/dashboard/bookmarked-jobs",
		text: "bookmarked jobs",
		icon: <IoBookmarkOutline />,
		url: "employee/saved",
	},
	{
		path: "/job-portal/employee/dashboard/messages",
		text: "messages",
		icon: <RiMessage2Line />,
		url: "employee/dashboard/messages",
	},
	// {
	//   path: "/job-portal/employee/notifications",
	//   text: "notifications",
	//   icon: <IoMdNotificationsOutline />,
	//   url: "employee/notifications",
	// },
];

import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { getJobById } from "../../apis/employeeApi";
import { TbLoader2 } from "react-icons/tb";
import JobCard from "../../components/common/JobCard";
import ProfileCard from "../../components/common/ProfileCard";

const jobsData = [
	{
		title: "Frontend Developer",
		location: "Kochi, Kerala",
		salary: "₹6 LPA - ₹10 LPA",
		noticePeriod: "30 Days",
		skills: ["React", "JavaScript", "CSS"],
	},
	{
		title: "Backend Developer",
		location: "Thiruvananthapuram, Kerala",
		salary: "₹8 LPA - ₹12 LPA",
		noticePeriod: "Immediate",
		skills: ["Node.js", "MongoDB", "AWS"],
	},
	{
		title: "Full Stack Developer",
		location: "Kozhikode, Kerala",
		salary: "₹10 LPA - ₹15 LPA",
		noticePeriod: "15 Days",
		skills: ["React", "Node.js", "AWS"],
	},
	{
		title: "DevOps Engineer",
		location: "Kochi, Kerala",
		salary: "₹7 LPA - ₹11 LPA",
		noticePeriod: "45 Days",
		skills: ["Docker", "Kubernetes", "CI/CD"],
	},
	{
		title: "Software Engineer",
		location: "Thrissur, Kerala",
		salary: "₹5 LPA - ₹9 LPA",
		noticePeriod: "30 Days",
		skills: ["Python", "Django", "PostgreSQL"],
	},
	{
		title: "Product Manager",
		location: "Kochi, Kerala",
		salary: "₹12 LPA - ₹18 LPA",
		noticePeriod: "Immediate",
		skills: ["Agile", "Scrum", "JIRA"],
	},
	{
		title: "Data Scientist",
		location: "Kannur, Kerala",
		salary: "₹10 LPA - ₹14 LPA",
		noticePeriod: "15 Days",
		skills: ["Python", "Machine Learning", "SQL"],
	},
	{
		title: "AI Engineer",
		location: "Kottayam, Kerala",
		salary: "₹15 LPA - ₹20 LPA",
		noticePeriod: "60 Days",
		skills: ["TensorFlow", "PyTorch", "Deep Learning"],
	},
	{
		title: "QA Engineer",
		location: "Kochi, Kerala",
		salary: "₹4 LPA - ₹6 LPA",
		noticePeriod: "30 Days",
		skills: ["Selenium", "Java", "Cypress"],
	},
	{
		title: "Mobile Developer",
		location: "Thiruvananthapuram, Kerala",
		salary: "₹7 LPA - ₹10 LPA",
		noticePeriod: "30 Days",
		skills: ["Flutter", "React Native", "Kotlin"],
	},
	{
		title: "Game Developer",
		location: "Kochi, Kerala",
		salary: "₹9 LPA - ₹13 LPA",
		noticePeriod: "30 Days",
		skills: ["Unity", "C#", "Blender"],
	},
	{
		title: "Network Engineer",
		location: "Thrissur, Kerala",
		salary: "₹6 LPA - ₹9 LPA",
		noticePeriod: "Immediate",
		skills: ["Cisco", "Networking", "VPN"],
	},
	{
		title: "Security Analyst",
		location: "Kannur, Kerala",
		salary: "₹8 LPA - ₹12 LPA",
		noticePeriod: "15 Days",
		skills: ["Cybersecurity", "Firewalls", "Incident Response"],
	},
	{
		title: "UI Designer",
		location: "Kochi, Kerala",
		salary: "₹5 LPA - ₹8 LPA",
		noticePeriod: "15 Days",
		skills: ["Figma", "Sketch", "Adobe XD"],
	},
	{
		title: "Cloud Architect",
		location: "Thiruvananthapuram, Kerala",
		salary: "₹14 LPA - ₹20 LPA",
		noticePeriod: "30 Days",
		skills: ["AWS", "Azure", "GCP"],
	},
];

function PostedJobView() {
	const { job, isLoading } = useSelector((state) => state.employee);
	const { jobId } = useParams();
	const dispatch = useDispatch();

	const [activeTab, setActiveTab] = useState(0);

	useEffect(() => {
		dispatch(getJobById(jobId));
	}, [jobId, dispatch]);

	return (
		<div className="max-w-[900px] w-full">
			<div
				className={`fixed inset-0  bg-gray-500 opacity-30 transition  ${
					isLoading ? "block" : "hidden"
				}`}></div>
			<span
				className={`text-purple-900 text-2xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ${
					isLoading ? "block" : "hidden"
				} `}>
				<TbLoader2 className="animate-spin text-lg" />
			</span>
			<div className=" py-2 px-2 rounded-md shadow-md border text-gray-700 text-sm">
				<h4 className="text-center font-semibold text-md">
					{job?.jobTitle}
				</h4>
			</div>
			<div className="my-4  shadow-lg border py-3 px-2 rounded-md text-sm leading-6">
				<p>{job?.jobDescription}</p>
			</div>

			<div className="md:grid md:grid-cols-2 md:gap-5">
				<div className="my-4 shadow-lg border py-3 px-2 rounded-md flex gap-2 flex-wrap items-center">
					{job?.skills.map((skill, idx) => (
						<div
							key={idx}
							className=" bg-purple-50 text-purple-600 w-fit px-4 py-1 rounded-full text-sm font-medium">
							{skill}
						</div>
					))}
				</div>

				<div className="my-4 shadow-lg border py-3 px-2 rounded-md flex items-center gap-2">
					<div className="flex items-center gap-1 bg-purple-50 text-purple-600 w-fit px-4 py-1 rounded-full text-sm font-medium">
						<span>Salary</span>
					</div>
					<span>:</span>
					<div className="flex items-center gap-1 bg-purple-50 text-purple-600 w-fit px-4 py-1 rounded-full text-sm font-medium">
						<span>
							<FaIndianRupeeSign />
						</span>
						<span>{job?.offeredSalary}</span>
					</div>
				</div>

				<div className="my-4  py-3 px-2 rounded-md shadow-lg border  text-sm">
					<p className="font-normal leading-7">
						Experience:{" "}
						<span className="font-semibold">{job?.experience}</span>
					</p>
					<p className="font-normal leading-7">
						Location:{" "}
						<span className="font-semibold">
							{job?.jobPlace}({job?.jobLocation})
						</span>
					</p>
					<p className="font-normal leading-7">
						Application Deadline:{" "}
						<span className="font-semibold">
							{job?.deadline.split("T")[0]}
						</span>
					</p>
					<p className="font-normal leading-7">
						Employment Type:{" "}
						<span className="font-semibold">
							{job?.employmentType}
						</span>
					</p>
				</div>
			</div>

			{/* view applicants requests tab view */}
            <h4 className="font-semibold text-fs-sm underline underline-offset-4 mt-4">Recieved Applicants</h4>
			<div className="mt-5 sticky top-10">
				<div className="grid grid-cols-3 relative bg-white h-12 rounded-full border border-purple-300">
					{["Pending", "Approved", "Rejected"].map((tab, index) => (
						<button
							key={index}
							onClick={() => setActiveTab(index)}
							className={`text-sm font-medium m-1 py-2 rounded-full transition text-center ${
								activeTab === index
									? "bg-purple-500 text-white shadow-md"
									: "text-gray-600 hover:bg-purple-100 hover:text-purple-500"
							}`}>
							{tab}
						</button>
					))}
				</div>
				{/* job card grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-5">
					{jobsData.map((job, i) => (
						<ProfileCard key={i} data={job} />
					))}
				</div>
			</div>
		</div>
	);
}

export default PostedJobView;

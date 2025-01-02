import React, { useState } from "react";
import JobCard from "../../components/common/JobCard";

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
function RequestsView() {
	const [activeTab, setActiveTab] = useState(0);

	return (
		<div className="max-w-[900px] w-full">
			<div className="mx-2">
				<div className="grid grid-cols-3 relative bg-white h-12 rounded-full border border-purple-300">
					{["Requests", "Accepted", "Rejected"].map((tab, index) => (
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
						<JobCard key={i} data={job} />
					))}
				</div>
			</div>
		</div>
	);
}

export default RequestsView;

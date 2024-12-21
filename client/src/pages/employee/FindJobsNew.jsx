import React, { useState } from "react";

const FindJobsNew = () => {
  const [activeTab, setActiveTab] = useState(0);
   const jobData = [
     [
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
     ],
     [
       {
         title: "UI/UX Designer",
         location: "Kochi, Kerala",
         salary: "₹6 LPA - ₹9 LPA",
         noticePeriod: "15 Days",
         skills: ["Figma", "Sketch", "Adobe XD"],
       },
       {
         title: "Graphic Designer",
         location: "Thiruvananthapuram, Kerala",
         salary: "₹4 LPA - ₹6 LPA",
         noticePeriod: "Immediate",
         skills: ["Photoshop", "Illustrator", "InDesign"],
       },
       {
         title: "Web Developer",
         location: "Kochi, Kerala",
         salary: "₹5 LPA - ₹8 LPA",
         noticePeriod: "30 Days",
         skills: ["HTML", "CSS", "JavaScript"],
       },
       {
         title: "Digital Marketer",
         location: "Kozhikode, Kerala",
         salary: "₹4 LPA - ₹7 LPA",
         noticePeriod: "15 Days",
         skills: ["SEO", "PPC", "Google Ads"],
       },
       {
         title: "Content Writer",
         location: "Kochi, Kerala",
         salary: "₹3 LPA - ₹5 LPA",
         noticePeriod: "15 Days",
         skills: ["Writing", "Editing", "SEO"],
       },
       {
         title: "Social Media Manager",
         location: "Thrissur, Kerala",
         salary: "₹4 LPA - ₹6 LPA",
         noticePeriod: "30 Days",
         skills: ["Facebook Ads", "Instagram", "Twitter"],
       },
       {
         title: "Business Analyst",
         location: "Kochi, Kerala",
         salary: "₹7 LPA - ₹10 LPA",
         noticePeriod: "15 Days",
         skills: ["Excel", "Power BI", "SQL"],
       },
       {
         title: "Project Manager",
         location: "Thiruvananthapuram, Kerala",
         salary: "₹9 LPA - ₹12 LPA",
         noticePeriod: "45 Days",
         skills: ["Agile", "Scrum", "JIRA"],
       },
       {
         title: "Database Administrator",
         location: "Kochi, Kerala",
         salary: "₹8 LPA - ₹11 LPA",
         noticePeriod: "30 Days",
         skills: ["SQL", "PostgreSQL", "Oracle"],
       },
       {
         title: "IT Support Specialist",
         location: "Kannur, Kerala",
         salary: "₹3 LPA - ₹5 LPA",
         noticePeriod: "Immediate",
         skills: ["Help Desk", "Troubleshooting", "Windows"],
       },
       {
         title: "Cloud Engineer",
         location: "Kochi, Kerala",
         salary: "₹10 LPA - ₹14 LPA",
         noticePeriod: "30 Days",
         skills: ["AWS", "Azure", "Kubernetes"],
       },
       {
         title: "Blockchain Developer",
         location: "Kozhikode, Kerala",
         salary: "₹15 LPA - ₹20 LPA",
         noticePeriod: "45 Days",
         skills: ["Solidity", "Ethereum", "Web3.js"],
       },
       {
         title: "Tech Support Engineer",
         location: "Kochi, Kerala",
         salary: "₹5 LPA - ₹7 LPA",
         noticePeriod: "30 Days",
         skills: ["Linux", "Windows Server", "Networking"],
       },
       {
         title: "Penetration Tester",
         location: "Kochi, Kerala",
         salary: "₹10 LPA - ₹14 LPA",
         noticePeriod: "15 Days",
         skills: ["Ethical Hacking", "OWASP", "Nmap"],
       },
       {
         title: "AI Research Scientist",
         location: "Thiruvananthapuram, Kerala",
         salary: "₹18 LPA - ₹25 LPA",
         noticePeriod: "60 Days",
         skills: ["Machine Learning", "NLP", "Deep Learning"],
       },
     ],
   ];

  return (
    <div className="max-w-5xl mx-auto px-7 py-5 pt-8">
      <div className="relative">
        <div className="flex space-x-4 relative bg-white h-12 rounded-full">
          {["Find Jobs", "Similar Jobs"].map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex-1 text-sm font-medium m-1 py-2 rounded-full transition text-center ${
                activeTab === index
                  ? "bg-blue-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-blue-100 hover:text-blue-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-5">
        {jobData[activeTab].map((job, idx) => (
          <div key={idx} className="card bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">{job.title}</h2>
            <p className="text-gray-600 text-sm mb-1">
              <span className="font-medium">Location:</span> {job.location}
            </p>
            <p className="text-gray-600 text-sm mb-1">
              <span className="font-medium">Salary:</span> {job.salary}
            </p>
            <p className="text-gray-600 text-sm mb-3">
              <span className="font-medium">Notice Period:</span>{" "}
              {job.noticePeriod}
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {job.skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindJobsNew;
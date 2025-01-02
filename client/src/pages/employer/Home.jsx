import React, { useEffect, useState } from "react";
import { TbLoader2 } from "react-icons/tb";
import Filter from "./../../components/common/Filter";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  fetchPreferedJobs,
  fetchSimilarProfiles,
} from "../../apis/employeeApi";
import { clearJobs, clearProfiles } from "../../Redux/reducers/employeeReducer";
import ProfileGrid from "../../components/common/ProfileGrid";
import JobGrid from "../../components/common/JobGrid";
const Home = () => {
  const { jobs, profiles, isLoading, hasMore, query } = useSelector(
    (state) => state.employee
  );

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
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
        name: "jone doe",
        title: "UI/UX Designer",
        location: "Kochi, Kerala",
        salary: "₹6 LPA - ₹9 LPA",
        noticePeriod: "15 Days",
        skills: ["Figma", "Sketch", "Adobe XD"],
      },
      {
        name: "jone doe",
        title: "Graphic Designer",
        location: "Thiruvananthapuram, Kerala",
        salary: "₹4 LPA - ₹6 LPA",
        noticePeriod: "Immediate",
        skills: ["Photoshop", "Illustrator", "InDesign"],
      },
      {
        name: "jone doe",
        title: "Web Developer",
        location: "Kochi, Kerala",
        salary: "₹5 LPA - ₹8 LPA",
        noticePeriod: "30 Days",
        skills: ["HTML", "CSS", "JavaScript"],
      },
      {
        name: "jone doe",
        title: "Digital Marketer",
        location: "Kozhikode, Kerala",
        salary: "₹4 LPA - ₹7 LPA",
        noticePeriod: "15 Days",
        skills: ["SEO", "PPC", "Google Ads"],
      },
      {
        name: "jone doe",
        title: "Content Writer",
        location: "Kochi, Kerala",
        salary: "₹3 LPA - ₹5 LPA",
        noticePeriod: "15 Days",
        skills: ["Writing", "Editing", "SEO"],
      },
      {
        name: "jone doe",
        title: "Social Media Manager",
        location: "Thrissur, Kerala",
        salary: "₹4 LPA - ₹6 LPA",
        noticePeriod: "30 Days",
        skills: ["Facebook Ads", "Instagram", "Twitter"],
      },
      {
        name: "jone doe",
        title: "Business Analyst",
        location: "Kochi, Kerala",
        salary: "₹7 LPA - ₹10 LPA",
        noticePeriod: "15 Days",
        skills: ["Excel", "Power BI", "SQL"],
      },
      {
        name: "jone doe",
        title: "Project Manager",
        location: "Thiruvananthapuram, Kerala",
        salary: "₹9 LPA - ₹12 LPA",
        noticePeriod: "45 Days",
        skills: ["Agile", "Scrum", "JIRA"],
      },
      {
        name: "jone doe",
        title: "Database Administrator",
        location: "Kochi, Kerala",
        salary: "₹8 LPA - ₹11 LPA",
        noticePeriod: "30 Days",
        skills: ["SQL", "PostgreSQL", "Oracle"],
      },
      {
        name: "jone doe",
        title: "IT Support Specialist",
        location: "Kannur, Kerala",
        salary: "₹3 LPA - ₹5 LPA",
        noticePeriod: "Immediate",
        skills: ["Help Desk", "Troubleshooting", "Windows"],
      },
      {
        name: "jone doe",
        title: "Cloud Engineer",
        location: "Kochi, Kerala",
        salary: "₹10 LPA - ₹14 LPA",
        noticePeriod: "30 Days",
        skills: ["AWS", "Azure", "Kubernetes"],
      },
      {
        name: "jone doe",
        title: "Blockchain Developer",
        location: "Kozhikode, Kerala",
        salary: "₹15 LPA - ₹20 LPA",
        noticePeriod: "45 Days",
        skills: ["Solidity", "Ethereum", "Web3.js"],
      },
      {
        name: "jone doe",
        title: "Tech Support Engineer",
        location: "Kochi, Kerala",
        salary: "₹5 LPA - ₹7 LPA",
        noticePeriod: "30 Days",
        skills: ["Linux", "Windows Server", "Networking"],
      },
      {
        name: "jone doe",
        title: "Penetration Tester",
        location: "Kochi, Kerala",
        salary: "₹10 LPA - ₹14 LPA",
        noticePeriod: "15 Days",
        skills: ["Ethical Hacking", "OWASP", "Nmap"],
      },
      {
        name: "jone doe",
        title: "AI Research Scientist",
        location: "Thiruvananthapuram, Kerala",
        salary: "₹18 LPA - ₹25 LPA",
        noticePeriod: "60 Days",
        skills: ["Machine Learning", "NLP", "Deep Learning"],
      },
    ],
  ];

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = () => {
    setPage(1);
    if (activeTab) {
      dispatch(clearProfiles());
      dispatch(fetchSimilarProfiles(query));
    } else {
      dispatch(clearJobs());
      dispatch(fetchPreferedJobs(query));
    }
    console.log("jobs: ", jobs);
    console.log("profiles: ", profiles);
  };

  const fetchMoreData = () => {
    if (!hasMore || isLoading) return;

    const nextPage = page + 1;
    setPage(nextPage);
    if (activeTab) {
      dispatch(fetchSimilarProfiles({ ...query, page: nextPage }));
    } else {
      dispatch(fetchPreferedJobs({ ...query, page: nextPage }));
    }
  };

  return (
    <div>
      <Filter search={fetchData} />
      <div className="h-[2px] rounded-lg bg-purple-500 my-4"></div>
      <div className="mx-2">
        <div className="relative">
          <div className="grid grid-cols-2 relative shadow bg-white h-12 rounded-full">
            {["Find Jobs", "Similar Jobs"].map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`text-sm font-medium m-1 py-2 rounded-full transition text-center ${
                  activeTab === index
                    ? "bg-purple-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-purple-100 hover:text-purple-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div
          className={`fixed inset-0  bg-gray-500 opacity-30 transition  ${
            isLoading ? "block" : "hidden"
          }`}
        ></div>
        <span
          className={`text-purple-900 text-2xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ${
            isLoading ? "block" : "hidden"
          } `}
        >
          <TbLoader2 className="animate-spin text-lg" />
        </span>
        <InfiniteScroll
          dataLength={activeTab ? profiles?.length : jobs?.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4 className="text-center font-semibold">Loading...</h4>}
          endMessage={
            <p className="text-center font-semibold mt-5">
              {activeTab ? "No more Profiles" : "No more jobs"}
            </p>
          }
        >
          {activeTab === 0 ? (
            <>
              <div className="mt-10">
                {jobs?.length === 0 &&
                  !isLoading &&(
                    <p className="text-center font-semibold text-2xl">
                      No jobs found! Try searching by job title or location
                    </p>
                  )}
              </div>
              <JobGrid data={jobData[activeTab]} />
            </>
          ) : (
            <>
              <div className="mt-10">
                {profiles?.length === 0 && !isLoading && (
                  <p className="text-center font-semibold text-2xl">
                    No Profiles found! Try searching by title or location
                  </p>
                )}
              </div>
              <ProfileGrid data={jobData[activeTab]} />
            </>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};
export default Home;

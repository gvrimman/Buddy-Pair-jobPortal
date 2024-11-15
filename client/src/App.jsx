import React from "react";
import LandingPage from "./components/layout/Landing/LandingPage";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import SplashScreen from "./components/layout/Landing/SplashScreen";
import Home from "./components/layout/Home/Home";
import EmployerLayout from "./components/layout/Employer/EmployerLayout";
import EmployerHome from "./components/layout/Employer/pages/EmployerHome";
import Candidates from "./components/layout/Employer/pages/Candidates";
import EmployerCompanies from "./components/layout/Employer/pages/EmployerCompanies";
import EmployerInformation from "./components/layout/Employer/pages/EmployerInformation";
import EmployerDashboardLayout from "./components/layout/Employer/EmployerDashboardLayout";
import EmployerDashboard from "./components/layout/Employer/pages/dashboard/EmployerDashboard";
import PostJobs from "./components/layout/Employer/pages/dashboard/PostJobs";

function App() {
	return (
		<div>
			<Routes>
				<Route key={"/"} path="/" element={<Layout />}>
					<Route path="/" element={<LandingPage />} />
					<Route path="/auth" element={<SplashScreen />} />
					<Route path="/home" element={<Home />} />
				</Route>

				{/* This Router for Job Portal Employer */}

				<Route path="/job-portal/employer" element={<EmployerLayout />}>
					<Route index element={<EmployerHome />} />
					<Route path="candidates" element={<Candidates />} />
					<Route path="companies" element={<EmployerCompanies />} />
					{/* <Route
						path="information-form"
						element={<EmployerInformation />}
					/> */}
					{/* <Route path="candidate/:id" element={<SingleCandidate />} /> */}
					{/* <Route
						path="company/:id"
						element={<SingleEmployerCompany />}
					/> */}
				</Route>

				{/* Job Portal Employer Router End */}

				{/* Router for Job Portal Employer Dashboard */}
				<Route
					path="/job-portal/employer/dashboard"
					element={<EmployerDashboardLayout />}>
					<Route index element={<EmployerDashboard />} />
					{/* <Route
						path="company-profile"
						element={<CompanyProfile />}
					/> */}
					<Route path="post-job" element={<PostJobs />} />
					{/* <Route path="manage-jobs" element={<ManageJobs />} /> */}
					{/* <Route path="all-applicants" element={<AllApplicants />} /> */}
					{/* <Route
						path="shortlisted-resumes"
						element={<ShortListed />}
					/> */}
					{/* <Route path="messages" element={<Messages />} /> */}
					{/* <Route path="notifications" element={<Notification />} /> */}
				</Route>

				{/* Job Portal Employer Dashboard End */}
			</Routes>
		</div>
	);
}

export default App;

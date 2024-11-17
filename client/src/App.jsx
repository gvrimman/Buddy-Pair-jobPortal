import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import SplashScreen from "./pages/shared/SplashScreen";
import EmployerHome from "./pages/employer/EmployerHome";
import Candidates from "./pages/employer/Candidates";
import EmployerCompanies from "./pages/employer/EmployerCompanies";
import EmployerInformation from "./pages/employer/EmployerInformation";
import EmployerDashboard from "./pages/employer/dashboard/EmployerDashboard";
import PostJobs from "./pages/employer/dashboard/PostJobs";
import LandingPage from "./pages/shared/LandingPage";
import EmployerLayout from "./layouts/EmployerLayout";
import EmployerDashboardLayout from "./layouts/EmployerDashboardLayout";
import CompanyProfile from "./pages/employer/dashboard/CompanyProfile";
import ManageJobs from "./pages/employer/dashboard/ManageJobs";
import AllApplicants from "./pages/employer/dashboard/AllApplicants";
import EmployeeLayout from "./layouts/EmplyeeLayout";
import EmployeeDashboardLayout from "./layouts/EmployeeDashboardLayout";
import Home from "./pages/employee/Home";
import FindJobs from "./pages/employee/FindJobs";
import HomeCompanies from "./pages/employee/HomeCompanies";
import UpdateJob from "./components/employer/dashboard/manageJobs/UpdateJob";

function App() {
	return (
		<div>
			<Routes>
				<Route key={"/"} path="/" element={<Layout />}>
					<Route path="/" element={<LandingPage />} />
					<Route path="/auth" element={<SplashScreen />} />
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
					<Route
						path="company-profile"
						element={<CompanyProfile />}
					/>
					<Route path="post-job" element={<PostJobs />} />
					<Route path="manage-jobs" element={<ManageJobs />} />
					<Route path="edit-job/:id" element={<UpdateJob />} />
					<Route path="all-applicants" element={<AllApplicants />} />
					{/* <Route
						path="shortlisted-resumes"
						element={<ShortListed />}
					/> */}
					{/* <Route path="messages" element={<Messages />} /> */}
					{/* <Route path="notifications" element={<Notification />} /> */}
				</Route>

				{/* Job Portal Employer Dashboard End */}

				{/* This Router for Job Portal Employee */}

				<Route path="/job-portal/employee" element={<EmployeeLayout />}>
					<Route index element={<Home />} />
					<Route path="jobs" element={<FindJobs />} />
					<Route path="companies" element={<HomeCompanies />} />
					{/* <Route path="saved-jobs" element={<Saved />} /> */}
					{/* <Route path="notifications" element={<Notifications />} /> */}
					{/* <Route
						path="information-form"
						element={<MultiInfoForm />}
					/> */}
					{/* <Route path="job/:id" element={<SingleJob />} /> */}
					{/* <Route path="company/:id" element={<SingleCompany />} /> */}
				</Route>

				{/* Job Portal Employee Router End */}

				{/* This Router for Job Portal Employee Dashboard  */}
				<Route
					path="/job-portal/employee/dashboard"
					element={<EmployeeDashboardLayout />}>
					{/* <Route index element={<EmployeeDashboard />} /> */}
					{/* <Route path="profile" element={<EmployeeProfile />} /> */}
					{/* <Route path="applied-jobs" element={<EmployeeApplied />} /> */}
					{/* <Route
						path="bookmarked-jobs"
						element={<EmployeeBookMarked />}
					/> */}
					{/* <Route path="resume" element={<EmployeeResume />} /> */}
					{/* <Route path="messages" element={<EmployeeMessages />} /> */}
					{/* <Route
						path="notification"
						element={<EmployeeNotification />}
					/> */}
					{/* <Route
						path="change-password"
						element={<EmployeeChangePassword />}
					/> */}
				</Route>

				{/* Job Portal Employee Dashboard End */}
			</Routes>
		</div>
	);
}

export default App;

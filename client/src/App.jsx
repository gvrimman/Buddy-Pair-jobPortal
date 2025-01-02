import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./router/ProtectedRoute";
import EmployeeMessages from "./pages/employee/dashboard/EmployeeMessages";
import Messages from "./pages/employer/dashboard/Messages";
import SingleCompany from "./pages/employee/SingleCompany";
import PublicRoute from "./router/PublicRoute";
import PageLoader from "./pages/shared/PageLoader";
import EmployeeNotification from "./pages/employee/dashboard/EmployeeNotification";
import useListenNotification from "./hooks/useListenNotification";
import { useSocket } from "./hooks/useSocket";
import EmployerNotification from "./pages/employer/dashboard/EmployerNotification";
import Layout from "./layouts/Layout";
import JobportalUserInfo from "./pages/auth/jobportal-auth/jobportalUserInfo";
import JobView from "./pages/employer/JobView";
import ProfileView from "./pages/employer/ProfileView";
import RequestsView from "./pages/employer/RequestsView";
import Jobs from "./pages/employer/Jobs";
// const Layout = lazy(() => import("./components/layout/Layout"));
const SplashScreen = lazy(() => import("./pages/shared/SplashScreen"));
const EmployerHome = lazy(() => import("./pages/employer/EmployerHome"));
const Candidates = lazy(() => import("./pages/employer/Candidates"));
const EmployerCompanies = lazy(() =>
	import("./pages/employer/EmployerCompanies")
);
const EmployerDashboard = lazy(() =>
	import("./pages/employer/dashboard/EmployerDashboard")
);
const PostJobs = lazy(() => import("./pages/employer/dashboard/PostJobs"));
const LandingPage = lazy(() => import("./pages/shared/LandingPage"));
const EmployerLayout = lazy(() => import("./layouts/EmployerLayout"));
const EmployerDashboardLayout = lazy(() =>
	import("./layouts/EmployerDashboardLayout")
);
const CompanyProfile = lazy(() =>
	import("./pages/employer/dashboard/CompanyProfile")
);
const ManageJobs = lazy(() => import("./pages/employer/dashboard/ManageJobs"));
const AllApplicants = lazy(() =>
	import("./pages/employer/dashboard/AllApplicants")
);
const EmployeeLayout = lazy(() => import("./layouts/EmplyeeLayout"));
const EmployeeDashboardLayout = lazy(() =>
	import("./layouts/EmployeeDashboardLayout")
);
const Home = lazy(() => import("./pages/employee/Home"));
const FindJobs = lazy(() => import("./pages/employee/FindJobs"));
const HomeCompanies = lazy(() => import("./pages/employee/HomeCompanies"));
const UpdateJob = lazy(() =>
	import("./components/employer/dashboard/manageJobs/UpdateJob")
);
const SingleJob = lazy(() => import("./pages/employee/SingleJob"));
const Saved = lazy(() => import("./pages/employee/Saved"));
const EmployeeBookMarked = lazy(() =>
	import("./pages/employee/dashboard/EmployeeBookMarked")
);
const EmployeeProfile = lazy(() =>
	import("./pages/employee/dashboard/EmployeeProfile")
);
const EmployeeDashboard = lazy(() =>
	import("./pages/employee/dashboard/EmployeeDashboard")
);
const EmployeeApplied = lazy(() =>
	import("./pages/employee/dashboard/EmployeeApplied")
);
const EmployeeChangePassword = lazy(() =>
	import("./pages/employee/dashboard/EmployeeChangePassword")
);
const SingleCandidate = lazy(() => import("./pages/employer/SingleCandidate"));
const JobApplicatns = lazy(() =>
	import("./pages/employer/dashboard/JobApplicatns")
);
const SingleEmployerCompany = lazy(() =>
	import("./pages/employer/SingleEmployerCompany")
);

function App() {
	useSocket(); // Initializes the socket
	useListenNotification(); // Listens for notifications globally

	return (
		<div>
			<Suspense fallback={<PageLoader />}>
				<Routes>
					<Route key={"/"} path="/" element={<PublicRoute />}>
						<Route index element={<LandingPage />} />
						<Route path="/auth" element={<SplashScreen />} />
					</Route>

					{/* This Router for Job Portal Employer */}

					<Route
						path="/job-portal/auth"
						element={<JobportalUserInfo />}
					/>

					<Route
						path="/job-portal"
						element={<ProtectedRoute roles={["employer"]} />}>
						<Route element={<Layout />}>
							<Route index element={<EmployerHome />} />

							<Route path="profile" element={<ProfileView />} />
							<Route path="job/:id" element={<JobView />} />
							<Route
								path="profile/:id"
								element={<ProfileView />}
							/>
							<Route path="requests" element={<RequestsView />} />
							<Route path="jobs" element={<Jobs />} />
							<Route path="messages" element={<Messages />} />
							<Route
								path="notifications"
								element={<EmployerNotification />}
							/>

							<Route path="candidates" element={<Candidates />} />
							<Route
								path="companies"
								element={<EmployerCompanies />}
							/>
							<Route
								path="candidate/:id"
								element={<SingleCandidate />}
							/>
							<Route
								path="company/:id"
								element={<SingleEmployerCompany />}
							/>
						</Route>
					</Route>

					{/* Router for Job Portal Employer Dashboard */}
					{/* <Route
						path="/job-portal/employer/dashboard"
						element={<ProtectedRoute roles={["employer"]} />}>
						<Route element={<EmployerDashboardLayout />}>
							<Route index element={<EmployerDashboard />} />
							<Route
								path="company-profile"
								element={<CompanyProfile />}
							/>
							<Route path="post-job" element={<PostJobs />} />
							<Route
								path="manage-jobs"
								element={<ManageJobs />}
							/>
							<Route
								path="edit-job/:id"
								element={<UpdateJob />}
							/>
							<Route
								path="all-applicants"
								element={<AllApplicants />}
							/>
							<Route
								path="job-applicants/:id"
								element={<JobApplicatns />}
							/>

							<Route path="messages" element={<Messages />} />
							{
								<Route
									path="notifications"
									element={<EmployerNotification />}
								/>
							}
						</Route>
					</Route> */}

					{/* This Router for Job Portal Employee */}

					{/* <Route
						path="/job-portal/employee"
						element={<ProtectedRoute roles={["employee"]} />}>
						<Route element={<EmployeeLayout />}>
							<Route index element={<Home />} />
							<Route path="jobs" element={<FindJobs />} />
							<Route
								path="companies"
								element={<HomeCompanies />}
							/>
							<Route path="saved-jobs" element={<Saved />} />
							
							<Route path="job/:id" element={<SingleJob />} />
							<Route
								path="company/:id"
								element={<SingleCompany />}
							/>
						</Route>
					</Route> */}

					{/* This Router for Job Portal Employee Dashboard  */}

					{/* <Route
						path="/job-portal/employee/dashboard"
						element={<ProtectedRoute roles={["employee"]} />}>
						<Route element={<EmployeeDashboardLayout />}>
							<Route index element={<EmployeeDashboard />} />
							<Route
								path="profile"
								element={<EmployeeProfile />}
							/>
							<Route
								path="applied-jobs"
								element={<EmployeeApplied />}
							/>
							<Route
								path="bookmarked-jobs"
								element={<EmployeeBookMarked />}
							/>
							<Route
								path="messages"
								element={<EmployeeMessages />}
							/>
							<Route
								path="notification"
								element={<EmployeeNotification />}
							/>
							<Route
								path="change-password"
								element={<EmployeeChangePassword />}
							/>
						</Route>
					</Route> */}
				</Routes>
			</Suspense>
		</div>
	);
}

export default App;

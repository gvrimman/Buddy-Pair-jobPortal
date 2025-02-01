import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import verifyUser from "./utils/verifyAuth";
import { Routes, Route, useLocation } from "react-router-dom";
import useListenNotification from "./hooks/useListenNotification";
import { useSocket } from "./hooks/useSocket";
import { clearUser } from "./Redux/reducers/userReducer";
import { setLogoutFunction } from "./utils/axios";

import ErrorBoundary from "./components/common/ErrorBoundary";
import ProtectedRoute from "./router/ProtectedRoute";
import PublicRoute from "./router/PublicRoute";
import PageLoader from "./pages/shared/PageLoader";
import Layout from "./layouts/Layout";
import EmployerLayout from "./layouts/EmployerLayout";
import EmployerDashboardLayout from "./layouts/EmployerDashboardLayout";
import EmployeeLayout from "./layouts/EmplyeeLayout";
import EmployeeDashboardLayout from "./layouts/EmployeeDashboardLayout";

const NotFound = lazy(() => import("./pages/shared/NotFound"));
const EmployeeMessages = lazy(() =>
  import("./pages/employee/dashboard/EmployeeMessages")
);
const Messages = lazy(() => import("./pages/employer/dashboard/Messages"));
const SingleCompany = lazy(() => import("./pages/employee/SingleCompany"));
const EmployeeNotification = lazy(() =>
  import("./pages/employee/dashboard/EmployeeNotification")
);
const EmployerNotification = lazy(() =>
  import("./pages/employer/dashboard/EmployerNotification")
);
const JobportalUserInfo = lazy(() =>
  import("./pages/auth/jobportal-auth/JobportalUserInfo")
);
const JobView = lazy(() => import("./pages/employer/JobView"));
const ProfileView = lazy(() => import("./pages/employer/ProfileView"));
const RequestsView = lazy(() => import("./pages/employer/RequestsView"));
const Jobs = lazy(() => import("./pages/employer/Jobs"));
const PostedJobView = lazy(() => import("./pages/employer/PostedJobView"));
const AcceptReferral = lazy(() => import("./pages/referral/AcceptReferral"));
const ReferralDashboard = lazy(() =>
  import("./pages/referral/ReferralDashboard")
);
const AdminSettings = lazy(() => import("./pages/referral/AdminSettings"));
const PrivacyPolicy = lazy(() => import("./pages/shared/PrivacyPolicy"));
const RefundPolicy = lazy(() => import("./pages/shared/RefundPolicy"));
const TermsConditions = lazy(() => import("./pages/shared/TermsConditions"));
const AboutUs = lazy(() => import("./pages/shared/AboutUs"));
const ContactUs = lazy(() => import("./pages/shared/ContactUs"));
const ComingSoon = lazy(() => import("./pages/shared/ComingSoon"));
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
const CompanyProfile = lazy(() =>
  import("./pages/employer/dashboard/CompanyProfile")
);
const ManageJobs = lazy(() => import("./pages/employer/dashboard/ManageJobs"));
const AllApplicants = lazy(() =>
  import("./pages/employer/dashboard/AllApplicants")
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
  
  const dispatch = useDispatch();
  const location = useLocation();
  
  useEffect(() => {
    setLogoutFunction(() => {
      dispatch(clearUser());
      localStorage.clear();
      sessionStorage.clear();
    });
    // Verify user authentication on app load
    verifyUser(dispatch, location);
  }, [dispatch]);

  return (
    <div>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route key={"/"} path="/" element={<PublicRoute />}>
              <Route index element={<LandingPage />} />
              <Route path="/auth" element={<SplashScreen />} />
            </Route>

            {/* This Router for Job Portal Employer */}

            {/* <Route
              path="/job-portal/auth"
              element={<JobportalUserInfo />}
            /> */}

            <Route
              path="/job-portal"
              element={<ProtectedRoute roles={["employer"]} />}
            >
              <Route element={<Layout />}>
                <Route index element={<EmployerHome />} />

                <Route path="profile" element={<ProfileView />} />
                <Route path="edit/profile" element={<EmployeeProfile />} />
                <Route
                  path="edit/profile/company"
                  element={<CompanyProfile />}
                />
                <Route path="job/:jobId" element={<JobView />} />
                <Route path="profile/:profileId" element={<ProfileView />} />
                <Route path="requests" element={<RequestsView />} />
                <Route path="jobs" element={<Jobs />} />
                <Route path="jobs/:jobId" element={<PostedJobView />} />
                <Route path="manage/jobs" element={<ManageJobs />} />
                <Route path="edit/job/:id" element={<UpdateJob />} />
                <Route path="jobs/applicants" element={<AllApplicants />} />
                <Route path="jobs/applicants/:id" element={<JobApplicatns />} />
                <Route path="messages" element={<Messages />} />
                <Route
                  path="notifications"
                  element={<EmployerNotification />}
                />

                <Route path="candidates" element={<Candidates />} />
                <Route path="companies" element={<EmployerCompanies />} />
                <Route path="candidate/:id" element={<SingleCandidate />} />
                <Route path="company/:id" element={<SingleEmployerCompany />} />

                <Route path="referral" element={<AcceptReferral />} />
                <Route
                  path="profile/referral"
                  element={<ReferralDashboard />}
                />
                <Route
                  path="referral/admin/settings"
                  element={<AdminSettings />}
                />
              </Route>
            </Route>
            {/**Static routes */}
            <Route path="/job-portal" element={<Layout />}>
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="refund-policy" element={<RefundPolicy />} />
              <Route path="terms-conditions" element={<TermsConditions />} />
              <Route path="contact-us" element={<ContactUs />} />
              <Route path="about-us" element={<AboutUs />} />
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
            <Route path="comingsoon" element={<ComingSoon />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;

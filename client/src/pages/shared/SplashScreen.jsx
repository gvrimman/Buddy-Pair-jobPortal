import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TitleRendering from "./TitleRendering";
import DialogModal from "../../components/common/DialogModal";
import UserLocation from "../auth/UserLocation";
import FresherResume from "../auth/employee/FresherResume";
import EmployeeLocation from "../auth/employee/EmployeeLocation";
import SignUp from "../auth/SignUp";
import SignIn from "../auth/SignIn";
import FresherInfo from "../auth/employee/FresherInfo";
// import FresherSkill from "../auth/employee/FresherSkill";
import EmployerInfo from "../auth/employer/EmployerInfo";
import EmployeeInfo from "../auth/employee/EmployeeInfo";
import JobDetails from "../auth/employee/JobDetails";
// import EmployeeSkill from "../auth/employee/EmployeeSkill";
import EmployeeResume from "../auth/employee/EmployeeResume";
import UserInfo from "../auth/userInfo";

function SplashScreen() {
	const location = useLocation().state;
	const [isTitleRender, setIsTitleRender] = useState(false);

	const [userData, setUserData] = useState({});

	const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
	const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
	const [isUserInfoModal, setIsUserInfoModal] = useState(false);
	const [isUserLocationModalOpen, setIsUserLocationModalOpen] =
		useState(false);

	const [isFresherInfoModalOpen, setIsFresherInfoModalOpen] = useState(false);
	const [isFresherSkillModal, setIsFresherSkillModal] = useState(false);
	const [isFresherResumModalOpen, setIsFresherResumModalOpen] =
		useState(false);
	// ====================================================================
	const [isEmployeeInfoModalOpen, setIsEmployeeInfoModalOpen] =
		useState(false);
	const [isJobDetailsModalOpen, setIsJobDetailsModalOpen] = useState(false);
	const [isEmployeeLocationModalOpen, setIsEmployeeLocationModalOpen] =
		useState(false);
	const [isEmployeeSkillModalOpen, setIsEmployeeSkillModalOpen] =
		useState(false);
	const [isEmployeeResumModalOpen, setIsEmployeeResumModalOpen] =
		useState(false);
	// ====================================================================

	const [isEmployerInfoModalOpen, setIsEmployerInfoModalOpen] =
		useState(false);

	console.log(userData);

	useEffect(() => {
		if (location?.landValue) {
			setIsTitleRender(true);

			const timeout = setTimeout(() => {
				setIsTitleRender(false);
				setIsSignInModalOpen(true);
			}, 4000);
			return () => clearTimeout(timeout);
		}
	}, [location?.landValue]);

	return (
		<article>
			{isTitleRender ? (
				<TitleRendering title={location?.title} />
			) : (
				<>
					{/* signIn modal */}
					<DialogModal scale={""} isOpen={isSignInModalOpen}>
						<SignIn
							openSignUpModal={() => {
								setIsSignInModalOpen(false);
								setIsSignUpModalOpen(true);
							}}
						/>
					</DialogModal>

					{/* signUp modal */}
					<DialogModal scale={""} isOpen={isSignUpModalOpen}>
						<SignUp
							onClose={() => setIsSignUpModalOpen(false)}
							setUserData={setUserData}
							openSignInModal={() => {
								setIsSignUpModalOpen(false);
								setIsSignInModalOpen(true);
							}}
							openUserInfoModal={() => {
								setIsSignUpModalOpen(false);
								setIsUserInfoModal(true);
							}}
						/>
					</DialogModal>

					{/* user info modal */}
					<DialogModal scale={""} isOpen={isUserInfoModal}>
						<UserInfo
							onClose={() => setIsUserInfoModal(true)}
							setUserData={setUserData}
							openFresherLocationModal={() => {
								setIsUserInfoModal(false);
								setIsUserLocationModalOpen(true);
							}}
						/>
					</DialogModal>

					{/* user location modal */}
					<DialogModal scale={""} isOpen={isUserLocationModalOpen}>
						<UserLocation
							onClose={() => setIsUserLocationModalOpen(false)}
							setUserData={setUserData}
							userData={userData}
							openEmployeeInfoModal={() => {
								setIsUserLocationModalOpen(false);
								setIsEmployeeInfoModalOpen(true);
							}}
							openEmployerInfoModal={() => {
								setIsUserLocationModalOpen(false);
								setIsEmployerInfoModalOpen(true);
							}}
						/>
					</DialogModal>

					{/* ============================FREHER MODALS======================================== */}
					{/* fresher info modal */}
					{/* <DialogModal scale={""} isOpen={isFresherInfoModalOpen}>
						<FresherInfo
							onClose={() => setIsFresherInfoModalOpen(false)}
							setUserData={setUserData}
							openFresherLocationModal={() => {
								setIsFresherInfoModalOpen(false);
								setIsUserLocationModalOpen(true);
							}}
						/>
					</DialogModal> */}

					{/* fresher skill modal */}
					{/* <DialogModal scale={""} isOpen={isFresherSkillModal}>
						<FresherSkill
							onClose={() => setIsFresherSkillModal(false)}
							setUserData={setUserData}
							onenFrehserResumModal={() => {
								setIsFresherSkillModal(false);
								setIsFresherResumModalOpen(true);
							}}
						/>
					</DialogModal> */}

					{/* fresher resume modal */}
					{/* <DialogModal scale={""} isOpen={isFresherResumModalOpen}>
						<FresherResume
							onClose={() => setIsFresherResumModalOpen(false)}
							setUserData={setUserData}
							userData={userData}
						/>
					</DialogModal> */}

					{/* ============================EMPLOYEE MODALS======================================== */}
					{/* employee info modal */}
					<DialogModal scale={""} isOpen={isEmployeeInfoModalOpen}>
						<EmployeeInfo
							onClose={() => setIsEmployeeInfoModalOpen(false)}
							setUserData={setUserData}
							openJobDetailsModal={() => {
								setIsEmployeeInfoModalOpen(false);
								setIsJobDetailsModalOpen(true);
							}}
						/>
					</DialogModal>

					{/* employee job detais modal */}
					<DialogModal scale={""} isOpen={isJobDetailsModalOpen}>
						<JobDetails
							onClose={() => setIsJobDetailsModalOpen(false)}
							setUserData={setUserData}
							openEmployeeResumeModal={() => {
								setIsJobDetailsModalOpen(false);
								setIsEmployeeResumModalOpen(true);
							}}
						/>
					</DialogModal>

					{/* employee resume modal */}
					<DialogModal scale={""} isOpen={isEmployeeResumModalOpen}>
						<EmployeeResume
							onClose={() => setIsEmployeeResumModalOpen(false)}
							setUserData={setUserData}
							userData={userData}
						/>
					</DialogModal>

					{/* employee location modal */}
					{/* <DialogModal
						scale={""}
						isOpen={isEmployeeLocationModalOpen}>
						<EmployeeLocation
							onClose={() =>
								setIsEmployeeLocationModalOpen(false)
							}
							setUserData={setUserData}
							openEmployeeSkillModal={() => {
								setIsEmployeeLocationModalOpen(false);
								setIsEmployeeSkillModalOpen(true);
							}}
						/>
					</DialogModal> */}

					{/* employee skill modal */}
					{/* <DialogModal scale={""} isOpen={isEmployeeSkillModalOpen}>
						<EmployeeSkill
							onClose={() => setIsEmployeeSkillModalOpen(false)}
							setUserData={setUserData}
							openEmployeeResumeModel={() => {
								setIsEmployeeSkillModalOpen(false);
								setIsEmployeeResumModalOpen(true);
							}}
						/>
					</DialogModal> */}

					{/* ============================EMPLOYER MODALS======================================== */}
					{/* employer info modal */}
					<DialogModal scale={""} isOpen={isEmployerInfoModalOpen}>
						<EmployerInfo
							onClose={() => setIsEmployerInfoModalOpen(false)}
							setUserData={setUserData}
							userData={userData}
						/>
					</DialogModal>
				</>
			)}
		</article>
	);
}

export default SplashScreen;

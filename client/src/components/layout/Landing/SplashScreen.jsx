import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TitleRendering from "./TitleRendering";
import DialogModal from "../../common/DialogModal";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import FresherInfo from "../Fresher/FresherInfo";
import EmployeeInfo from "../Employee/auth/EmployeeInfo";
import EmployerInfo from "../Employer/auth/EmployerInfo";
import FresherLocation from "../Fresher/FresherLocation";
import FresherSkill from "../Fresher/FresherSkill";
import FresherResume from "../Fresher/FresherResume";
import JobDetails from "../Employee/auth/JobDetails";
import EmployeeLocation from "../Employee/auth/EmployeeLocation";
import EmployeeSkill from "../Employee/auth/EmployeeSkill";
import EmployeeResume from "../Employee/auth/EmployeeResume";

function SplashScreen() {
	const location = useLocation().state;
	const [isTitleRender, setIsTitleRender] = useState(false);

	const [userData, setUserData] = useState({});
	const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
	const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
	const [isFresherInfoModalOpen, setIsFresherInfoModalOpen] = useState(false);
	const [isFresherLocationModalOpen, setIsFresherLocationModalOpen] =
		useState(false);
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

	// console.log(userData);

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
							openFresherInfoModal={() => {
								setIsSignUpModalOpen(false);
								setIsFresherInfoModalOpen(true);
							}}
							openEmployeeInfoModal={() => {
								setIsSignUpModalOpen(false);
								setIsEmployeeInfoModalOpen(true);
							}}
							openEmployerInfoModal={() => {
								setIsSignUpModalOpen(false);
								setIsEmployerInfoModalOpen(true);
							}}
						/>
					</DialogModal>

					{/* ============================FREHER MODALS======================================== */}
					{/* fresher info modal */}
					<DialogModal scale={""} isOpen={isFresherInfoModalOpen}>
						<FresherInfo
							onClose={() => setIsFresherInfoModalOpen(false)}
							setUserData={setUserData}
							openFresherLocationModal={() => {
								setIsFresherInfoModalOpen(false);
								setIsFresherLocationModalOpen(true);
							}}
						/>
					</DialogModal>

					{/* fresher location modal */}
					<DialogModal scale={""} isOpen={isFresherLocationModalOpen}>
						<FresherLocation
							onClose={() => setIsFresherLocationModalOpen(false)}
							setUserData={setUserData}
							openFresherSkillModal={() => {
								setIsFresherLocationModalOpen(false);
								setIsFresherSkillModal(true);
							}}
						/>
					</DialogModal>

					{/* fresher skill modal */}
					<DialogModal scale={""} isOpen={isFresherSkillModal}>
						<FresherSkill
							onClose={() => setIsFresherSkillModal(false)}
							setUserData={setUserData}
							onenFrehserResumModal={() => {
								setIsFresherSkillModal(false);
								setIsFresherResumModalOpen(true);
							}}
						/>
					</DialogModal>

					{/* fresher resume modal */}
					<DialogModal scale={""} isOpen={isFresherResumModalOpen}>
						<FresherResume
							onClose={() => setIsFresherResumModalOpen(false)}
							setUserData={setUserData}
							userData={userData}
						/>
					</DialogModal>

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
							openEmployeeLocation={() => {
								setIsJobDetailsModalOpen(false);
								setIsEmployeeLocationModalOpen(true);
							}}
						/>
					</DialogModal>

					{/* employee location modal */}
					<DialogModal
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
					</DialogModal>

					{/* employee skill modal */}
					<DialogModal scale={""} isOpen={isEmployeeSkillModalOpen}>
						<EmployeeSkill
							onClose={() => setIsEmployeeSkillModalOpen(false)}
							setUserData={setUserData}
							openEmployeeResumeModel={() => {
								setIsEmployeeSkillModalOpen(false);
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

					{/* ============================EMPLOYER MODALS======================================== */}
					{/* employer info modal */}
					<DialogModal scale={""} isOpen={isEmployerInfoModalOpen}>
						<EmployerInfo 
						onClose={() => setIsEmployerInfoModalOpen(false)}
						setUserData={setUserData}
						userData={userData}/>
					</DialogModal>
				</>
			)}
		</article>
	);
}

export default SplashScreen;

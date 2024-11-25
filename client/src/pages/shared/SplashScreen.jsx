import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TitleRendering from "./TitleRendering";
import DialogModal from "../../components/common/DialogModal";
import UserLocation from "../auth/UserLocation";
import SignUp from "../auth/SignUp";
import SignIn from "../auth/SignIn";
import EmployerInfo from "../auth/EmployerInfo";
import JobDetails from "../auth/JobDetails";
import UserInfo from "../auth/userInfo";
import UserAdditionInfo from "../auth/UserAdditionInfo";
import UserResume from "../auth/userResume";

function SplashScreen() {
	const location = useLocation().state;
	const [isTitleRender, setIsTitleRender] = useState(false);

	const [userData, setUserData] = useState({});

	const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
	const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
	const [isUserInfoModal, setIsUserInfoModal] = useState(false);
	const [isUserLocationModalOpen, setIsUserLocationModalOpen] =
		useState(false);

	// ====================================================================
	const [isUserAdditionInfoModalOpen, setIsUserAdditionInfoModalOpen] =
		useState(false);
	const [isJobDetailsModalOpen, setIsJobDetailsModalOpen] = useState(false);

	const [isUserResumeModalOpen, setIsUserResumeModalOpen] =
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
							openUserLocationModal={() => {
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
							openUserAdditionInfoModal={() => {
								setIsUserLocationModalOpen(false);
								setIsUserAdditionInfoModalOpen(true);
							}}
							openEmployerInfoModal={() => {
								setIsUserLocationModalOpen(false);
								setIsEmployerInfoModalOpen(true);
							}}
						/>
					</DialogModal>

					{/* user addition info modal */}
					<DialogModal scale={""} isOpen={isUserAdditionInfoModalOpen}>
						<UserAdditionInfo
							onClose={() => setIsUserAdditionInfoModalOpen(false)}
							setUserData={setUserData}
							userData={userData}
							openJobDetailsModal={() => {
								setIsUserAdditionInfoModalOpen(false);
								setIsJobDetailsModalOpen(true);
							}}
							openUserResumeModal={() => {
								setIsUserAdditionInfoModalOpen(false);
								setIsUserResumeModalOpen(true);
							}}
						/>
					</DialogModal>

					{/* user job detais modal */}
					<DialogModal scale={""} isOpen={isJobDetailsModalOpen}>
						<JobDetails
							onClose={() => setIsJobDetailsModalOpen(false)}
							setUserData={setUserData}
							openUserResumeModal={() => {
								setIsJobDetailsModalOpen(false);
								setIsUserResumeModalOpen(true);
							}}
						/>
					</DialogModal>

					{/* user resume modal */}
					<DialogModal scale={""} isOpen={isUserResumeModalOpen}>
						<UserResume
							onClose={() => setIsUserResumeModalOpen(false)}
							setUserData={setUserData}
							userData={userData}
						/>
					</DialogModal>

					{/* employer info modal */}
					<DialogModal scale={""} isOpen={isEmployerInfoModalOpen}>
						<EmployerInfo
							onClose={() => setIsEmployerInfoModalOpen(false)}
							setUserData={setUserData}
							userData={userData}
						/>
					</DialogModal>

					

					{/* ============================EMPLOYER MODALS======================================== */}
				</>
			)}
		</article>
	);
}

export default SplashScreen;

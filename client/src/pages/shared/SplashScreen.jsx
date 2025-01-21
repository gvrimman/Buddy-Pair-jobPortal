import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TitleRendering from "./TitleRendering";
import axiosInstance from "../../utils/axios";
import { clearUser } from "../../Redux/reducers/userReducer";
import { persistor } from "../../Redux/store/store";
import DialogModal from "../../components/common/DialogModal";
import UserLocation from "../auth/UserLocation";
import SignUp from "../auth/SignUp";
import SignIn from "../auth/SignIn";
import EmployerInfo from "../auth/EmployerInfo";
import JobDetails from "../auth/JobDetails";
import UserInfo from "../auth/UserInfo";
import UserAdditionInfo from "../auth/UserAdditionInfo";
import UserResume from "../auth/UserResume";
import { showError, showSuccess } from "../../utils/toast";
import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword";
import VerifyOTP from "../auth/VerifyOTP";

function SplashScreen() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation().state;
	const { isAuthenticated, userInfo } = useSelector((state) => state.user);
	// ====================================================================
	const [isTitleRender, setIsTitleRender] = useState(false);

	const [userData, setUserData] = useState({});
	const [mail, setMail] = useState("");
	const [quickResendOTP, setquickResendOTP] = useState(true);

	const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
	const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
	const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
	const [isResetPassword, setIsResetPassword] = useState(false);
	const [isVerifyOTPOpen, setIsVerifyOTPOpen] = useState(false);
	const [isUserInfoModal, setIsUserInfoModal] = useState(false);
	const [isUserLocationModalOpen, setIsUserLocationModalOpen] = useState(false);
	const [isUserAdditionInfoModalOpen, setIsUserAdditionInfoModalOpen] = useState(false);
	const [isJobDetailsModalOpen, setIsJobDetailsModalOpen] = useState(false);
	const [isUserResumeModalOpen, setIsUserResumeModalOpen] = useState(false);
	const [isEmployerInfoModalOpen, setIsEmployerInfoModalOpen] = useState(false);
	// ====================================================================

	const logout = async () => {
		try {
			const response = await axiosInstance.post("auth/logout");
			showSuccess(response?.data?.message);
			dispatch(clearUser());
			persistor.purge();
			navigate("/");
		} catch (error) {
			showError(error?.response?.data?.message || "Failed to logout");
		}
	};

	const [searchParams] = useSearchParams();
	const error = searchParams.get("error");
	
	if (error) {
		// Display the error message to the user
		showError(`Error: ${error}`);
		setTimeout(() => {
			navigate("/");
		}, 100);
	}

	useEffect(() => {
		if (location?.landValue) {
			setIsTitleRender(true);

			const timeout = setTimeout(() => {
				setIsTitleRender(false);
				if (isAuthenticated && userInfo && !userInfo?.emailVerified) {
					setMail(userInfo?.email);
					setIsVerifyOTPOpen(true);
				}
				else if(isAuthenticated && userInfo && !userInfo?.apps?.jobPortal) setIsUserInfoModal(true);
          		else setIsSignInModalOpen(true);
			}, 4000);
			return () => clearTimeout(timeout);
		}else if(!isSignInModalOpen && !isSignUpModalOpen){
			if (isAuthenticated && userInfo && !userInfo?.emailVerified) {
				setMail(userInfo?.email);
				setIsVerifyOTPOpen(true);
			}
			else if(isAuthenticated && userInfo && !userInfo?.apps?.jobPortal) setIsUserInfoModal(true);
          	else setIsSignInModalOpen(true);
		}
	}, [location?.landValue]);

	return (
		<article>
			{isTitleRender ? (
				<TitleRendering title={location?.title} />
			) : (
				<>
					{/* signIn modal */}
					<DialogModal
						scale={{ s: "sm", m: "md" }}
						isOpen={isSignInModalOpen}>
						<SignIn
							openSignUpModal={() => {
								setIsSignInModalOpen(false);
								setIsSignUpModalOpen(true);
							}}
							openUserInfoModal={() => {
								setIsSignInModalOpen(false);
								setIsUserInfoModal(true);
							}}
							openForgotPasswordModal={() => {
								setIsSignInModalOpen(false);
								setIsForgotPasswordOpen(true);
							}}
							openOTPVerifyModal={() => {
								setquickResendOTP(true);
								setIsSignUpModalOpen(false);
								setIsVerifyOTPOpen(true);
							}}
							onClose={()=>navigate("/")}
						/>
					</DialogModal>

					{/* signUp modal */}
					<DialogModal
						scale={{ s: "sm", m: "md" }}
						isOpen={isSignUpModalOpen}>
						<SignUp
							onClose={() => setIsSignUpModalOpen(false)}
							closeBtnClick={()=>navigate("/")}
							setMail={setMail}
							openSignInModal={() => {
								setIsSignUpModalOpen(false);
								setIsSignInModalOpen(true);
							}}
							openOTPVerifyModal={() => {
								setquickResendOTP(false);
								setIsSignUpModalOpen(false);
								setIsVerifyOTPOpen(true);
							}}
						/>
					</DialogModal>

					{/* verify otp modal */}
					<DialogModal
						scale={{ s: "sm", m: "md" }}
						isOpen={isVerifyOTPOpen}>
						<VerifyOTP
							openUserInfoModal={() => {
								setIsVerifyOTPOpen(false);
								if(isAuthenticated && userInfo && !userInfo?.apps?.jobPortal) setIsUserInfoModal(true);
								else navigate("/job-portal");
							}}
							mail={mail}
							quickResendOTP={quickResendOTP}
							setquickResendOTP={setquickResendOTP}
							goBack={()=>navigate("/")}
							logout={logout}
						/>
					</DialogModal>

					{/* forgot password modal */}
					<DialogModal
						scale={{ s: "sm", m: "md" }}
						isOpen={isForgotPasswordOpen}>
						<ForgotPassword
							onClose={() => setIsForgotPasswordOpen(false)}
							openResetPasswordModal={() => {
								setIsForgotPasswordOpen(false);
								setIsResetPassword(true);
							}}
							setMail={setMail}
							goBack={()=>{
								setIsForgotPasswordOpen(false);
								setIsSignInModalOpen(true);
							}} 
						/>
					</DialogModal>

					{/* reset password modal */}
					<DialogModal
						scale={{ s: "sm", m: "md" }}
						isOpen={isResetPassword}>
						<ResetPassword
							onClose={() => setIsResetPassword(false)}
							openSignInModal={() => {
								setIsResetPassword(false);
								setIsSignInModalOpen(true);
							}}
							mail={mail}
							goBack={()=>{
								setIsResetPassword(false);
								setIsSignInModalOpen(true);
							}}
						/>
					</DialogModal>
					{/* user info modal */}
					<DialogModal
						scale={{ s: "sm", m: "md" }}
						isOpen={isUserInfoModal}>
						<UserInfo
							onClose={() => setIsUserInfoModal(true)}
							setUserData={setUserData}
							logout={logout}
							openUserLocationModal={() => {
								setIsUserInfoModal(false);
								setIsUserLocationModalOpen(true);
							}}
						/>
					</DialogModal>

					{/* user location modal */}
					<DialogModal
						scale={{ s: "sm", m: "md" }}
						isOpen={isUserLocationModalOpen}>
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
							goBack={()=>{
								setIsUserLocationModalOpen(false);
								setIsUserInfoModal(true);
							}}
						/>
					</DialogModal>

					{/* user addition info modal */}
					<DialogModal
						scale={{ s: "sm", m: "md" }}
						isOpen={isUserAdditionInfoModalOpen}>
						<UserAdditionInfo
							onClose={() =>
								setIsUserAdditionInfoModalOpen(false)
							}
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
							goBack={()=>{
								setIsUserAdditionInfoModalOpen(false);
								setIsUserLocationModalOpen(true);
							}}
						/>
					</DialogModal>

					{/* user job detais modal */}
					<DialogModal
						scale={{ s: "sm", m: "md" }}
						isOpen={isJobDetailsModalOpen}>
						<JobDetails
							onClose={() => setIsJobDetailsModalOpen(false)}
							setUserData={setUserData}
							openUserResumeModal={() => {
								setIsJobDetailsModalOpen(false);
								setIsUserResumeModalOpen(true);
							}}
							goBack={()=>{
								setIsJobDetailsModalOpen(false);
								setIsUserAdditionInfoModalOpen(true);
							}}
						/>
					</DialogModal>

					{/* user resume modal */}
					<DialogModal
						scale={{ s: "sm", m: "md" }}
						isOpen={isUserResumeModalOpen}>
						<UserResume
							onClose={() => setIsUserResumeModalOpen(false)}
							setUserData={setUserData}
							userData={userData}
							goBack={()=>{
								setIsUserResumeModalOpen(false);
								if(userData.role === 'fresher') setIsUserAdditionInfoModalOpen(true);
								else setIsUserAdditionInfoModalOpen(true);
							}}
						/>
					</DialogModal>

					{/* employer info modal */}
					<DialogModal
						scale={{ s: "sm", m: "md" }}
						isOpen={isEmployerInfoModalOpen}>
						<EmployerInfo
							onClose={() => setIsEmployerInfoModalOpen(false)}
							setUserData={setUserData}
							userData={userData}
							goBack={()=>{
								setIsEmployerInfoModalOpen(false);
								setIsUserLocationModalOpen(true);
							}}
						/>
					</DialogModal>

					{/* ============================EMPLOYER MODALS======================================== */}
				</>
			)}
		</article>
	);
}

export default SplashScreen;

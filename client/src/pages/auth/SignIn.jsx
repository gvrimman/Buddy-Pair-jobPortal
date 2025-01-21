import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Typography } from "@material-tailwind/react";
import TextInput from "../../components/common/TextInput";
import useFormHandler from "../../hooks/ReactHookForm/Index";
import { loginValidations } from "../../utils/yupValidations";
import { showError, showSuccess } from "../../utils/toast";
import { setUser } from "../../Redux/reducers/userReducer";
import axiosInstance from "../../utils/axios";
import { RiLoader4Line } from "react-icons/ri";
import handleGoogleAuthentication from "../../Services/googleAuth";

function SignIn({
	openSignUpModal,
	openUserInfoModal,
	openForgotPasswordModal,
	openOTPVerifyModal,
	onClose
}) {
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	// validate inputs
	const { register, handleSubmit, errors, reset } =
		useFormHandler(loginValidations);

	const onSubmit = async (data) => {
		try {
			setIsLoading(true);
			const response = await axiosInstance.post("/auth/login", data);
			const userData = response?.data?.data;
			setIsLoading(false);
			showSuccess(response?.data?.message);

			// if user hasn't complete total registration redirect to user info modal
			if(!userData.emailVerified) {
				setTimeout(() => {
					dispatch(setUser(userData));
					openOTPVerifyModal();
					showError("Email verification is pending...")
				}, 300);
			} else if (!userData?.apps?.jobPortal) {
				setTimeout(() => {
					dispatch(setUser(userData));
					openUserInfoModal();
					showError("Profile completion is pending...")
				}, 300);
			} else {
				dispatch(setUser(userData));
			}
		} catch (error) {
			setIsLoading(false);
			console.error("Login Error:", error);
			showError(error?.response?.data?.message);
		}
	};

	return (
		<div className=" flex flex-col gap-4 px-1 py-10">
			<div className="relative text-center">
				<Typography variant="h4" color="blue-gray">
					Login
				</Typography>
				<Typography color="gray" className="mt-1 font-normal">
					Enter your details to Login.
				</Typography>
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="relative flex flex-col mx-auto gap-3 md:gap-4 my-4 max-w-96">
					<TextInput
						type={"email"}
						label={"Email"}
						errors={errors.email}
						registering={register("email")}
					/>
					<TextInput
						type={"password"}
						label={"Password"}
						errors={errors.password}
						registering={register("password")}
					/>

					<p
						onClick={() => openForgotPasswordModal()}
						className="capitalize font-semibold text-xs md:text-sm cursor-pointer ">
						forgot password?
					</p>

					<div className="flex gap-5 justify-end">
						<Button onClick={onClose} className="text-xs">close</Button>
						<Button
							disabled={isLoading}
							type="submit"
							className="bg-red-600 font-normal text-xs flex justify-center">
							{isLoading ? (
								<span>
									<RiLoader4Line className="animate-spin text-xl" />
								</span>
							) : (
								"Next"
							)}
						</Button>
					</div>
				</div>
				<Typography
					color="gray"
					className="mt-4 text-center font-normal">
					Don't have an account?{" "}
					<Link
						className="font-medium text-gray-900"
						onClick={openSignUpModal}>
						Sign Up
					</Link>
				</Typography>
			</form>

			{/* <div className="flex items-center gap-2">
				<div className="w-full border border-gray-500"></div>
				<p className="text-[#0000008a] text-xs ">OR</p>
				<div className="w-full border border-gray-500"></div>
			</div>

			<div className="flex flex-col md:flex-row gap-2">
				<Button
					onClick={() => handleGoogleAuthentication()}
					className="bg-transparent text-[#000000c5] text-sm border border-gray-400 capitalize flex items-center gap-2 justify-center md:flex-1 py-2 md:py-3 rounded font-normal">
					<span className="text-lg md:text-xl">
						<FcGoogle />
					</span>
					Sign in with Google
				</Button>
				<Button className="bg-transparent text-[#000000c5] text-sm border border-gray-400 capitalize flex items-center gap-2 justify-center md:flex-1 py-2 md:py-3 rounded font-normal">
					<span className="text-lg md:text-xl">
						<FcPhoneAndroid />
					</span>
					Sign in with Phone
				</Button>
			</div> */}
		</div>
	);
}

export default SignIn;

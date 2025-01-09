import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FcGoogle, FcPhoneAndroid } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
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
}) {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
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
			dispatch(setUser(response?.data?.data));
			showSuccess(response?.data?.message);

			// if user hasn't complete total registration redirect to user info modal
			if (!userData?.apps?.jobPortal) {
				setTimeout(() => {
					openUserInfoModal();
				}, 300);
			}
			const redirectPath = localStorage.getItem("redirectPath");

			if (redirectPath) {
				localStorage.removeItem("redirectPath");
				navigate(redirectPath);
			} else navigate("/job-portal");
		} catch (error) {
			setIsLoading(false);
			console.error("Login Error:", error);
			showError(error?.response?.data?.message);
		}
	};

	return (
		<div className=" flex flex-col gap-4 px-1 py-10">
			<div className="relative text-center">
				{/* <Link
					to={"/"}
					className="absolute -top-4 -left-1 border rounded-md p-1 bg-transparent text-2xl text-cyan-500 hover:text-blue-700 hover:border-blue-500 cursor-pointer">
					<AiOutlineHome />
				</Link> */}
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

					{/* <p
						onClick={() => openForgotPasswordModal()}
						className="capitalize font-semibold text-xs md:text-sm cursor-pointer ">
						forgot password?
					</p> */}

					<div className="flex gap-5 justify-end">
						<Button
							disabled={isLoading}
							type="submit"
							className=" font-normal text-xs flex justify-center">
							{isLoading ? (
								<span>
									<RiLoader4Line className="animate-spin text-xl" />
								</span>
							) : (
								"Next"
							)}
						</Button>
						<Button className="bg-red-600 text-xs">close</Button>
					</div>
				</div>

				{/* <Button
					disabled={isLoading}
					type="submit"
					className="bg-customViolet w-full py-2 md:py-3 rounded capitalize font-normal text-sm flex justify-center">
					{isLoading ? (
						<span>
							<RiLoader4Line className="animate-spin text-xl" />
						</span>
					) : (
						"Sign in"
					)}
				</Button> */}

				{/* <p className="mt-2 subpixel-antialiased text-center text-sm font-semibold">
					Don't have an account?
					<span
						className="cursor-pointer underline"
						onClick={openSignUpModal}>
						Sign Up
					</span>
				</p> */}

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

import { Button, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { FcGoogle, FcPhoneAndroid } from "react-icons/fc";
import { Link } from "react-router-dom";
import TextInput from "../../components/common/TextInput";
import useFormHandler from "../../hooks/ReactHookForm/Index";
import { signupValidations } from "../../utils/yupValidations";
import { showError, showSuccess } from "./../../utils/toast";
import axiosInstance from "./../../utils/axios";
import { setUser } from "../../Redux/reducers/userReducer";
import { useDispatch } from "react-redux";
import handleGoogleAuthentication from "./../../Services/googleAuth";
import { RiLoader4Line } from "react-icons/ri";

function SignUp({ onClose, openSignInModal, openOTPVerifyModal, closeBtnClick, setMail }) {
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();
	// validate inputs
	const { register, handleSubmit, errors, reset } =
		useFormHandler(signupValidations);

	const onSubmit = async (data) => {
		try {
			setIsLoading(true);
			const response = await axiosInstance.post("/auth/signup", data);
			dispatch(setUser(response?.data?.data));
			showSuccess(response.data?.message);
			setMail(data.email);
			setIsLoading(false);
			reset();
			onClose();

			setTimeout(() => {
				openOTPVerifyModal();
			}, 300);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
			showError(error.response?.data?.message);
		}
	};

	return (
		<div className=" flex flex-col gap-4 px-1 py-5">
			<div className="relative text-center">
				{/* <Link
					to={"/"}
					className="absolute -top-4 -left-1 border rounded-md p-1 bg-transparent text-2xl text-cyan-500 hover:text-blue-700 hover:border-blue-500 cursor-pointer">
					<AiOutlineHome />
				</Link> */}
				<h1 className="text-[#263238] text-lg md:text-2xl font-bold">
					Sign Up
				</h1>
				<Typography color="gray" className="mt-1 font-normal">
					Nice to meet you! Enter your details to register.
				</Typography>
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="relative flex flex-col mx-auto gap-3 md:gap-4 mb-3 max-w-96">
					<TextInput
						type={"text"}
						label={"Name"}
						registering={register("name")}
						errors={errors.name}
					/>
					<TextInput
						type={"email"}
						label={"Email Address"}
						registering={register("email")}
						errors={errors["email"]}
					/>
					<TextInput
						type={"text"}
						label={"Phone Number"}
						registering={register("contactNumber")}
						errors={errors["contactNumber"]}
					/>
					<TextInput
						type={"password"}
						label={"Password"}
						registering={register("password")}
						errors={errors["password"]}
					/>
					<TextInput
						type={"password"}
						label={"Confirm Password"}
						registering={register("confirmPassword")}
						errors={errors["confirmPassword"]}
					/>

					<div className="flex gap-5 justify-end">
						<Button onClick={closeBtnClick} className="text-xs">close</Button>
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

				{/* <p className="mt-2 subpixel-antialiased text-center text-sm font-semibold">
					Already have an account?
					<span
						className="cursor-pointer underline"
						onClick={openSignInModal}>
						{" "}
						Sign in
					</span>
				</p> */}
				<Typography
					color="gray"
					className="mt-4 text-center font-normal">
					Already have an account? { " "}
					<Link
						className="font-medium text-gray-900"
						onClick={openSignInModal}>
						 Sign in
					</Link>
				</Typography>
			</form>

			{/* <div className="flex items-center gap-2">
				<div className="w-full border border-gray-500"></div>
				<p className="text-[#0000008a] text-xs ">OR</p>
				<div className="w-full border border-gray-500"></div>
			</div> */}

			{/* <div className="flex flex-col md:flex-row gap-2">
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

export default SignUp;

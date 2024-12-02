import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import useFormHandler from "../../hooks/ReactHookForm/Index";
import TextInput from "../../components/common/TextInput";
import { Button } from "@material-tailwind/react";
import { forgotPasswordValidation } from "../../utils/yupValidations";
import axiosInstance from "../../utils/axios";
import { showError, showSuccess } from "../../utils/toast";
import { RiLoader4Line } from "react-icons/ri";

function ForgotPassword({ setMail, openResetPasswordModal }) {
	const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
	const { register, handleSubmit, errors, reset } = useFormHandler(
		forgotPasswordValidation
	);

	const onSubmit = async (data) => {
		setMail(data.email);
		try {
            setIsLoading(true);
			const response = await axiosInstance.post(
				"/auth/forgot-password",
				data
			);
            setIsLoading(false);
			showSuccess(response?.data?.message);
            reset();
            openResetPasswordModal();
		} catch (error) {
			console.log(error);
            setIsLoading(false);
			showError(error?.response?.data?.message);
		}	
	};
	return (
		<div className=" flex flex-col gap-4 px-1 py-5">
			<div className="relative text-center">
				<h1 className="text-customViolet text-lg md:text-2xl font-bold">
					Forgot Password
				</h1>
				<p className="text-[#0000008a] text-sm md:text-base font-semibold my-2">
					Enter your email address to reset your password
				</p>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextInput
					type={"email"}
					label={"Email"}
					errors={errors.email}
					registering={register("email")}
				/>

				<div className="text-end mt-3">
					<Button
						onClick={() => navigate("/")}
						className="rounded py-2 px-3 sm:py-3 sm:px-4 mx-1 bg-red-400">
						Close
					</Button>
					<Button
						disabled={isLoading}
						type="submit"
						className="rounded py-2 px-3 sm:py-3 sm:px-4 mx-1 bg-customViolet">
						{isLoading ? (
							<span>
								<RiLoader4Line className="animate-spin text-xl" />
							</span>
						) : (
							"Next"
						)}
					</Button>
				</div>
			</form>
		</div>
	);
}

export default ForgotPassword;

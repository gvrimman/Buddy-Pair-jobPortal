import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import useFormHandler from "../../hooks/ReactHookForm/Index";
import TextInput from "../../components/common/TextInput";
import { Button, Typography } from "@material-tailwind/react";
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
				<Typography
					variant="h4"
					color="blue-gray"
					className="text-center">
					Forgot Password
				</Typography>
				<p className="text-[#0000008a] text-sm md:text-base font-semibold my-2">
					Enter your email address to reset your password
				</p>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className=" relative flex flex-col mx-auto gap-3 md:gap-4 my-4 max-w-96">
					<TextInput
						type={"email"}
						label={"Email"}
						errors={errors.email}
						registering={register("email")}
					/>

					<div className="text-end mt-3">
						<Button
							disabled={isLoading}
							type="submit"
							className=" py-2 px-3 sm:py-3 sm:px-4 mx-1 ">
							{isLoading ? (
								<span>
									<RiLoader4Line className="animate-spin text-xl" />
								</span>
							) : (
								"Next"
							)}
						</Button>
						<Button
							onClick={() => navigate("/")}
							className=" py-2 px-3 sm:py-3 sm:px-4 mx-1 bg-red-400">
							Close
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default ForgotPassword;

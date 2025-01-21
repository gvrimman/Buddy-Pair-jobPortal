import React from 'react'
import TextInput from '../../components/common/TextInput';
import { useNavigate } from 'react-router-dom';
import useFormHandler from '../../hooks/ReactHookForm/Index';
import { resetPasswordValidation } from '../../utils/yupValidations';
import { Button } from '@material-tailwind/react';
import { showError, showSuccess } from '../../utils/toast';
import axiosInstance from '../../utils/axios';

function ResetPassword({ mail, openSignInModal, goBack }) {
	const navigate = useNavigate();
	const { register, handleSubmit, errors, reset } = useFormHandler(
		resetPasswordValidation
	);

	const onSubmit = async (data) => {
		const formatData = {
			email: mail,
			otp: data.otp,
			newPassword: data.password,
			confirmPassword: data.confirmPassword,
		};
        try {
            const response = await axiosInstance.post(
                "/auth/reset-password",
                formatData
            );
            showSuccess(response?.data?.message);
            reset();
            openSignInModal();
        } catch (error) {
            console.log(error);
            showError(error?.response?.data?.message);
        }
	};
	return (
		<div className=" flex flex-col gap-4 px-1 py-5">
			<div className="relative text-center">
				<h1 className="text-customViolet text-lg md:text-2xl font-bold">
					Reset Password
				</h1>
				<p className="text-[#0000008a] text-sm md:text-base font-semibold my-2">
					Enter valid OTP and set your new password
				</p>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextInput
					type={"text"}
					label={"Otp"}
					errors={errors.otp}
					registering={register("otp")}
				/>
				<div className="relative grid md:grid-cols-2 gap-3 md:gap-4 my-3">
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
				</div>

				<div className="text-end mt-3">
					<Button
						onClick={goBack}
						className="rounded py-2 px-3 sm:py-3 sm:px-4 mx-1">
						Close
					</Button>
					<Button
						type="submit"
						className="rounded py-2 px-3 sm:py-3 sm:px-4 mx-1 bg-red-400">
						Next
					</Button>
				</div>
			</form>
		</div>
	);
}

export default ResetPassword
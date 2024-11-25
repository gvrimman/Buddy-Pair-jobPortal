import React from "react";
import TextInput from "../../../common/TextInput";
import { Button } from "@material-tailwind/react";
import useFormHandler from "../../../../hooks/ReactHookForm/Index";
import { passwordValidations } from "../../../../utils/yupValidations";
import axiosInstance from './../../../../utils/axios';
import { showError, showSuccess } from './../../../../utils/toast';

function PasswordChanging() {
	// hook form validation
	const { register, handleSubmit, errors, reset, control, watch } =
		useFormHandler(passwordValidations);

	const onSubmit = async (data) => {
		try {
			const response = await axiosInstance.put(`/auth/password`, data);
			showSuccess(response?.data?.message);
			reset();
		} catch (error) {
			console.log(error);
			showError(error?.response?.data?.message);
		}
	};
	return (
		<div className="bg-white p-4 grid gap-4 rounded-md shadow">
			<h1 className="text-xl font-semibold tracking-wider">
				Change Password
			</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-4 mb-3">
					<TextInput
						type={"password"}
						label={"Old Password"}
						registering={register("oldPassword")}
						errors={errors.oldPassword}
					/>
					<TextInput
						type={"password"}
						label={"New Password"}
						registering={register("newPassword")}
						errors={errors.newPassword}
					/>
					<TextInput
						type={"password"}
						label={"Confirm Password"}
						registering={register("confirmPassword")}
						errors={errors.confirmPassword}
					/>
				</div>
				<Button type="sumbit" className="w-fit">
					Change Password
				</Button>
			</form>
		</div>
	);
}

export default PasswordChanging;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../../../common/TextInput";
import { formatDate } from "../../../../utils/formatDate";
import FormButton from "../../../common/FormButton";
import { Button } from "@material-tailwind/react";
import useFormHandler from "../../../../hooks/ReactHookForm/Index";
import { educationType, qualificationOptions } from "../../../../utils/constants";
import SelectInput from "../../../common/SelectInput";
import { profileEducationValidation } from "../../../../utils/yupValidations";
import axiosInstance from "../../../../utils/axios";
import { showError, showSuccess } from "../../../../utils/toast";
import { updateUserInfo } from "../../../../Redux/reducers/userReducer";

function EducationInfos() {
	const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  // hook form validation
  const { register, handleSubmit, errors, reset, control, watch } =
		useFormHandler(profileEducationValidation);

		const onSubmit = async (data) => {
			try {
				const response = await axiosInstance.put(
					`/auth/update-profile`,
					data
				);
				console.log(response);
				dispatch(updateUserInfo(response?.data?.data));
				showSuccess(response?.data?.message);
			} catch (error) {
				showError(error?.response?.data?.message);
			}
		};

	return (
		<div className="grid bg-white mx-2 p-4 rounded-md shadow">
			<h2 className="py-2 text-lg tracking-wide font-semibold">
				My Education
			</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mt-5 grid lg:grid-cols-2 gap-3">
					<SelectInput
						label={"Qualification"}
						options={qualificationOptions}
						name={"qualification"}
						control={control}
						errors={errors.qualification}
						value={userInfo?.apps?.jobPortal?.qualification}
					/>
					<TextInput
						label={"Education Institution"}
						type={"text"}
						value={userInfo?.apps?.jobPortal?.educationInstitute}
						registering={register("educationInstitute")}
						errors={errors.educationInstitute}
					/>
					<SelectInput
						label={"Education Type"}
						options={educationType}
						name={"educationType"}
						control={control}
						errors={errors.educationType}
						value={userInfo?.apps?.jobPortal?.educationType}
					/>
				</div>
				<Button type="submit" className="w-fit mt-3 text-end">
					Update
				</Button>
			</form>
		</div>
	);
}

export default EducationInfos;

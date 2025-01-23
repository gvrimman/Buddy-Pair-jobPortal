import React, { useState } from "react";
import InputForms from "../../../common/InputForms";
import { Button } from "@material-tailwind/react";
import TextInput from "../../../common/TextInput";
import {
	employerLinkedinValidation,
	emplyerInfoValidation,
} from "../../../../utils/yupValidations";
import useFormHandler from "../../../../hooks/ReactHookForm/Index";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../../utils/axios";
import { showError, showSuccess } from "../../../../utils/toast";
import { updateEmployerInfo } from "../../../../Redux/reducers/userReducer";

function SocialProfileForm() {
	const { userInfo } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	// hook form validation
	const { register, handleSubmit, errors, reset, control, watch } =
		useFormHandler(employerLinkedinValidation);

	const onSubmit = async (data) => {
		try {
			const response = await axiosInstance.put(
				`/auth/update-employer-profile`,
				data
			);
			showSuccess(response?.data?.message);
			dispatch(updateEmployerInfo(response?.data?.data));
		} catch (error) {
			showError(error?.response?.data?.message);
		}
	};

	return (
    <div className="grid bg-white mx-2 p-4 rounded-md shadow">
      <h2 className="py-2 text-xl text-theme-500 tracking-wide font-semibold">
        Social Network
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 grid lg:grid-cols-2 gap-3">
          <TextInput
            type={"text"}
            label={"LinkedIn"}
            registering={register("companyLinkedin")}
            errors={errors.companyLinkedin}
            value={userInfo?.apps?.jobPortal?.companyLinkedin}
          />
        </div>
        <Button
          type="submit"
          className="bg-theme-500 hover:bg-theme-400 my-3 w-fit"
        >
          update
        </Button>
      </form>
    </div>
  );
}

export default SocialProfileForm;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../../../common/TextInput";
import { Button } from "@material-tailwind/react";
import useFormHandler from "../../../../hooks/ReactHookForm/Index";
import { profileSocialValidation } from "../../../../utils/yupValidations";
import axiosInstance from "../../../../utils/axios";
import { updateUserInfo } from "../../../../Redux/reducers/userReducer";
import { showError, showSuccess } from "../../../../utils/toast";

function ProjectInfos() {
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.user);
	// hook form validation
	const { register, handleSubmit, errors, reset, control, watch } =
		useFormHandler(profileSocialValidation);

	const onSubmit = async (data) => {
		const formatedData = {
			socialLinks: {
				portfolio: data.portfolio,
				linkedin: data.linkedin,
				github: data.github,
				behance: data.behance,
			},
		};
		try {
			const response = await axiosInstance.put(
				`/auth/update-profile`,
				formatedData
			);
			dispatch(updateUserInfo(response?.data?.data));
			showSuccess(response?.data?.message);
		} catch (error) {
			showError(error?.response?.data?.message);
		}
	};

	return (
    <div className="grid bg-white mx-2 p-4 rounded-md shadow">
      <h2 className="py-2 text-xl text-purple-500 tracking-wide font-semibold">
        Social Network
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-5 grid lg:grid-cols-2 gap-3">
          <TextInput
            label={"Portfolio Url"}
            type={"text"}
            value={userInfo?.apps?.jobPortal?.socialLinks?.portfolio}
            registering={register("portfolio")}
            errors={errors.portfolio}
          />
          <TextInput
            label={"GitHub Url"}
            type={"text"}
            value={userInfo?.apps?.jobPortal?.socialLinks?.github}
            registering={register("github")}
            errors={errors.github}
          />
          <TextInput
            label={"LinkedIn Url"}
            type={"text"}
            value={userInfo?.apps?.jobPortal?.socialLinks?.linkedin}
            registering={register("linkedin")}
            errors={errors.linkedin}
          />
          <TextInput
            label={"Behance Url"}
            type={"text"}
            value={userInfo?.apps?.jobPortal?.socialLinks?.behance}
            registering={register("behance")}
            errors={errors.behance}
          />
        </div>

        <Button
          type="submit"
          className="bg-purple-500 hover:bg-purple-400 w-fit mt-3 text-end"
        >
          Update
        </Button>
      </form>
    </div>
  );
}

export default ProjectInfos;

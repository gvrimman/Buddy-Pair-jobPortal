import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../../../common/TextInput";
import useFormHandler from "../../../../hooks/ReactHookForm/Index";
import SelectInput from "../../../common/SelectInput";
import {
	experienceData,
	locationOptions,
	preferredJobType,
	professions,
	skillOptions,
} from "../../../../utils/constants";
import MultiSelect from "../../../common/MultiSelect";
import { Button } from "@material-tailwind/react";
import { profileJobValidation } from "../../../../utils/yupValidations";
import { showError, showSuccess } from "../../../../utils/toast";
import { updateUserInfo } from "../../../../Redux/reducers/userReducer";
import axiosInstance from "../../../../utils/axios";

function ExperienceInfos() {
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.user);
	// hook form validation
	const { register, handleSubmit, errors, reset, control, watch } =
		useFormHandler(profileJobValidation, {
			defaultValues: {
				profession: userInfo?.apps?.jobPortal?.profession || [],
				skills: userInfo?.apps?.jobPortal?.skills || [],
				preferredJobLocation:
					userInfo?.apps?.jobPortal?.preferredJobLocation || [],
			},
		});
	const onSubmit = async (data) => {
		const formatedData = {
			jobDetails: {
				jobTitle: data.jobTitle,
				companyName: data.companyName,
				location: data.location,
				ctc: data.ctc,
				eCtc: data.eCtc,
				workExperience: data.workExperience,
			},
			profession: data.profession.map((prof) => prof.value),
			skills: data.skills.map((skill) => skill.value),
			preferredJobLocation: data.preferredJobLocation.map(
				(loc) => loc.value
			),
			preferredJobType: data.preferredJobType,
			resume: data.resume,
		};
		try {
			const response = await axiosInstance.put(
				`/auth/update-profile`,
				formatedData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
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
        My Job Experience
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-5 grid lg:grid-cols-2 gap-3">
          <MultiSelect
            name={"profession"}
            control={control}
            options={professions}
            placeholder={"Professions"}
            // registering={register("profession")}
            errors={errors["profession"]}
            value={userInfo?.apps?.jobPortal?.profession}
          />
          <TextInput
            label={"Job Title"}
            type={"text"}
            value={userInfo?.apps?.jobPortal?.jobDetails?.jobTitle}
            registering={register("jobTitle")}
            errors={errors.jobTitle}
          />
          <TextInput
            label={"Recent Company Name"}
            type={"text"}
            value={userInfo?.apps?.jobPortal?.jobDetails?.companyName}
            registering={register("companyName")}
            errors={errors.companyName}
          />
          <TextInput
            label={"Company Location"}
            type={"text"}
            value={userInfo?.apps?.jobPortal?.jobDetails?.location}
            registering={register("location")}
            errors={errors.location}
          />
          <TextInput
            label={"Current CTC"}
            type={"number"}
            value={userInfo?.apps?.jobPortal?.jobDetails?.ctc}
            registering={register("ctc")}
            errors={errors.ctc}
          />
          <TextInput
            label={"Expected CTC"}
            type={"number"}
            value={userInfo?.apps?.jobPortal?.jobDetails?.eCtc}
            registering={register("eCtc")}
            errors={errors.eCtc}
          />

          <SelectInput
            label={"Total Work Experience"}
            options={experienceData}
            name={"workExperience"}
            control={control}
            errors={errors.workExperience}
            value={userInfo?.apps?.jobPortal?.jobDetails?.workExperience}
          />
          <MultiSelect
            name={"skills"}
            control={control}
            options={skillOptions}
            placeholder={"Skills"}
            // registering={register("skills")}
            errors={errors["skills"]}
            value={userInfo?.apps?.jobPortal?.skills}
          />
          <MultiSelect
            name={"preferredJobLocation"}
            control={control}
            options={locationOptions}
            placeholder={"Preferred Job Location"}
            // registering={register("preferredJobLocation")}
            errors={errors["preferredJobLocation"]}
            value={userInfo?.apps?.jobPortal?.preferredJobLocation}
          />

          <SelectInput
            label={"Preferred Job Type"}
            options={preferredJobType}
            name={"preferredJobType"}
            control={control}
            errors={errors.preferredJobType}
            value={userInfo?.apps?.jobPortal?.preferredJobType}
          />
          <div className="flex gap-3 items-center">
            <TextInput
              type={"file"}
              label={"Update Resume"}
              registering={register("resume")}
              errors={errors["resume"]}
              accept="application/pdf"
            />
            {userInfo?.apps?.jobPortal?.resume ? (
              <a href={userInfo?.apps?.jobPortal?.resume}>
                <Button className="whitespace-nowrap bg-transparent text-purple-500 border border-purple-500">
                  dowload resume
                </Button>
              </a>
            ) : (
              ""
            )}
          </div>
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

export default ExperienceInfos;

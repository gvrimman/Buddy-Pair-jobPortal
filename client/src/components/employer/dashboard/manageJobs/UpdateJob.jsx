import React, { useEffect } from "react";
import TextInput from "../../../common/TextInput";
import { TbLoader2 } from "react-icons/tb";
import TextAreaInput from "../../../common/TextAreaInput";
import MultiSelect from "../../../common/MultiSelect";
import {
	JobStatusData,
	categoryData,
	experienceData,
	industyTypeOptions,
	jobTypes,
	preferedGenderOptions,
	preferredJobType,
	qualificationOptions,
	skillOptions,
} from "../../../../utils/constants";
import SelectInput from "../../../common/SelectInput";
import { Button } from "@material-tailwind/react";
import useFormHandler from "../../../../hooks/ReactHookForm/Index";
import { jobPostValidation } from "../../../../utils/yupValidations";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getJobById, updateAJob } from "../../../../apis/employerApi";

function UpdateJob() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { job, isLoading } = useSelector((state) => state.employer);
  // hook form validation
  const { register, handleSubmit, errors, reset, control, watch } =
    useFormHandler(jobPostValidation);

  // get job by id
  useEffect(() => {
    dispatch(getJobById(id));
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const onSubmit = (data) => {
    dispatch(updateAJob(id, data));
  };
  return (
    <div className="grid bg-white mx-2 p-4 rounded-md shadow max-w-[900px] w-full relative mb-16">
      <h2 className="text-theme-500 py-2 text-lg tracking-wide font-semibold">
        Edit Job
      </h2>
      <div
        className={`fixed inset-0  bg-gray-500 opacity-30 transition  ${
          isLoading ? "block" : "hidden"
        }`}
      ></div>
      <span
        className={`text-theme-900 text-2xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ${
          isLoading ? "block" : "hidden"
        } `}
      >
        <TbLoader2 className="animate-spin text-lg" />
      </span>
      {/* form start */}
      {(!isLoading && job?._id === id) && <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-5 flex flex-col gap-3">
          <TextInput
            label={"Job Title"}
            type={"text"}
            value={job?.jobTitle}
            registering={register("jobTitle")}
            errors={errors.jobTitle}
          />
          <TextAreaInput
            label={"Job Description"}
            type={"text"}
            value={job?.jobDescription}
            registering={register("jobDescription")}
            errors={errors.jobDescription}
          />
        </div>
        <div className="my-2 md:mb-3">
          <MultiSelect
            name={"skills"}
            control={control}
            options={skillOptions}
            placeholder={"Select required skills"}
            registering={register("skills")}
            errors={errors["skills"]}
            value={job?.skills}
          />
        </div>
        <div className="mt-3 grid lg:grid-cols-2 gap-4">
          <SelectInput
            label={"Industry"}
            options={industyTypeOptions}
            name={"industry"}
            control={control}
            errors={errors.industry}
            value={job?.industry}
          />
          <SelectInput
            label={"Job Type"}
            options={jobTypes}
            value={job?.jobType}
            name={"jobType"}
            control={control}
            errors={errors.jobType}
          />
          <SelectInput
            label={"Employment Type"}
            name={"employmentType"}
            value={job?.employmentType}
            options={preferredJobType}
            control={control}
            errors={errors.employmentType}
          />
          <SelectInput
            label={"Experience"}
            name={"experience"}
            options={experienceData}
            control={control}
            value={job?.experience}
            errors={errors.experience}
          />

          <SelectInput
            label={"Qualification"}
            options={qualificationOptions}
            name={"qualification"}
            control={control}
            errors={errors.qualification}
            value={job?.qualification}
          />
          <SelectInput
            label={"Preferred Candidate Gender"}
            name={"candidateGender"}
            options={preferedGenderOptions}
            control={control}
            errors={errors.candidateGender}
            value={job?.candidateGender}
          />
          <SelectInput
            label={"Location"}
            options={categoryData}
            name={"jobLocation"}
            control={control}
            errors={errors.jobLocation}
            value={job?.jobLocation}
          />
          <TextInput
            label={"Offered Salary(12k - 20k)"}
            type={"text"}
            value={job?.offeredSalary}
            registering={register("offeredSalary")}
            errors={errors.offeredSalary}
          />
          <TextInput
            label={"Application Deadline Date"}
            type={"date"}
            value={formatDate(new Date(job?.deadline))}
            registering={register("deadline")}
            errors={errors.deadline}
            min={formatDate(new Date())}
            max={formatDate(
              new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
            )}
          />
          <SelectInput
            label={"Status"}
            options={JobStatusData}
            name={"status"}
            control={control}
            value={job?.status}
          />
          <div className="lg:col-span-2">
            <TextInput
              label={"Job Place"}
              type={"text"}
              value={job?.jobPlace}
              registering={register("jobPlace")}
              errors={errors.jobPlace}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-fit mt-3 text-end bg-theme-500 hover:bg-theme-600"
        >
          Update
        </Button>
      </form>}
      {/* form end */}
    </div>
  );
}

export default UpdateJob;

import React, { useEffect } from "react";
import TextInput from "../../../common/TextInput";
import TextAreaInput from "../../../common/TextAreaInput";
import MultiSelect from "../../../common/MultiSelect";
import {
	categoryData,
	experienceData,
	genderOptions,
	industyTypeOptions,
	jobTypes,
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

	console.log(job);

	// hook form validation
	const { register, handleSubmit, errors, reset, control, watch } =
		useFormHandler(jobPostValidation);

	// get job by id
	useEffect(() => {
		dispatch(getJobById(id));
	}, [dispatch, id]);

	const onSubmit = (data) => {
		dispatch(updateAJob(id, data));
	};
	return (
		<div className="grid bg-white mx-2 p-4 rounded-md shadow">
			<h2 className="py-2 text-lg tracking-wide font-semibold">
				Edit Job
			</h2>

			{/* form start */}
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mt-5 flex flex-col gap-3">
					<TextInput
						label={"Job Title"}
						type={"text"}
						placeText={"Title"}
						value={job?.jobTitle}
						registering={register("jobTitle")}
						errors={errors.jobTitle}
					/>
					<TextAreaInput
						label={"Job Description"}
						type={"text"}
						placeText={""}
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
						options={genderOptions}
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
						label={"Offered Salary"}
						type={"number"}
						value={job?.offeredSalary}
						placeText={"Rs. 25000"}
						registering={register("offeredSalary")}
						errors={errors.offeredSalary}
					/>
					<TextInput
						label={"Application Deadline Date"}
						type={"date"}
						value={
							job?.deadline
								? new Date(job.deadline).toISOString().split("T")[0]
								: ""
						}
						placeText={"20-04-2024"}
						registering={register("deadline")}
						errors={errors.deadline}
					/>
					<div className="lg:col-span-2">
						<TextInput
							label={"Job Place"}
							type={"text"}
							value={job?.jobPlace}
							placeText={""}
							registering={register("jobPlace")}
							errors={errors.jobPlace}
						/>
					</div>
				</div>
				<Button type="submit" className="w-fit mt-3 text-end">
					Update
				</Button>
			</form>
			{/* form end */}
		</div>
	);
}

export default UpdateJob;

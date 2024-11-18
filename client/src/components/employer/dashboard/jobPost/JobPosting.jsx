import { IoBriefcaseOutline } from "react-icons/io5";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { LuCheckCircle } from "react-icons/lu";
import ProcessHead from "./ProcessHead";
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
import { Button } from "@material-tailwind/react";
import useFormHandler from "../../../../hooks/ReactHookForm/Index";
import { jobPostValidation } from "../../../../utils/yupValidations";
import TextInput from "../../../common/TextInput";
import SelectInput from "../../../common/SelectInput";
import TextAreaInput from "../../../common/TextAreaInput";
import axiosInstance from "../../../../utils/axios";
import { showError, showSuccess } from "../../../../utils/toast";
import MultiSelect from "../../../common/MultiSelect";
import { useDispatch } from "react-redux";
import { createAJob } from "../../../../apis/employerApi";

function JobPosting() {
	const dispatch = useDispatch();
	// hook form validation
	const { register, handleSubmit, errors, reset, control, watch } =
		useFormHandler(jobPostValidation);
	// form submit validation
	const onSubmit = (data) => {
		dispatch(createAJob(data));
		reset();
	};

	return (
		<div className="grid bg-white mx-2 p-4 rounded-md shadow">
			<h2 className="py-2 text-lg tracking-wide font-semibold">
				Post Job
			</h2>

			<div className="my-3 mx-2 grid md:grid-cols-2 lg:grid-cols-3 gap-3 items-center justify-between">
				<ProcessHead
					icon={<IoBriefcaseOutline />}
					title={"Job Detail"}
				/>
				<ProcessHead
					icon={<FaMoneyBill1Wave />}
					title={"Package & Payments"}
				/>
				<ProcessHead icon={<LuCheckCircle />} title={"Confirmation"} />
			</div>
			{/* form start */}
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mt-5 flex flex-col gap-3">
					<TextInput
						label={"Job Title"}
						type={"text"}
						placeText={"Title"}
						registering={register("jobTitle")}
						errors={errors.jobTitle}
					/>
					<TextAreaInput
						label={"Job Description"}
						type={"text"}
						placeText={""}
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
					/>
				</div>
				<div className="mt-3 grid lg:grid-cols-2 gap-4">
					<SelectInput
						label={"Industry"}
						options={industyTypeOptions}
						name={"industry"}
						control={control}
						errors={errors.industry}
					/>
					<SelectInput
						label={"Job Type"}
						options={jobTypes}
						name={"jobType"}
						control={control}
						errors={errors.jobType}
					/>
					<SelectInput
						label={"Employment Type"}
						name={"employmentType"}
						options={preferredJobType}
						control={control}
						errors={errors.employmentType}
					/>
					<SelectInput
						label={"Experience"}
						name={"experience"}
						options={experienceData}
						control={control}
						errors={errors.experience}
					/>

					<SelectInput
						label={"Qualification"}
						options={qualificationOptions}
						name={"qualification"}
						control={control}
						errors={errors.qualification}
					/>
					<SelectInput
						label={"Preferred Candidate Gender"}
						name={"candidateGender"}
						options={genderOptions}
						control={control}
						errors={errors.candidateGender}
					/>
					<SelectInput
						label={"Location"}
						options={categoryData}
						name={"jobLocation"}
						control={control}
						errors={errors.jobLocation}
					/>
					<TextInput
						label={"Offered Salary"}
						type={"number"}
						placeText={"Rs. 25000"}
						registering={register("offeredSalary")}
						errors={errors.offeredSalary}
					/>
					<TextInput
						label={"Application Deadline Date"}
						type={"date"}
						placeText={"20-04-2024"}
						registering={register("deadline")}
						errors={errors.deadline}
					/>
					<div className="lg:col-span-2">
						<TextInput
							label={"Job Place"}
							type={"text"}
							placeText={
								"S 107, 4th Floor Monlash Business Centre Crescens Tower, South Kalamassery, Kochi, Kerala 682033, India"
							}
							registering={register("jobPlace")}
							errors={errors.jobPlace}
						/>
					</div>
				</div>
				<Button type="submit" className="w-fit mt-3 text-end">
					Post
				</Button>
			</form>
			{/* form end */}
		</div>
	);
}

export default JobPosting;

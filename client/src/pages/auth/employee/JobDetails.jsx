import { Button } from "@material-tailwind/react";
import React from "react";
import TextInput from "../../../components/common/TextInput";
import useFormHandler from "../../../hooks/ReactHookForm/Index";
import { jobValidation } from "../../../utils/yupValidations";
import SelectInput from "../../../components/common/SelectInput";
import { experienceData } from "../../../utils/constants";

function JobDetails({ setUserData, onClose, openEmployeeResumeModal }) {
	const { register, handleSubmit, errors, reset, control, watch } =
		useFormHandler(jobValidation);

	const onSubmit = (data) => {
		console.log(data);
		setUserData((prev) => ({ ...prev, jobDetails: data }));
		onClose();
		reset();

		setTimeout(() => {
			openEmployeeResumeModal();
		}, 300);
	};
	return (
		<div className="flex flex-col gap-4 px-1 py-5">
			<div className="relative text-center">
				<h1 className="text-customViolet text-lg md:text-2xl font-bold">
					Work Experience
				</h1>
				<p className="text-[#0000008a] text-sm md:text-base font-semibold my-2">
					Provide your recent Job Details
				</p>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="relative grid md:grid-cols-2 gap-3 md:gap-4 mb-3">
					<TextInput
						type={"text"}
						label={"Job Title"}
						registering={register("jobTitle")}
						errors={errors["jobTitle"]}
					/>
					<TextInput
						type={"text"}
						label={"Company Name"}
						registering={register("companyName")}
						errors={errors["companyName"]}
					/>
					<TextInput
						type={"text"}
						label={"Location"}
						registering={register("location")}
						errors={errors["location"]}
					/>
					
					<SelectInput
						name={"workExperience"}
						label={"Total Work Experience"}
						control={control}
						registering={register("workExperience")}
						options={experienceData}
						errors={errors["workExperience"]}
					/>
					<TextInput
						type={"number"}
						label={"Current CTC"}
						registering={register("ctc")}
						errors={errors["ctc"]}
					/>
					<TextInput
						type={"number"}
						label={"Expected CTC"}
						registering={register("eCtc")}
						errors={errors["eCtc"]}
					/>
				</div>
				<div className="text-end">
					<Button className="rounded py-2 px-3 sm:py-3 sm:px-4 mx-1 bg-red-400">
						Close
					</Button>
					<Button
						type="submit"
						className="rounded py-2 px-3 sm:py-3 sm:px-4 mx-1 bg-customViolet">
						Next
					</Button>
				</div>
			</form>
		</div>
	);
}

export default JobDetails;

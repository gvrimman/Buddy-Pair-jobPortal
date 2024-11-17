import React from "react";
import { Button } from "@material-tailwind/react";
import TextInput from "../../../components/common/TextInput";
import MultiSelect from "../../../components/common/MultiSelect";
import { skillValidation } from "../../../utils/yupValidations";
import useFormHandler from "../../../hooks/ReactHookForm/Index";
import { skillOptions } from "../../../utils/constants";

function EmployeeSkill({ onClose, setUserData, openEmployeeResumeModel }) {
	const { register, handleSubmit, errors, reset, control, watch } =
		useFormHandler(skillValidation);

	const onSubmit = (data) => {
		const selectedSkill = data.skill.map((skill) => skill.label);
		const portfolio = data.portfolio;
		const linkedin = data.linkedin;
		const github = data.github;
		const behance = data.behance;
		setUserData((prev) => ({
			...prev,
			skill: selectedSkill,
			portfolio,
			linkedin,
			github,
			behance,
		}));
		onClose();

		setTimeout(() => {
			openEmployeeResumeModel();
		}, 300);
	};
	return (
		<div className="flex flex-col gap-4 px-1 py-5">
			<div className="relative text-center">
				<h1 className="text-customViolet text-lg md:text-2xl font-bold">
					Skills
				</h1>
				<p className="text-[#0000008a] text-sm md:text-base font-semibold my-2">
					Share your skills with us.
				</p>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-2 md:mb-3">
					<MultiSelect
						name={"skill"}
						control={control}
						options={skillOptions}
						placeholder={"Select your skills"}
						registering={register("skill")}
						errors={errors["skill"]}
					/>
				</div>
				<div className="relative grid md:grid-cols-2 gap-3 md:gap-4 mb-3">
					<TextInput
						type={"text"}
						label={"Portfolio (Optional)"}
						registering={register("portfolio")}
					/>
					<TextInput
						type={"text"}
						label={"LinkedIn"}
						registering={register("linkedin")}
						errors={errors["linkedin"]}
					/>
					<TextInput
						type={"text"}
						label={"GitHub (Optional)"}
						registering={register("github")}
					/>
					<TextInput
						type={"text"}
						label={"Behance (Optional)"}
						registering={register("behance")}
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

export default EmployeeSkill;

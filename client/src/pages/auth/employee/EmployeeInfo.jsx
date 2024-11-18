import React, { useEffect, useState } from "react";
import avatar from "/assets/images/avatar.png";
import { Button } from "@material-tailwind/react";
import {
	educationType,
	genderOptions,
	locationOptions,
	preferredJobType,
	qualificationOptions,
	skillOptions,
} from "../../../utils/constants";
import { employeeInfoValidation } from "../../../utils/yupValidations";
import useFormHandler from "../../../hooks/ReactHookForm/Index";
import SelectInput from "../../../components/common/SelectInput";
import TextInput from "../../../components/common/TextInput";
import MultiSelect from "../../../components/common/MultiSelect";

function EmployeeInfo({ onClose, setUserData, openJobDetailsModal }) {
	const [previewSrc, setPreviewSrc] = useState(null);

	// hook form validation
	const { register, handleSubmit, errors, reset, control, watch } =
		useFormHandler(employeeInfoValidation);

	// get img before submit
	const prfImg = watch("profileImage");

	const handleImagePreview = () => {
		const file = prfImg && prfImg[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewSrc(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	useEffect(() => {
		handleImagePreview();
	}, [prfImg]);

	const onSubmit = (data) => {
		const selectedLocations = data.preferredJobLocation.map(
			(location) => location.label
		);
		const selectedSkills = data.skills.map((skill) => skill.label);
		const profileImageFile = data.profileImage
			? data.profileImage[0]
			: null;

		const educationType = data.educationType;
		const preferredJobLocation = selectedLocations;
		const preferredJobType = data.preferredJobType;
		const portfolio = data.portfolio;
		const skills = selectedSkills;
		const linkedin = data.linkedin;
		const github = data.github;
		const behance = data.behance;

		const formatedData = {
			educationType,
			preferredJobLocation,
			preferredJobType,
			portfolio,
			skills,
			linkedin,
			github,
			behance,
			profileImage: profileImageFile ? profileImageFile : null,
		};
		setUserData((prev) => ({ ...prev, ...formatedData }));
		onClose();
		reset();

		setTimeout(() => {
			openJobDetailsModal();
		}, 300);
	};
	return (
		<div className=" flex flex-col gap-4 px-1">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="relative text-center">
					<h1 className="text-customViolet text-lg md:text-2xl font-bold">
						Additional Informations
					</h1>
					<p className="text-[#0000008a] text-sm md:text-base font-semibold my-2">
						Provide your infromations
					</p>
				</div>
				<div className="mb-2 md:mb-3">
					<MultiSelect
						name={"skills"}
						control={control}
						options={skillOptions}
						placeholder={"Select your skills"}
						registering={register("skills")}
						errors={errors["skills"]}
					/>
				</div>
				<div className="relative grid md:grid-cols-2 gap-3 md:gap-4 mb-3">
					<SelectInput
						name={"educationType"}
						label={"Education Type"}
						control={control}
						registering={register("educationType")}
						options={educationType}
						errors={errors["educationType"]}
					/>

					<MultiSelect
						name={"preferredJobLocation"}
						control={control}
						options={locationOptions}
						placeholder={"Preferred Job Location"}
						registering={register("preferredJobLocation")}
						errors={errors["preferredJobLocation"]}
					/>
					<SelectInput
						name={"preferredJobType"}
						label={"Preferred Job Type"}
						control={control}
						registering={register("preferredJobType")}
						options={preferredJobType}
						errors={errors["preferredJobType"]}
					/>
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

export default EmployeeInfo;

import { Button } from "@material-tailwind/react";
import {
	educationType,
	locationOptions,
	preferredJobType,
	skillOptions,
} from "../../utils/constants";
import useFormHandler from "../../hooks/ReactHookForm/Index";
import SelectInput from "../../components/common/SelectInput";
import TextInput from "../../components/common/TextInput";
import MultiSelect from "../../components/common/MultiSelect";
import { userAdditionInfoValidation } from "../../utils/yupValidations";
import { useNavigate } from "react-router-dom";

function UserAdditionInfo({
	onClose,
	setUserData,
	userData,
	openJobDetailsModal,
	openUserResumeModal,
}) {

	const navigate = useNavigate()
	// hook form validation
	const { register, handleSubmit, errors, reset, control, watch } =
		useFormHandler(userAdditionInfoValidation);

	const onSubmit = (data) => {
		const selectedLocations = data.preferredJobLocation.map(
			(location) => location.label
		);
		const selectedSkills = data.skills.map((skill) => skill.label);

		const educationInstitute = data.educationInstitute;
		const educationType = data.educationType;
		const preferredJobLocation = selectedLocations;
		const preferredJobType = data.preferredJobType;
		const socialLinks = {
			linkedin: data.linkedin,
			github: data.github,
			behance: data.behance,
			portfolio: data.portfolio,
		};
		const skills = selectedSkills;

		const formatedData = {
			educationInstitute,
			educationType,
			preferredJobLocation,
			preferredJobType,
			socialLinks,
			skills,
		};
		setUserData((prev) => ({ ...prev, ...formatedData }));
		onClose();
		reset();

		setTimeout(() => {
			if (userData.role === "fresher") {
				openUserResumeModal();
			} else if (userData.role === "employee") {
				openJobDetailsModal();
			}
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
					<TextInput
						type={"text"}
						label={"Education institute"}
						registering={register("educationInstitute")}
						errors={errors.educationInstitute}
					/>
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
					<Button
						onClick={() => navigate("/")}
						className="rounded py-2 px-3 sm:py-3 sm:px-4 mx-1 bg-red-400">
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

export default UserAdditionInfo;

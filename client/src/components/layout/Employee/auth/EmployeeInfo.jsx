import React, { useEffect, useState } from "react";
import avatar from "/assets/images/avatar.png";
import { userInfoValidation } from "../../../../utils/yupValidations";
import useFormHandler from "../../../../hooks/ReactHookForm/Index";
import { Button } from "@material-tailwind/react";
import SelectInput from "../../../common/SelectInput";
import TextInput from "../../../common/TextInput";
import {
	educationType,
	genderOptions,
	locationOptions,
	preferredJobType,
	qualificationOptions,
} from "../../../../utils/constants";
import MultiSelect from "../../../common/MultiSelect";

function EmployeeInfo({ onClose, setUserData, openJobDetailsModal }) {
	const [previewSrc, setPreviewSrc] = useState(null);

	// hook form validation
	const { register, handleSubmit, errors, reset, control, watch } =
		useFormHandler(userInfoValidation);

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
		const profileImageFile = data.profileImage
			? data.profileImage[0]
			: null;

		const dob = data.dob;
		const gender = data.gender;
		const qualification = data.qualification;
		const educationType = data.educationType;
		const preferredJobLocation = selectedLocations;
		const preferredJobType = data.preferredJobType;

		const formatedData = {
			dob,
			gender,
			qualification,
			educationType,
			preferredJobLocation,
			preferredJobType,
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
				<div className=" rounded-full w-20 sm:w-24 aspect-square overflow-hidden mx-auto relative">
					<div className="absolute top-1/2 -translate-y-1/2 cursor-pointer opacity-0 scale-150">
						<TextInput
							type={"file"}
							label={"ProfileImage"}
							registering={register("profileImage")}
							errors={errors["profileImage"]}
						/>
					</div>
					<img
						src={previewSrc ? previewSrc : avatar}
						alt=""
						className="w-full h-full object-contain"
					/>
				</div>
				<div className="relative grid md:grid-cols-2 gap-3 md:gap-4 mb-3">
					<TextInput
						type={"date"}
						label={"Date of Birth"}
						registering={register("dob")}
						errors={errors.dob}
					/>
					<SelectInput
						name={"gender"}
						label={"Gender"}
						control={control}
						registering={register("gender")}
						options={genderOptions}
						errors={errors["gender"]}
					/>
					<SelectInput
						name={"qualification"}
						label={"Qualification"}
						control={control}
						registering={register("qualification")}
						options={qualificationOptions}
						errors={errors["qualification"]}
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

import React, { useEffect, useState } from "react";
import avatar from "/assets/images/avatar.png";
import {
	Button,
	List,
	ListItem,
	ListItemPrefix,
	Radio,
	Typography,
} from "@material-tailwind/react";
import useFormHandler from "../../hooks/ReactHookForm/Index";
import { userInfoValidation } from "../../utils/yupValidations";
import {
	educationType,
	genderOptions,
	jobTypes,
	locationOptions,
	professions,
	qualificationOptions,
} from "../../utils/constants";
import TextInput from "../../components/common/TextInput";
import SelectInput from "../../components/common/SelectInput";
import MultiSelect from "../../components/common/MultiSelect";
import { showError } from "../../utils/toast";
import { useNavigate } from "react-router-dom";

function UserInfo({ onClose, setUserData, openUserLocationModal }) {
	const navigate = useNavigate();
	const [previewSrc, setPreviewSrc] = useState(null);
	const [imageErrorShown, setImageErrorShown] = useState(false);

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

	const [selectedOption, setSelectedOption] = useState("");
	const handleRadioChange = (option) => {
		setSelectedOption(option);
	};

	// form sumbission
	const onSubmit = (data) => {
		if (selectedOption === "") {
			showError("Please select your status");
			return;
		}
		const selectedProfession = data.profession.map((prof) => prof.label);
		const profileImageFile = data.profileImage
			? data.profileImage[0]
			: null;

		if(!imageErrorShown && !profileImageFile) {
			setImageErrorShown(true);
			showError("Please select your Profile Picture");
      		return;
		}
		const dob = data.dob;
		const gender = data.gender;
		const qualification = data.qualification;
		const profession = selectedProfession;

		const formatedData = {
			dob,
			gender,
			qualification,
			profession,
			profileImage: profileImageFile ? profileImageFile : null,
			role: selectedOption,
		};
		setUserData(formatedData);
		onClose();
		reset();

		setTimeout(() => {
			openUserLocationModal();
		}, 300);
	};

	return (
		<div className=" flex flex-col gap-4 px-1 my-4">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Typography
					variant="h4"
					color="blue-gray"
					className="text-center">
					Personal Details
				</Typography>

				<div className=" rounded-full w-20 sm:w-24 aspect-square overflow-hidden mx-auto relative">
					<div className="absolute top-1/2 -translate-y-1/2 cursor-pointer opacity-0 scale-150">
						<TextInput
							type={"file"}
							label={"ProfileImage"}
							accept={"image/*"}
							registering={register("profileImage")}
							errors={errors["profileImage"]}
						/>
					</div>
					<img
						src={previewSrc ? previewSrc : avatar}
						alt=""
						className="w-full h-full object-contain"
						loading="lazy"
					/>
				</div>
				<div className="relative grid md:grid-cols-2 gap-3 md:gap-8 mb-3">
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

					<MultiSelect
						name={"profession"}
						control={control}
						options={professions}
						placeholder={"Professions"}
						registering={register("profession")}
						errors={errors["profession"]}
					/>
				</div>
				<div>
					<List className="flex-row flex-wrap sm:flex-nowrap">
						<ListItem className="p-0 w-fit sm:w-full">
							<label className="flex w-full cursor-pointer items-center px-3 py-2">
								<ListItemPrefix className="mr-3">
									<Radio
										color="blue-gray"
										name="horizontal-list"
										ripple={false}
										className="hover:before:opacity-0 "
										containerProps={{
											className: "p-0",
										}}
										onChange={() =>
											handleRadioChange("fresher")
										}
										checked={selectedOption === "fresher"}
									/>
								</ListItemPrefix>
								<Typography
									color="blue-gray"
									className="font-medium text-blue-gray-400 text-sm md:text-base">
									Fresher
								</Typography>
							</label>
						</ListItem>
						<ListItem className="p-0 w-fit sm:w-full">
							<label className="flex w-full cursor-pointer items-center px-3 py-2">
								<ListItemPrefix className="mr-3">
									<Radio
										color="blue-gray"
										name="horizontal-list"
										ripple={false}
										className="hover:before:opacity-0"
										containerProps={{
											className: "p-0",
										}}
										onChange={() =>
											handleRadioChange("employee")
										}
										checked={selectedOption === "employee"}
									/>
								</ListItemPrefix>
								<Typography
									color="blue-gray"
									className="font-medium text-blue-gray-400 text-sm md:text-base">
									Employee
								</Typography>
							</label>
						</ListItem>
						<ListItem className="p-0 w-fit sm:w-full">
							<label className="flex w-full cursor-pointer items-center px-3 py-2">
								<ListItemPrefix className="mr-3">
									<Radio
										color="blue-gray"
										name="horizontal-list"
										ripple={true}
										className="hover:before:opacity-0"
										containerProps={{
											className: "p-0",
										}}
										onChange={() =>
											handleRadioChange("employer")
										}
										checked={selectedOption === "employer"}
									/>
								</ListItemPrefix>
								<Typography
									color="blue-gray"
									className="font-medium text-blue-gray-400 text-sm md:text-base">
									Employer
								</Typography>
							</label>
						</ListItem>
					</List>
				</div>
				<div className="text-end">
					<Button
						type="submit"
						className=" py-2 px-3 sm:py-3 sm:px-4 mx-1 ">
						Next
					</Button>
					<Button
						onClick={() => navigate("/")}
						className="py-2 px-3 sm:py-3 sm:px-4 mx-1 bg-red-400">
						Close
					</Button>
				</div>
			</form>
		</div>
	);
}

export default UserInfo;

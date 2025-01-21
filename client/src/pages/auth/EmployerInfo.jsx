import React, { useEffect, useState } from "react";
import avatar from "/assets/images/office.png";
import { Button, Typography } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import {
	companySizeOptions,
	industyTypeOptions,
	preferredJobType,
} from "../../utils/constants";
import { setUser } from "../../Redux/reducers/userReducer";
import TextInput from "../../components/common/TextInput";
import SelectInput from "../../components/common/SelectInput";
import useFormHandler from "../../hooks/ReactHookForm/Index";
import { emplyerInfoValidation } from "../../utils/yupValidations";
import { showError, showSuccess } from "../../utils/toast";
import axiosInstance from "../../utils/axios";
import { RiLoader4Line } from "react-icons/ri";

function EmployerInfo({ userData, onClose, goBack }) {
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch();
	const [previewSrc, setPreviewSrc] = useState(null);

	// hook form validation
	const { register, handleSubmit, errors, reset, control, watch } =
		useFormHandler(emplyerInfoValidation);

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

	const onSubmit = async (data) => {
		try {
			const finalData = {
				...userData,
				companyLogo: data.profileImage ? data.profileImage[0] : null,
				companyName: data.companyName,
				companyEmail: data.companyEmail,
				companySite: data.companySite,
				companyAddress: data.companyAddress,
				companyDescription: data.companyDescription,
				companySize: data.companySize,
				industryType: data.industryType,
				employmentType: data.employmentType,
				companyLinkedin: data.companyLinkedin,
			};
			setIsLoading(true);
			const response = await axiosInstance.post(
				"/auth/employer-signup",
				finalData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			dispatch(setUser(response?.data?.data));
			setIsLoading(false);
			onClose();
			showSuccess(response?.data?.message);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
			showError(error.response?.data?.message);
		}
	};

	return (
		<div className=" flex flex-col gap-4 px-1">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Typography
					variant="h4"
					color="blue-gray"
					className="text-center pb-4">
					Company Details
				</Typography>
				<div className=" rounded-full w-20 sm:w-24 aspect-square overflow-hidden mx-auto relative mb-4">
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
						loading="lazy"
					/>
				</div>
				<div className="relative grid md:grid-cols-2 gap-3 md:gap-8 mb-3">
					<TextInput
						type={"text"}
						label={"Company Name"}
						registering={register("companyName")}
						errors={errors.companyName}
					/>
					<TextInput
						type={"email"}
						label={"Company Email"}
						registering={register("companyEmail")}
						errors={errors.companyEmail}
					/>
					<TextInput
						type={"text"}
						label={"Company Website"}
						registering={register("companySite")}
						errors={errors.companySite}
					/>
					<TextInput
						type={"text"}
						label={"Company Address"}
						registering={register("companyAddress")}
						errors={errors.companyAddress}
					/>
					<TextInput
						type={"text"}
						label={"Company Description"}
						registering={register("companyDescription")}
						errors={errors.companyDescription}
					/>
					<SelectInput
						name={"companySize"}
						label={"Company Size"}
						control={control}
						registering={register("companySize")}
						options={companySizeOptions}
						errors={errors["companySize"]}
					/>
					<SelectInput
						name={"industryType"}
						label={"Industry Type"}
						control={control}
						registering={register("industryType")}
						options={industyTypeOptions}
						errors={errors["industryType"]}
					/>
					<SelectInput
						name={"employmentType"}
						label={"Employment Type"}
						control={control}
						registering={register("employmentType")}
						options={preferredJobType}
						errors={errors["employmentType"]}
					/>
					<TextInput
						type={"text"}
						label={"LinkedIn"}
						registering={register("companyLinkedin")}
						errors={errors.companyLinkedin}
					/>
				</div>
				<div className="text-end">
					<Button
						onClick={goBack}
						className=" py-2 px-3 sm:py-3 sm:px-4 mx-1">
						Back
					</Button>
					<Button
						disabled={isLoading}
						type="submit"
						className=" py-2 px-3 sm:py-3 sm:px-4 mx-1 bg-red-400">
						{isLoading ? (
							<span>
								<RiLoader4Line className="animate-spin text-xl" />
							</span>
						) : (
							"Next"
						)}
					</Button>
				</div>
			</form>
		</div>
	);
}

export default EmployerInfo;

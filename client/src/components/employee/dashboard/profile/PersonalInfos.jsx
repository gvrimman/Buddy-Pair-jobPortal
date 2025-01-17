import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../../../common/TextInput";
import { Button } from "@material-tailwind/react";
import useFormHandler from "../../../../hooks/ReactHookForm/Index";
import SelectInput from "../../../common/SelectInput";
import { genderOptions } from "../../../../utils/constants";
import { profileInfoValidation } from "../../../../utils/yupValidations";
import axiosInstance from "./../../../../utils/axios";
import { showError, showSuccess } from "../../../../utils/toast";
import { updateUserInfo } from "../../../../Redux/reducers/userReducer";
import TextAreaInput from "./../../../common/TextAreaInput";

function PersonalInfos() {
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.user);
	// hook form validation
	const { register, handleSubmit, errors, reset, control, watch } =
		useFormHandler(profileInfoValidation);

	const dateValue = new Date(userInfo?.apps?.jobPortal?.dob);
	const formatedDate = dateValue?.toISOString().slice(0, 10);
	// ----------------------------------------------------------------
	const [previewSrc, setPreviewSrc] = useState(null);
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
	// ----------------------------------------------------------------

	const onSubmit = async (data) => {

		try {
			const response = await axiosInstance.put(
				`/auth/update-profile`,
				data,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			dispatch(updateUserInfo(response?.data?.data));
			showSuccess(response?.data?.message);
		} catch (error) {
			showError(error?.response?.data?.message);
		}
	};

	return (
		<div className="grid bg-white mx-2 p-4 rounded-md shadow">
			<h2 className="py-2 text-xl text-purple-500 tracking-wide font-semibold">
				My Profile
			</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="rounded-full border border-purple-500 border-spacing-2 w-20 sm:w-24 aspect-square overflow-hidden mx-auto mb-8 relative">
					<div className="absolute top-1/2 -translate-y-1/2 cursor-pointer opacity-0 scale-150">
						<TextInput
							type={"file"}
							accept="image/*"
							label={"ProfileImage"}
							registering={register("profileImage")}
							errors={errors["profileImage"]}
						/>
					</div>
					<img
						src={
							previewSrc
								? previewSrc
								: userInfo?.apps?.jobPortal?.profileImage
						}
						alt=""
						loading="lazy"
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="mt-5 grid lg:grid-cols-2 gap-3 mb-3">
					<TextInput
						label={"Name"}
						type={"text"}
						value={userInfo?.username}
						registering={register("username")}
						errors={errors.username}
					/>
					<TextInput
						label={"Email Address"}
						type={"email"}
						value={userInfo?.email}
						registering={register("email")}
						errors={errors.email}
					/>
					<TextInput
						label={"Phone"}
						type={"number"}
						value={userInfo?.phone}
						registering={register("phone")}
						errors={errors.phone}
					/>
					<TextInput
						label={"Date of Birth"}
						type={"date"}
						value={formatedDate}
						registering={register("dob")}
						errors={errors.dob}
					/>
					<SelectInput
						label={"Gender"}
						options={genderOptions}
						name={"gender"}
						control={control}
						errors={errors.gender}
						value={userInfo?.apps?.jobPortal?.gender}
					/>
				</div>
				<TextAreaInput
					label={"About Me"}
					value={userInfo?.apps?.jobPortal?.about}
					registering={register("about")}
					errors={errors.about}
				/>
				<Button type="submit" className="bg-purple-500 hover:bg-purple-400 w-fit mt-3 text-end">
					Update
				</Button>
			</form>
		</div>
	);
}

export default PersonalInfos;

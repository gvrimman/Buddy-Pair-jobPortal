import React, { useEffect, useState } from "react";
import InputForms from "../../../common/InputForms";
import { Button } from "@material-tailwind/react";
import {
	emplyerInfoValidation,
	loginValidations,
} from "../../../../utils/yupValidations";
import useFormHandler from "../../../../hooks/ReactHookForm/Index";
import TextInput from "../../../common/TextInput";
import SelectInput from "../../../common/SelectInput";
import { companySizeOptions } from "../../../../utils/constants";

function ProfileForm({ infos }) {
	const { register, handleSubmit, errors, reset, control, watch } =
		useFormHandler(emplyerInfoValidation);
	return (
		<div className="grid bg-white mx-2 p-4 rounded-md shadow">
			<h2 className="py-2 text-lg tracking-wide font-semibold">
				Profile
			</h2>
			{/* <ImgUploader boxText={"Browse Logo"} name={"companyLogo"} />
			<ImgUploader boxText={"Browse Cover"} name={"companyCoverImg"} /> */}

			<div className="mt-5 grid lg:grid-cols-2 gap-3">
				<TextInput
					type={"text"}
					label={"Company Name"}
					errors={errors.companyName}
					registering={register("companyName")}
				/>
				<TextInput
					type={"email"}
					label={"Email address"}
					errors={errors.companyEmail}
					registering={register("companyEmail")}
				/>
				<TextInput
					type={"number"}
					label={"Phone"}
					errors={errors.contactNumber}
					registering={register("contactNumber")}
				/>
				<TextInput
					type={"text"}
					label={"Website"}
					errors={errors.companySite}
					registering={register("companySite")}
				/>
				<SelectInput
					name={"companySize"}
					label={"Company Size"}
					control={control}
					registering={register("companySize")}
					options={companySizeOptions}
					errors={errors["companySize"]}
				/>
				<TextInput
					type={"text"}
					label={"Company Description"}
					registering={register("companyDescription")}
					errors={errors.companyDescription}
				/>
			</div>
			<Button className="my-3">save</Button>
			{/* <FormButton text={"Save"} saveParentValue={handleProfileSave} /> */}
		</div>
	);
}

export default ProfileForm;

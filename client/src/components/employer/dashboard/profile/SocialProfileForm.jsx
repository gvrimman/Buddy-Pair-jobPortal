import React, { useState } from "react";
import InputForms from "../../../common/InputForms";
import { Button } from "@material-tailwind/react";
import TextInput from "../../../common/TextInput";
import { emplyerInfoValidation } from "../../../../utils/yupValidations";
import useFormHandler from "../../../../hooks/ReactHookForm/Index";

function SocialProfileForm({ infos }) {
	// hook form validation
	const { register, handleSubmit, errors, reset, control, watch } =
		useFormHandler(emplyerInfoValidation);
	return (
		<div className="grid bg-white mx-2 p-4 rounded-md shadow">
			<h2 className="py-2 text-lg tracking-wide font-semibold">
				Social Network
			</h2>
			<div className="mt-4 grid lg:grid-cols-2 gap-3">
				<TextInput
					type={"text"}
					label={"LinkedIn"}
					registering={register("companyLinkedin")}
					errors={errors.companyLinkedin}
				/>
			</div>
			<Button className="my-3">Save</Button>
			{/* <FormButton text={"Save"} saveParentValue={handleSocialProfileSave} /> */}
		</div>
	);
}

export default SocialProfileForm;

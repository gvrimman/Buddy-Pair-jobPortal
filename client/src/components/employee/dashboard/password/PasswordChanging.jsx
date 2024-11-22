import React, { useState } from "react";
import FormButton from "../../../common/FormButton";
import InputForms from "../../../common/InputForms";
import TextInput from "../../../common/TextInput";
import { Button } from "@material-tailwind/react";

function PasswordChanging() {
	return (
		<div className="bg-white p-4 grid gap-4 rounded-md shadow">
			<h1 className="text-xl font-semibold tracking-wider">
				Change Password
			</h1>
			<TextInput type={"password"} label={"Old Password"} />
			<TextInput type={"password"} label={"New Password"} />
			<TextInput type={"password"} label={"Confirm Password"} />
			<Button>Change Password</Button>
		</div>
	);
}

export default PasswordChanging;

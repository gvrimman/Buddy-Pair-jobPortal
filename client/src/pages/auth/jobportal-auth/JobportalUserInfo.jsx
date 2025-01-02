import React, { useState } from "react";
import DialogModal from "../../../components/common/DialogModal";
import { Button, DialogBody, Input, Typography } from "@material-tailwind/react";
import TextInput from "../../../components/common/TextInput";
import SelectInput from "../../../components/common/SelectInput";
import useFormHandler from "../../../hooks/ReactHookForm/Index";
import MultiSelect from "../../../components/common/MultiSelect";
import { skillOptions } from "../../../utils/constants";
import { AiOutlineUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function JobportalUserInfo() {
	const navigate = useNavigate()
	const [show, setShow] = useState(false);
	const { register, handleSubmit, errors, reset, control, watch } =
		useFormHandler();

	const handleChange = (e) => {
		if (e.target.value) {
			setShow(true);
		} else {
			setShow(false);
		}
	};

	console.log(show);

	return (
		<DialogModal isOpen={true} scale={{ s: "sm", m: "md" }}>
			<DialogBody>
				<form>
					<div className="relative text-center">
						<Typography
							variant="h4"
							color="blue-gray"
							className="text-center">
							Additional Informations
						</Typography>
						<p className="text-[#0000008a] text-sm md:text-base font-semibold my-2">
							Provide your job Preference
						</p>
					</div>
					<div className="relative grid md:grid-cols-2 gap-3 my-3">
						<TextInput type={"text"} label="Job Title" />
						<TextInput type={"text"} label={"Preferred Location"} />
						<TextInput type={"number"} label={"Expected Salary"} />
						<div className="relative border border-gray-400 rounded-md">
							<span className="absolute top-1/2 -translate-y-1/2 left-2 text-sm">
								Upload your resume
							</span>
							<span className="absolute right-2 top-1/2 -translate-y-1/2">
								<AiOutlineUpload />
							</span>
							<input
								type="file"
								name=""
								id=""
								className="opacity-0"
							/>
						</div>
					</div>
					<div>
						<MultiSelect
							name={"skills"}
							control={control}
							options={skillOptions}
							placeholder={"Select your skills"}
							registering={register("skills")}
							errors={errors["skills"]}
						/>
					</div>
					<div className="w-full h-[2px] bg-gray-400 mt-4 mb-2"></div>
					<p className="text-xs">
						<span className="text-red-500">*</span>optional [if
						you've already working]
					</p>
					<div className="my-3">
						<Input label="Company Name" onChange={handleChange} />
					</div>

					<div
						className={` overflow-hidden transition-[max-height] duration-300 ease-in-out ${
							show ? "max-h-[600px]" : "max-h-0"
						}`}>
						<div className="grid md:grid-cols-2 gap-3 pt-1">
							<TextInput type={"text"} label={"Designation"} />
							<TextInput
								type={"date"}
								label={"Last Working Date"}
							/>
							<TextInput
								type={"number"}
								label={"Last Withdrawan Salary"}
							/>
							<TextInput type={"text"} label={"Quit Reason"} />
						</div>
					</div>
					<div className="text-end mt-3">
						<Button
						onClick={() => navigate("/job-portal/employer")}
							type="submit"
							className=" py-2 px-3 sm:py-3 sm:px-4 mx-1 ">
							Next
						</Button>
						<Button
							className=" py-2 px-3 sm:py-3 sm:px-4 mx-1 bg-red-400">
							Close
						</Button>
					</div>
				</form>
			</DialogBody>
		</DialogModal>
	);
}

export default JobportalUserInfo;

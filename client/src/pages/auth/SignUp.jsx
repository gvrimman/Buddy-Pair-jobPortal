import {
	Button,
	List,
	ListItem,
	ListItemPrefix,
	Radio,
	Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { FcGoogle, FcPhoneAndroid } from "react-icons/fc";
import { Link } from "react-router-dom";
import TextInput from "../../components/common/TextInput";
import useFormHandler from "../../hooks/ReactHookForm/Index";
import { signupValidations } from "../../utils/yupValidations";

function SignUp({ onClose, setUserData, openSignInModal, openUserInfoModal }) {
	const [selectedOption, setSelectedOption] = useState("");

	const handleRadioChange = (option) => {
		setSelectedOption(option);
	};

	// validate inputs
	const { register, handleSubmit, errors, reset } =
		useFormHandler(signupValidations);

	const onSubmit = (data) => {
		

		if (selectedOption !== "") {
			onClose();
		} else {
			alert("Please select option");
			return;
		}

		setUserData({ ...data, role: selectedOption });
		reset();

		setTimeout(() => {
			openUserInfoModal();
		}, 300);
	};

	return (
		<div className=" flex flex-col gap-4 px-1 py-5">
			<div className="relative text-center">
				<Link
					to={"/"}
					className="absolute -top-4 -left-1 border rounded-md p-1 bg-transparent text-2xl text-cyan-500 hover:text-blue-700 hover:border-blue-500 cursor-pointer">
					<AiOutlineHome />
				</Link>
				<h1 className="text-customViolet text-lg md:text-2xl font-bold">
					Sign Up
				</h1>
				<p className="text-[#0000008a] text-sm md:text-base font-semibold my-2">
					Enter your details to Sign up
				</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="relative grid md:grid-cols-2 gap-3 md:gap-4 mb-3">
					<TextInput
						type={"text"}
						label={"Name"}
						registering={register("name")}
						errors={errors.name}
					/>
					<TextInput
						type={"email"}
						label={"Email Address"}
						registering={register("email")}
						errors={errors["email"]}
					/>
					<TextInput
						type={"text"}
						label={"Phone Number"}
						registering={register("contactNumber")}
						errors={errors["contactNumber"]}
					/>
					<TextInput
						type={"password"}
						label={"Password"}
						registering={register("password")}
						errors={errors["password"]}
					/>
					<TextInput
						type={"password"}
						label={"Confirm Password"}
						registering={register("confirmPassword")}
						errors={errors["confirmPassword"]}
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
											handleRadioChange("Fresher")
										}
										checked={selectedOption === "Fresher"}
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
											handleRadioChange("Employee")
										}
										checked={selectedOption === "Employee"}
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
											handleRadioChange("Employer")
										}
										checked={selectedOption === "Employer"}
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

				<Button
					type="submit"
					className="bg-customViolet w-full py-2 md:py-3 rounded capitalize font-normal text-sm">
					Sign up
				</Button>

				<p className="mt-2 subpixel-antialiased text-center text-sm font-semibold">
					Already have an account?
					<span
						className="cursor-pointer underline"
						onClick={openSignInModal}>
						{" "}
						Sign in
					</span>
				</p>
			</form>

			<div className="flex items-center gap-2">
				<div className="w-full border border-gray-500"></div>
				<p className="text-[#0000008a] text-xs ">OR</p>
				<div className="w-full border border-gray-500"></div>
			</div>

			<div className="flex flex-col md:flex-row gap-2">
				<Button className="bg-transparent text-[#000000c5] text-sm border border-gray-400 capitalize flex items-center gap-2 justify-center md:flex-1 py-2 md:py-3 rounded font-normal">
					<span className="text-lg md:text-xl">
						<FcGoogle />
					</span>
					Sign in with Google
				</Button>
				<Button className="bg-transparent text-[#000000c5] text-sm border border-gray-400 capitalize flex items-center gap-2 justify-center md:flex-1 py-2 md:py-3 rounded font-normal">
					<span className="text-lg md:text-xl">
						<FcPhoneAndroid />
					</span>
					Sign in with Phone
				</Button>
			</div>
		</div>
	);
}

export default SignUp;

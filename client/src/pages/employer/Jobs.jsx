import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import TextInput from "../../components/common/TextInput";
import SelectInput from "../../components/common/SelectInput";
import MultiSelect from "../../components/common/MultiSelect";
import TextAreaInput from "../../components/common/TextAreaInput";
import useFormHandler from "../../hooks/ReactHookForm/Index";
import { jobPostValidation } from "../../utils/yupValidations";
import {
	categoryData,
	experienceData,
	genderOptions,
	industyTypeOptions,
	jobTypes,
	preferredJobType,
	qualificationOptions,
	skillOptions,
} from "../../utils/constants";
import JobCard from "../../components/common/JobCard";

const jobsData = [
	{
		title: "Frontend Developer",
		location: "Kochi, Kerala",
		salary: "₹6 LPA - ₹10 LPA",
		noticePeriod: "30 Days",
		skills: ["React", "JavaScript", "CSS"],
	},
	{
		title: "Backend Developer",
		location: "Thiruvananthapuram, Kerala",
		salary: "₹8 LPA - ₹12 LPA",
		noticePeriod: "Immediate",
		skills: ["Node.js", "MongoDB", "AWS"],
	},
	{
		title: "Full Stack Developer",
		location: "Kozhikode, Kerala",
		salary: "₹10 LPA - ₹15 LPA",
		noticePeriod: "15 Days",
		skills: ["React", "Node.js", "AWS"],
	},
	{
		title: "DevOps Engineer",
		location: "Kochi, Kerala",
		salary: "₹7 LPA - ₹11 LPA",
		noticePeriod: "45 Days",
		skills: ["Docker", "Kubernetes", "CI/CD"],
	},
	{
		title: "Software Engineer",
		location: "Thrissur, Kerala",
		salary: "₹5 LPA - ₹9 LPA",
		noticePeriod: "30 Days",
		skills: ["Python", "Django", "PostgreSQL"],
	},
	{
		title: "Product Manager",
		location: "Kochi, Kerala",
		salary: "₹12 LPA - ₹18 LPA",
		noticePeriod: "Immediate",
		skills: ["Agile", "Scrum", "JIRA"],
	},
	{
		title: "Data Scientist",
		location: "Kannur, Kerala",
		salary: "₹10 LPA - ₹14 LPA",
		noticePeriod: "15 Days",
		skills: ["Python", "Machine Learning", "SQL"],
	},
	{
		title: "AI Engineer",
		location: "Kottayam, Kerala",
		salary: "₹15 LPA - ₹20 LPA",
		noticePeriod: "60 Days",
		skills: ["TensorFlow", "PyTorch", "Deep Learning"],
	},
	{
		title: "QA Engineer",
		location: "Kochi, Kerala",
		salary: "₹4 LPA - ₹6 LPA",
		noticePeriod: "30 Days",
		skills: ["Selenium", "Java", "Cypress"],
	},
	{
		title: "Mobile Developer",
		location: "Thiruvananthapuram, Kerala",
		salary: "₹7 LPA - ₹10 LPA",
		noticePeriod: "30 Days",
		skills: ["Flutter", "React Native", "Kotlin"],
	},
	{
		title: "Game Developer",
		location: "Kochi, Kerala",
		salary: "₹9 LPA - ₹13 LPA",
		noticePeriod: "30 Days",
		skills: ["Unity", "C#", "Blender"],
	},
	{
		title: "Network Engineer",
		location: "Thrissur, Kerala",
		salary: "₹6 LPA - ₹9 LPA",
		noticePeriod: "Immediate",
		skills: ["Cisco", "Networking", "VPN"],
	},
	{
		title: "Security Analyst",
		location: "Kannur, Kerala",
		salary: "₹8 LPA - ₹12 LPA",
		noticePeriod: "15 Days",
		skills: ["Cybersecurity", "Firewalls", "Incident Response"],
	},
	{
		title: "UI Designer",
		location: "Kochi, Kerala",
		salary: "₹5 LPA - ₹8 LPA",
		noticePeriod: "15 Days",
		skills: ["Figma", "Sketch", "Adobe XD"],
	},
	{
		title: "Cloud Architect",
		location: "Thiruvananthapuram, Kerala",
		salary: "₹14 LPA - ₹20 LPA",
		noticePeriod: "30 Days",
		skills: ["AWS", "Azure", "GCP"],
	},
];

function Jobs() {
	const [jobFormShow, setJobFormShow] = useState(false);
	const { register, handleSubmit, errors, reset, control, watch } =
		useFormHandler(jobPostValidation);

	const onSubmit = (data) => {
		reset();
	};
	return (
		<div className="max-w-[900px] w-full relative">
			<div className="flex items-center justify-between my-3 mx-2">
				<h5 className="font-semibold underline underline-offset-4 text-lg">
					Posted Jobs
				</h5>
				<Button onClick={() => setJobFormShow(true)}>Post a Job</Button>
			</div>

			{/* job post form start */}
			<div
				className={`absolute inset-0 backdrop-blur ${
					jobFormShow ? "block" : "hidden"
				}`}></div>
			<div
				className={`absolute w-full pb-20 top-0 bg-white border-2 shadow rounded-lg p-3 ${
					jobFormShow ? "block" : "hidden"
				}`}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<h4 className="text-center text-lg font-semibold mb-3">
						Post a New Job
					</h4>
					<div className=" flex flex-col gap-3">
						<TextInput
							label={"Job Title"}
							type={"text"}
							placeText={"Title"}
							registering={register("jobTitle")}
							errors={errors.jobTitle}
						/>
						<TextAreaInput
							label={"Job Description"}
							type={"text"}
							placeText={""}
							registering={register("jobDescription")}
							errors={errors.jobDescription}
						/>
					</div>
					<div className="my-2 md:mb-3">
						<MultiSelect
							name={"skills"}
							control={control}
							options={skillOptions}
							placeholder={"Select required skills"}
							registering={register("skills")}
							errors={errors["skills"]}
						/>
					</div>
					<div className="mt-3 grid lg:grid-cols-2 gap-4">
						<SelectInput
							label={"Industry"}
							options={industyTypeOptions}
							name={"industry"}
							control={control}
							errors={errors.industry}
						/>
						<SelectInput
							label={"Job Type"}
							options={jobTypes}
							name={"jobType"}
							control={control}
							errors={errors.jobType}
						/>
						<SelectInput
							label={"Employment Type"}
							name={"employmentType"}
							options={preferredJobType}
							control={control}
							errors={errors.employmentType}
						/>
						<SelectInput
							label={"Experience"}
							name={"experience"}
							options={experienceData}
							control={control}
							errors={errors.experience}
						/>

						<SelectInput
							label={"Qualification"}
							options={qualificationOptions}
							name={"qualification"}
							control={control}
							errors={errors.qualification}
						/>
						<SelectInput
							label={"Preferred Candidate Gender"}
							name={"candidateGender"}
							options={genderOptions}
							control={control}
							errors={errors.candidateGender}
						/>
						<SelectInput
							label={"Location"}
							options={categoryData}
							name={"jobLocation"}
							control={control}
							errors={errors.jobLocation}
						/>
						<TextInput
							label={"Offered Salary"}
							type={"number"}
							placeText={"Rs. 25000"}
							registering={register("offeredSalary")}
							errors={errors.offeredSalary}
						/>
						<TextInput
							label={"Application Deadline Date"}
							type={"date"}
							placeText={"20-04-2024"}
							registering={register("deadline")}
							errors={errors.deadline}
						/>
						<div className="lg:col-span-2">
							<TextInput
								label={"Job Place"}
								type={"text"}
								placeText={
									"S 107, 4th Floor Monlash Business Centre Crescens Tower, South Kalamassery, Kochi, Kerala 682033, India"
								}
								registering={register("jobPlace")}
								errors={errors.jobPlace}
							/>
						</div>
					</div>
					<div className="flex items-center justify-between mt-4">
						<Button
							onClick={() => setJobFormShow(false)}
							className="bg-red-800">
							close
						</Button>
						<Button type="submit" className="">
							Post
						</Button>
					</div>
				</form>
			</div>
			{/* job post form end */}

			{/* job card grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-5">
				{jobsData.map((job, i) => (
					<JobCard key={i} data={job} />
				))}
			</div>
		</div>
	);
}

export default Jobs;

import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
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
import { createAJob, getPostedJobs } from "../../apis/employerApi";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

function Jobs() {
	// redux
	const { jobs, isLoading, pagination, hasMore } = useSelector(
		(store) => store.employer
	);
	const dispatch = useDispatch();

	// states
	const [page, setPage] = useState(1);
	const [jobFormShow, setJobFormShow] = useState(false);

	// fetch data and infinite scroll
	useEffect(() => {
		dispatch(getPostedJobs(page));
	}, [page]);

	const fetchMoreData = () => {
		// if (!hasMore || isLoading) return;

		const nextPage = page + 1;
		setPage(nextPage);
	};

	// form hook
	const { register, handleSubmit, errors, reset, control, watch } =
		useFormHandler(jobPostValidation);

	const onSubmit = (data) => {
		dispatch(createAJob(data));
		reset();
		setJobFormShow(false);
	};

	console.log(hasMore);
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

			<InfiniteScroll
				dataLength={jobs?.length}
				next={fetchMoreData}
				hasMore={hasMore}
				loader={
					<h4 className="text-center font-semibold">Loading...</h4>
				}
				endMessage={
					<p className="text-center font-semibold mt-5">
						"No more jobs"
					</p>
				}>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-5">
					{jobs.map((job, i) => (
						<JobCard key={i} data={job} />
					))}
				</div>
			</InfiniteScroll>
		</div>
	);
}

export default Jobs;

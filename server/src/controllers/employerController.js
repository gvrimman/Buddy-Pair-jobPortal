const Employer = require("../models/employer");
const Job = require("../models/job");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

// create a job by employer
const postJob = asyncHandler(async (req, res) => {
	const employerId = req.user._id; // employer id
	const employer = await Employer.findOne({ employerId: employerId });
	if (!employer) {
		throw new ApiError(400, "employer not found");
	}

	const {
		jobTitle,
		jobDescription,
		industry,
		jobType,
		employmentType,
		experience,
		qualification,
		candidateGender,
		skills,
		jobLocation,
		offeredSalary,
		jobPlace,
		deadline,
	} = req.body;

	// validate fields

	// save to database
	const jobData = await Job.create({
		owner: employerId,
		jobTitle,
		jobDescription,
		companyEmail: employer.companyEmail,
		industry,
		jobType,
		employmentType,
		experience,
		qualification,
		candidateGender,
		skills,
		jobLocation,
		offeredSalary,
		jobPlace,
		deadline,
	});

	await jobData.save();
	employer.totalJobs.push(jobData._id);
	await employer.save();

	const createdJob = await Job.findById(jobData._id);

	if (!createdJob) {
		throw new ApiError(400, "Job not created");
	}

	res.json(new ApiResponse(200, createdJob, "Job created successfull"));
});

// get all posted jobs from empoyer
const getAllPostedJobs = async (req, res) => {
	const userId = req.user._id;
	const employer = await Employer.findOne({ employerId: userId })
		.select("totalJobs")
		.populate("totalJobs");

	if (!employer) {
		throw new ApiError(400, "employer not found");
	}
	res.json(new ApiResponse(200, employer, "all jobs"));
};

// delete single job from employer
const deleteSingleJob = asyncHandler(async (req, res) => {
	const jobId = req.params.id;
	const employerId = req.user._id;
	const job = await Job.findById(jobId);
	console.log(employerId);
	if (!job) {
		throw new ApiError(400, "Job not found");
	}
	if (job.owner.toString() !== employerId.toString()) {
		throw new ApiError(400, "You are not authorized to delete this job");
	}

	await job.deleteOne();
	res.json(new ApiResponse(200, job, "Job deleted successfully"));
});
module.exports = {
	postJob,
	getAllPostedJobs,
	deleteSingleJob,
};

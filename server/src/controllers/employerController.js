const Job = require("../models/job");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

// create a job by employer
const postJob = asyncHandler(async (req, res) => {
	const employerId = req.user._id; // employer id
	const {
		title,
		description,
		email,
		specialism,
		industry,
		jobType,
		employmentType,
		experience,
		qualification,
		gender,
		location,
		offeredSalary,
		jobPlace,
		deadline,
	} = req.body;

	// validate fields

	// save to database
	const jobData = await Job.create({
		owner: employerId,
		title,
		description,
		email,
		specialism,
		industry,
		jobType,
		employmentType,
		experience,
		qualification,
		gender,
		location,
		offeredSalary,
		jobPlace,
		deadline,
	});

	await jobData.save();
	const createdJob = await Job.findById(jobData._id);

	if (!createdJob) {
		throw new ApiError(400, "Job not created");
	}

	res.json(new ApiResponse(200, createdJob, "Job created successfull"));
});

module.exports = {
	postJob,
};

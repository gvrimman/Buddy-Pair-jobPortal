const Job = require("../models/job");
const JobPortal = require("../models/jobportal");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

// create a job by employer
const postJob = asyncHandler(async (req, res) => {
	const userId = req.user._id; // employer id
	const employer = await JobPortal.findOne({ userId: userId });
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
	const selectedSkills = skills.map((skill) => skill.value);

	// validate fields

	// save to database
	const jobData = await Job.create({
		owner: userId,
		jobTitle,
		jobDescription,
		companyEmail: employer.companyEmail,
		industry,
		jobType,
		employmentType,
		experience,
		qualification,
		candidateGender,
		skills: selectedSkills,
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
	const jobs = await JobPortal.findOne({ userId: userId })
		.select("totalJobs")
		.populate("totalJobs");

	if (!jobs) {
		throw new ApiError(400, "jobs not found");
	}
	res.json(new ApiResponse(200, jobs, "all jobs"));
};

// get single job
const getJob = asyncHandler(async (req, res) => {
	const jobId = req.params.id;
	const job = await Job.findById(jobId);
	console.log(job);
	if (!job) {
		throw new ApiError(400, "job not found");
	}
	res.json(new ApiResponse(200, job, "selected job"));
});

// update job by id
const updateJob = asyncHandler(async (req, res) => {
	const jobId = req.params.id;
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

	const selectedSkills = skills.map((skill) => skill.value);

	const job = await Job.findByIdAndUpdate(
		jobId,
		{
			jobTitle,
			jobDescription,
			industry,
			jobType,
			employmentType,
			experience,
			qualification,
			candidateGender,
			skills: selectedSkills,
			jobLocation,
			offeredSalary,
			jobPlace,
			deadline,
		},
		{
			new: true,
		}
	);
	if (!job) {
		throw new ApiError(400, "job not found");
	}

	res.json(new ApiResponse(200, job, "job updated"));
});

// delete single job from employer
const deleteSingleJob = asyncHandler(async (req, res) => {
	const jobId = req.params.id;
	const employerId = req.user._id;
	const job = await Job.findById(jobId);
	if (!job) {
		throw new ApiError(400, "Job not found");
	}
	if (job.owner.toString() !== employerId.toString()) {
		throw new ApiError(400, "You are not authorized to delete this job");
	}

	await job.deleteOne();
	res.json(new ApiResponse(200, job, "Job deleted successfully"));
});

// get candidates by query search
const getCandidates = asyncHandler(async (req, res) => {
	const {
		name = "",
		location = "",
		category = "",
		experience = [],
		skills = [],
		gender = [],
		qualification = "",
		page = Number(req.query.page) || 1,
		limit = Number(req.query.limit) || 10,
		sort = "newest",
	} = req.query;

	const query = {};

	// add apply filters for user modal
	if (name) {
		query.$or = [
			{ "userId.username": { $regex: name, $options: "i" } },
			{ "jobDetails.jobTitle": { $regex: name, $options: "i" } },
		];
	}
	if (location)
		query.locationName = {
			$regex: location,
			$options: "i",
		};
	if (qualification) query.qualification = qualification;
	if (category) query.preferredJobType = category;
	if (gender.length) query.gender = { $in: gender };

	// add apply filters form employee modal
	if (experience.length)
		query["jobDetails.workExperience"] = { $in: experience };
	if (skills.length) query.skills = { $all: skills };

	// pagination
	const skip = (page - 1) * limit;

	// set sort order
	let sortOrder = {};
	if (sort === "oldest") {
		sortOrder = { createdAt: -1 };
	} else if (sort === "newest") {
		sortOrder = { createdAt: 1 };
	}

	const employees = await JobPortal.aggregate([
		{
			$lookup: {
				from: "users",
				localField: "userId",
				foreignField: "_id",
				as: "userId",
			},
		},
		{
			$unwind: "$userId",
		},
		{
			$match: {
				role: "employee",
				...query,
			},
		},
		{
			$sort: sortOrder,
		},
		{
			$skip: skip,
		},
		{
			$limit: Number(limit),
		},
		{
			$project: {
				_id: 1,
				jobDetails: 1,
				skills: 1,
				"userId.username": 1,
				locationName: 1,
				gender: 1,
				qualification: 1,
				profileImage: 1,
			},
		},
	]);

	if (!employees) {
		throw new ApiError(400, "No candidates found");
	}

	res.json(new ApiResponse(200, employees, "candidates"));
});

// get single candidate
const getCandidate = asyncHandler(async (req, res) => {
	const candidateId = req.params.id;

	const candidate = await JobPortal.findById(candidateId);
	if (!candidate) {
		throw new ApiError(400, "Candidate not found");
	}

	res.json(new ApiResponse(200, candidate, "candidate"));
});

module.exports = {
	postJob,
	getAllPostedJobs,
	deleteSingleJob,
	getJob,
	updateJob,
	getCandidates,
	getCandidate,
};

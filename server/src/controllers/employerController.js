const Employee = require("../models/employee");
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
	const selectedSkills = skills.map((skill) => skill.value);

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
	const employer = await Employer.findOne({ employerId: userId })
		.select("totalJobs")
		.populate("totalJobs");

	if (!employer) {
		throw new ApiError(400, "employer not found");
	}
	res.json(new ApiResponse(200, employer, "all jobs"));
};

// get single job
const getJob = asyncHandler(async (req, res) => {
	const jobId = req.params.id;
	const job = await Job.findById(jobId);
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
		experience = [],
		skills = [],
		gender = "",
		qualification = "",
		page = 1,
		limit = 10,
	} = req.query;

	const query = {};

	const userFilters = {};
	// add apply filters for user modal
	if (name) {
		userFilters.$or = [
			{ "employeeId.name": { $regex: name, $options: "i" } },
			{ "jobDetails.jobTitle": { $regex: name, $options: "i" } },
		];
	}
	if (location)
		userFilters["employeeId.locationName"] = {
			$regex: location,
			$options: "i",
		};
	if (gender) userFilters["employeeId.gender"] = gender;
	if (qualification) userFilters["employeeId.qualification"] = qualification;

	// add apply filters form employee modal
	if (experience.length) query.experience = { $in: experience };
	if (skills.length) query.skills = { $all: skills };

	// pagination
	const skip = (page - 1) * limit;

	const employees = await Employee.aggregate([
		{
			$lookup: {
				from: "users",
				localField: "employeeId",
				foreignField: "_id",
				as: "employeeId",
			},
		},
		{
			$unwind: "$employeeId",
		},
		{
			$match: {
				...query,
				...userFilters,
			},
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
				"employeeId.name": 1,
				"employeeId.locationName": 1,
				"employeeId.gender": 1,
				"employeeId.qualification": 1,
				"employeeId.profileImage": 1,
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

	const candidate = await Employee.findById(candidateId);
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

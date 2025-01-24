const mongoose = require("mongoose");
const Job = require("../models/job");
const JobPortal = require("../models/jobportal");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/user");

// create a job by employer
const postJob = asyncHandler(async (req, res) => {
	const userId = req.user._id; // employer id
	const employer = await JobPortal.findOne({ userId: userId });
	if (!employer) {
		throw new ApiError(400, "employer not found");
	}
	if(!employer.companyEmail) {
		throw new ApiError(400, "Complete company registration first to proceed");
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

	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 12;
	const skip = (page - 1) * limit;


	// get the total count of jobs
	const jobPortal = await JobPortal.findOne({ userId: userId });
	const totalJobs = jobPortal?.totalJobs?.length || 0;

	const jobs = await JobPortal.findOne({ userId: userId })
		.select("totalJobs")
		.populate({
			path: "totalJobs",
			options: {
				limit: limit,
				skip: skip,
				sort: { createdAt: -1 },
			},
		});

	if (!jobs) {
		throw new ApiError(400, "jobs not found");
	}

	// Get total count for pagination
	const hasMore = page * limit < totalJobs;

	res.json(
		new ApiResponse(
			200,
			{
				jobs: jobs.totalJobs,
				hasMore,
			},
			"all jobs"
		)
	);
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
		status,
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
			status,
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
	const employer = await JobPortal.findOne({ userId: employerId });

	if (!employer) {
		throw new ApiError(400, "Employer not found");
	}
	if (!job) {
		throw new ApiError(400, "Job not found");
	}
	if (job.owner.toString() !== employerId.toString()) {
		throw new ApiError(400, "You are not authorized to delete this job");
	}

	employer.totalJobs.pull(jobId);
	await employer.save();

	await job.deleteOne();

	res.json(new ApiResponse(200, job, "Job deleted successfully"));
});

// get candidates by query search
const getCandidates = asyncHandler(async (req, res) => {
	const {
		name,
		location,
		category,
		experience,
		skills,
		gender,
		qualification,
		page = Number(req.query.page) || 1,
		limit = Number(req.query.limit) || 5,
		sort = "newest",
	} = req.query;

	const query = {};

	// add apply filters for user modal
	if (name) {
		query.$or = [
			{ "userId.username": { $regex: name, $options: "i" } },
			{ "jobDetails.jobTitle": { $regex: name, $options: "i" } }, //some change may need (jobDetails -> preferences)
		];
	}
	if (location)
		query.locationName = {
			$regex: location,
			$options: "i",
		};
	if (qualification) query.qualification = qualification;
	if (category) query.preferredJobType = category;
	if (gender?.length) query.gender = { $in: gender };

	// add apply filters form employee modal
	if (experience?.length)
		query["jobDetails.workExperience"] = { $in: experience };
	if (skills?.length) query.skills = { $all: skills };

	// Prevent fetching all data if no filters are applied
	if (Object.keys(query).length === 0) {
		return res.status(400).json({
			status: 400,
			message: "Please provide at least one filter to search candidates.",
		});
	}

	// pagination
	const skip = (page - 1) * limit;

	// set sort order
	let sortOrder = {};
	if (sort === "oldest") {
		sortOrder = { createdAt: -1 };
	} else if (sort === "newest") {
		sortOrder = { createdAt: 1 };
	}

	// Total count of matching candidates
	const totalCount = await JobPortal.aggregate([
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
			$count: "count",
		},
	]);

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

	const totalRecords = totalCount[0]?.count || 0;
	const hasMore = page * limit < totalRecords;

	if (!employees.length) {
		throw new ApiError(400, "No candidates found");
	}

	res.json(
		new ApiResponse(200, { candidates: employees, hasMore }, "candidates")
	);
});

// get single candidate
const getCandidate = asyncHandler(async (req, res) => {
	const candidateId = req.params.id;

	const candidate = await JobPortal.findById(candidateId).populate({
		path: "userId",
		select: "username email phone",
	});

	if (!candidate) {
		throw new ApiError(400, "Candidate not found");
	}

	res.json(new ApiResponse(200, candidate, "candidate"));
});

// get all applicants for all posted jobs
const getApplicants = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 5;

	// pagination
	const skip = (page - 1) * limit;

	// Get total count of applicants
	const totalCount = await Job.aggregate([
		{
			$match: {
				owner: userId,
			},
		},
		{
			$lookup: {
				from: "users",
				localField: "applicants",
				foreignField: "_id",
				as: "applicants",
			},
		},
		{
			$unwind: "$applicants",
		},
		{
			$lookup: {
				from: "jobportals",
				localField: "applicants.apps.jobPortal",
				foreignField: "_id",
				as: "applicants.apps.jobPortal",
			},
		},
		{
			$unwind: "$applicants.apps.jobPortal",
		},
		{
			$count: "totalCount",
		},
	]);

	const applicants = await Job.aggregate([
		{
			$match: {
				owner: userId,
			},
		},
		{
			$lookup: {
				from: "users",
				localField: "applicants",
				foreignField: "_id",
				as: "applicants",
			},
		},
		{
			$unwind: "$applicants",
		},
		{
			$lookup: {
				from: "jobportals",
				localField: "applicants.apps.jobPortal",
				foreignField: "_id",
				as: "applicants.apps.jobPortal",
			},
		},
		{
			$unwind: "$applicants.apps.jobPortal",
		},
		{
			$project: {
				_id: 1,
				jobTitle: 1,
				applicant: {
					_id: "$applicants.apps.jobPortal._id",
					userId: "$applicants._id",
					username: "$applicants.username",
					email: "$applicants.email",
					phone: "$applicants.phone",
					location: "$applicants.apps.jobPortal.locationName",
					profileImage: "$applicants.apps.jobPortal.profileImage",
					workExperience:
						"$applicants.apps.jobPortal.jobDetails.workExperience",
				},
			},
		},
		{
			$skip: skip,
		},
		{
			$limit: limit,
		},
	]);

	if (!applicants) {
		throw new ApiError(400, "Applicants not found");
	}

	const totalRecords = totalCount[0].totalCount || 0;
	const hasMore = page * limit < totalRecords;

	res.json(new ApiResponse(200, { applicants, hasMore }, "applicants"));
});

// get all applicants for single job
const getJobApplicants = asyncHandler(async (req, res) => {
	const jobId = req.params.id;
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 5;

	// pagination
	const skip = (page - 1) * limit;

	// Get total count of applicants
	const totalCount = await Job.aggregate([
		{
			$match: {
				_id: new mongoose.Types.ObjectId(jobId),
			},
		},
		{ $unwind: "$applicants" },
		{
			$lookup: {
				from: "users",
				localField: "applicants",
				foreignField: "_id",
				as: "user",
			},
		},
		{ $count: "totalCount" },
	]);

	const applicants = await Job.aggregate([
		{
			$match: {
				_id: new mongoose.Types.ObjectId(jobId),
			},
		},
		{ $unwind: "$applicants" },
		{
			$lookup: {
				from: "users",
				localField: "applicants",
				foreignField: "_id",
				as: "user",
			},
		},
		{ $unwind: "$user" },
		{
			$lookup: {
				from: "jobportals",
				localField: "user.apps.jobPortal",
				foreignField: "_id",
				as: "user.apps.jobPortal",
			},
		},
		{ $unwind: "$user.apps.jobPortal" },
		{
			$project: {
				_id: 1,
				jobTitle: 1,
				applicant: {
					_id: "$user.apps.jobPortal._id",
					userId: "$user._id",
					username: "$user.username",
					email: "$user.email",
					phone: "$user.phone",
					location: "$user.apps.jobPortal.locationName",
					profileImage: "$user.apps.jobPortal.profileImage",
					workExperience:
						"$user.apps.jobPortal.jobDetails.workExperience",
				},
			},
		},
		{ $skip: skip },
		{ $limit: limit },
	]);

	if (!applicants) {
		throw new ApiError(400, "Job not found");
	}

	const totalRecords = totalCount[0]?.totalCount || 0;
	const hasMore = page * limit < totalRecords;

	res.json(new ApiResponse(200, { applicants, hasMore }, "job applicants"));
});

// accept a job application
const acceptJob = asyncHandler(async (req, res) => {
	const { jobId, userId } = req.body;
	const job = await Job.findById(jobId);
	if (!job) {
		throw new ApiError(400, "Job not found");
	}

	const applicant = await User.findById(userId);
	if (!applicant) {
		throw new ApiError(400, "Applicant not found");
	}

	// check if applicant is already shortlisted
	if (job.shortListed.includes(userId)) {
		throw new ApiError(400, "Applicant already shortlisted");
	}
	// check if applicant is already rejected
	if (job.rejected.includes(userId)) {
		throw new ApiError(400, "Applicant already rejected");
	}

	job.shortListed.push(userId);
	await job.save();
	res.json(
		new ApiResponse(
			200,
			{ jobId, applicant: { _id: userId } },
			"Application accepted"
		)
	);
});

// get all accepted applications
const acceptedJobs = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const jobs = await Job.aggregate([
		{ $match: { owner: userId } },
		{ $unwind: "$shortListed" },
		{
			$lookup: {
				from: "users",
				localField: "shortListed",
				foreignField: "_id",
				as: "applicant",
			},
		},
		{ $unwind: "$applicant" },
		{
			$project: {
				_id: 1, // Job ID
				"applicant._id": 1, // Applicant ID
			},
		},
	]);

	if (!jobs) {
		throw new ApiError(400, "Jobs not found");
	}

	res.json(new ApiResponse(200, jobs, "Accepted jobs"));
});

// reject a job application
const rejectJob = asyncHandler(async (req, res) => {
	const { jobId, userId } = req.body;
	const job = await Job.findById(jobId);
	if (!job) {
		throw new ApiError(400, "Job not found");
	}

	const applicant = await User.findById(userId);
	if (!applicant) {
		throw new ApiError(400, "Applicant not found");
	}

	// check if applicant is already shortlisted
	if (job.shortListed.includes(userId)) {
		throw new ApiError(400, "Applicant already shortlisted");
	}
	// check if applicant is already rejected
	if (job.rejected.includes(userId)) {
		throw new ApiError(400, "Applicant already rejected");
	}

	job.rejected.push(userId);
	await job.save();
	res.json(
		new ApiResponse(
			200,
			{ jobId, applicant: { _id: userId } },
			"Application rejected"
		)
	);
});

// get all rejected jobs
const rejectedJobs = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const jobs = await Job.aggregate([
		{ $match: { owner: userId } },
		{ $unwind: "$rejected" },
		{
			$lookup: {
				from: "users",
				localField: "rejected",
				foreignField: "_id",
				as: "applicant",
			},
		},
		{ $unwind: "$applicant" },
		{
			$project: {
				_id: 1, // Job ID
				"applicant._id": 1, // Applicant ID
			},
		},
	]);

	if (!jobs) {
		throw new ApiError(400, "Jobs not found");
	}

	res.json(new ApiResponse(200, jobs, "Rejected jobs"));
});

// get all companies based on query params
const getCompanies = asyncHandler(async (req, res) => {
	const {
		name,
		location,
		page = Number(req.query.page) || 1,
		limit = Number(req.query.limit) || 5,
		sort = "newest",
	} = req.query;

	const query = {};

	if (name) {
		query.companyName = { $regex: name, $options: "i" };
	}
	if (location) {
		query.companyAddress = { $regex: location, $options: "i" };
	}

	// pagination
	const skip = (page - 1) * limit;

	// set sort order
	let sortOrder = {};
	if (sort === "oldest") {
		sortOrder = { createdAt: -1 };
	} else if (sort === "newest") {
		sortOrder = { createdAt: 1 };
	}

	const totalCount = await JobPortal.aggregate([
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
				role: "employer",
				...query,
			},
		},
		{
			$count: "count",
		},
	]);

	const companies = await JobPortal.aggregate([
		{
			$match: {
				role: "employer",
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
	]);

	if (!companies) {
		throw new ApiError(400, "No companies found");
	}

	const totalRecords = totalCount[0]?.count || 0;
	const hasMore = page * limit < totalRecords;

	res.json(new ApiResponse(200, { companies, hasMore }, "companies"));
});

// get single company by id
const getCompany = asyncHandler(async (req, res) => {
	const companyId = req.params.id;
	const company = await JobPortal.findById(companyId).populate("totalJobs");

	if (!company) {
		throw new ApiError(400, "Company not found");
	}

	res.json(new ApiResponse(200, company, "company"));
});

module.exports = {
	postJob,
	getAllPostedJobs,
	deleteSingleJob,
	getJob,
	updateJob,
	getCandidates,
	getCandidate,
	getApplicants,
	getJobApplicants,
	acceptJob,
	acceptedJobs,
	rejectJob,
	rejectedJobs,
	getCompanies,
	getCompany,
};

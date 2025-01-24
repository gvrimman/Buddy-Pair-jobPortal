const Job = require("../models/job");
const JobPortal = require("../models/jobportal");
const User = require("../models/user");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getJobs = asyncHandler(async (req, res) => {
	const {
		name,
		location,
		category,
		experience,
		jobtype,
		datePosted,
		page = Number(req.query.page) || 1,
		limit = Number(req.query.limit) || 5,
		sort = "newest",
	} = req.query;

	const query = {};

	if (name) query.jobTitle = { $regex: name, $options: "i" };
	if (location) query.jobPlace = { $regex: location, $options: "i" };
	if (category) query.employmentType = category;
	if (experience?.length) query.experience = { $in: experience };
	if (jobtype?.length) query.jobType = { $in: jobtype };

	if (datePosted) {
		switch (datePosted) {
			case "Last Hour":
				query.createdAt = {
					$gte: new Date(Date.now() - 60 * 60 * 1000),
				};
				break;
			case "Last 24 Hours":
				query.createdAt = {
					$gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
				};
				break;
			case "Last 7 Days":
				query.createdAt = {
					$gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
				};
				break;
			case "Last 14 Days":
				query.createdAt = {
					$gte: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
				};
				break;
			case "Last 30 Days":
				query.createdAt = {
					$gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
				};
				break;
			default:
				query.createdAt = {
					$gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
				};
				break;
		}
	}

	// Prevent fetching all data if no filters are applied
	if (Object.keys(query).length === 0) {
		return res.status(400).json({
			status: 400,
			message: "Please provide at least one filter to search jobs.",
		});
	}

	// paginate
	const skip = (page - 1) * limit;

	// set sort order
	const sortOrder = {};
	if (sort === "newest") {
		sortOrder.createdAt = -1;
	} else if (sort === "oldest") {
		sortOrder.createdAt = 1;
	}

	// total count of results
	const totalCount = await Job.countDocuments(query);

	const jobs = await Job.aggregate([
		{
			$lookup: {
				from: "users",
				localField: "owner",
				foreignField: "_id",
				as: "owner",
			},
		},
		{
			$lookup: {
				from: "jobportals",
				localField: "owner.apps.jobPortal",
				foreignField: "_id",
				as: "owner",
			},
		},
		{
			$unwind: "$owner",
		},
		{
			$match: query,
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

	if (!jobs) {
		throw new ApiError(400, "jobs not found");
	}

	const hasMore = page * limit < totalCount;

	res.json(new ApiResponse(200, { jobs, hasMore }, "jobs"));
});

const getJob = asyncHandler(async (req, res) => {
	const jobId = req.params.id;
	const job = await Job.findById(jobId).populate({
		path: "owner",
		select: "apps.jobPortal",
		populate: {
			path: "apps.jobPortal",
		},
	});
	if (!job) {
		throw new ApiError(400, "job not found");
	}
	res.json(new ApiResponse(200, job, "selected job"));
});

const bookmarkJob = asyncHandler(async (req, res) => {
	const jobId = req.params.id;
	const userId = req.user._id;
	const employee = await JobPortal.findOne({ userId: userId });

	if (!employee) {
		throw new ApiError(400, "employee not found");
	}

	const job = await Job.findById(jobId);
	if (!job) {
		throw new ApiError(400, "job not found");
	}

	const isBookmarked = employee.bookmarkedJobs.includes(jobId);
	if (isBookmarked) {
		throw new ApiError(400, "job already bookmarked");
	} else {
		employee.bookmarkedJobs.push(jobId);
	}

	await employee.save();

	res.json(new ApiResponse(200, job, "job bookmarked"));
});

const getBookmarkedJobs = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 5;
	const skip = (page - 1) * limit;

	// get total cont of all bookmarked jobs
	const jobPortal = await JobPortal.findOne({ userId: userId });
	const totalBookmarked = jobPortal?.bookmarkedJobs?.length || 0;

	const bookmarked = await JobPortal.findOne({ userId })
		.select("bookmarkedJobs")
		.populate({
			path: "bookmarkedJobs",
			options: {
				skip: skip,
				limit: limit,
				sort: { createdAt: -1 },
			},
			populate: {
				path: "owner",
				select: "apps.jobPortal",
				populate: {
					path: "apps.jobPortal",
				},
			},
		});

	if (!bookmarked) {
		throw new ApiError(400, "employee not found");
	}

	// get total count for pagination
	const totalPages = Math.ceil(totalBookmarked / limit);

	res.json(
		new ApiResponse(
			200,
			{
				bookmarked,
				pagination: {
					currentPage: page,
					totalPages,
					totalBookmarked,
					hasNext: page < totalPages,
					hasPrev: page > 1,
				},
			},
			"bookmarked jobs"
		)
	);
});

const deleteBookmarkedJob = asyncHandler(async (req, res) => {
	const jobId = req.params.id;
	const userId = req.user._id;
	const employee = await JobPortal.findOne({ userId: userId });

	if (!employee) {
		throw new ApiError(400, "employee not found");
	}

	const job = await Job.findById(jobId);
	if (!job) {
		throw new ApiError(400, "job not found");
	}

	const isBookmarked = employee.bookmarkedJobs.includes(jobId);
	if (!isBookmarked) {
		throw new ApiError(400, "job not bookmarked");
	} else {
		employee.bookmarkedJobs.pull(jobId);
	}

	await employee.save();

	res.json(new ApiResponse(200, job, "bookmarked job deleted"));
});

const applyJob = asyncHandler(async (req, res) => {
	const jobId = req.params.id;
	const userId = req.user._id;
	const employee = await JobPortal.findOne({ userId: userId });
	if (!employee) {
		throw new ApiError(400, "employee not found");
	}
	const job = await Job.findById(jobId);
	if (!job) {
		throw new ApiError(400, "job not found");
	}
	if(job?.status !== "Active") {
		throw new ApiError(400, "Currently job is not avaliable");
	}
	const isApplied = employee.appliedJobs.includes(jobId);
	if (isApplied) {
		throw new ApiError(400, "job already applied");
	} else {
		employee.appliedJobs.push(jobId);
	}

	// check if user already in job applicants array, if not push userid
	const isUserInApplicants = job.applicants.includes(userId);
	if (isUserInApplicants) {
		throw new ApiError(400, "user already in applicants list");
	} else {
		job.applicants.push(userId);
	}

	await employee.save();
	await job.save();

	res.json(new ApiResponse(200, job, "job applied"));
});

const getAppliedJobs = asyncHandler(async (req, res) => {
	const userId = req.user._id;

	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 5;
	const skip = (page - 1) * limit;

	// get total count of applied jobs
	const jobPortal = await JobPortal.findOne({ userId: userId });
	const totalApplied = jobPortal?.appliedJobs?.length || 0;

	const applied = await JobPortal.findOne({ userId })
		.select("appliedJobs")
		.populate({
			path: "appliedJobs",
			options: {
				skip: skip,
				limit: limit,
				sort: { createdAt: -1 },
			},
			populate: {
				path: "owner",
				select: "apps.jobPortal",
				populate: {
					path: "apps.jobPortal",
				},
			},
		});

	if (!applied) {
		throw new ApiError(400, "employee not found");
	}

	// get total count for pagination
	const totalPages = Math.ceil(totalApplied / limit);

	res.json(
		new ApiResponse(
			200,
			{
				applied,
				pagination: {
					currentPage: page,
					totalPages,
					totalApplied,
					hasNext: page < totalPages,
					hasPrev: page > 1,
				},
			},
			"applied jobs"
		)
	);
});

const deleteAppliedJob = asyncHandler(async (req, res) => {
	const jobId = req.params.id;
	const userId = req.user._id;
	const employee = await JobPortal.findOne({ userId: userId });

	if (!employee) {
		throw new ApiError(400, "employee not found");
	}

	const job = await Job.findById(jobId);
	if (!job) {
		throw new ApiError(400, "job not found");
	}

	const isApplied = employee.appliedJobs.includes(jobId);
	if (!isApplied) {
		throw new ApiError(400, "job not applied");
	} else {
		employee.appliedJobs.pull(jobId);
		job.applicants.pull(userId);
	}

	await employee.save();
	await job.save();

	res.json(new ApiResponse(200, job, "applied job deleted"));
});

module.exports = {
	getJobs,
	getJob,
	getBookmarkedJobs,
	bookmarkJob,
	deleteBookmarkedJob,
	applyJob,
	getAppliedJobs,
	deleteAppliedJob,
};

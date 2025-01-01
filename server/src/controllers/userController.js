const Job = require("../models/job");
const JobPortal = require("../models/jobportal");
const User = require("../models/user");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId)
    .select("-password -refreshToken")
    .populate("apps.jobPortal")
    .exec();

  if (!user) throw new ApiError(400, "user not found");
  else res.json(new ApiResponse(200, user, "User profile"));
});

const checkPreferenceStatus = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId)
    .select("-password -refreshToken")
    .populate("apps.jobPortal")
    .exec();

  if (!user) throw new ApiError(400, "user not found");
  else
    res.json(
      new ApiResponse(
        200,
        user.apps.jobPortal.preferenceStatus,
        "Preference status"
      )
    );
});

const getPreferences = asyncHandler(async (req, res) => {
  const jobPortalId = req.user.apps.jobPortal;
  const jobPref = await JobPortal.findById(jobPortalId);
  res.json(new ApiResponse(200, jobPref, "User job preferences"));
});

const updatePreferences = asyncHandler(async (req, res) => {
  const {
    companyName = "",
    designation = "",
    LastWorkingDate = null,
    LastWithdrawnSalary = 0,
    QuitReason = "",
    workExperience = 0,
    jobTitle,
    jobType,
    skills,
    location,
    salary,
  } = req.body;
  const jobPortalId = req.user.apps.jobPortal;
  const jobPref = await JobPortal.findByIdAndUpdate(
    jobPortalId,
    {
      preferenceStatus: true,
      jobDetails: {
        companyName,
        designation,
        LastWorkingDate,
        LastWithdrawnSalary,
        QuitReason,
        workExperience,
      },
      preferences: {
        jobTitle,
        jobType,
        skills: skills.map((skill) => skill.value),
        location,
        salary,
      },
    },
    {
      new: true,
    }
  );
  if (!jobPref) {
    throw new ApiError(400, "Preferences not found");
  }

  res.json(new ApiResponse(200, jobPref, "Preferences updated"));
});

const fetchMatchedJobs = asyncHandler(async (req, res) => {
  const jobPortalId = req.user.apps.jobPortal;
  const jobPref = await JobPortal.findById(jobPortalId);
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
  else query.jobTitle = { $regex: jobPref.preferences.jobTitle, $options: "i" };

  if (location) query.jobPlace = { $regex: location, $options: "i" };
  else query.jobPlace = { $regex: jobPref.preferences.location, $options: "i" };

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
    throw new ApiError(
      400,
      "Please provide at least one filter to search jobs."
    );
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

const fetchSimilarProfiles = asyncHandler(async (req, res) => {
  const jobPortalId = req.user.apps.jobPortal;

  // Fetch the user's job portal preferences
  const jobPref = await JobPortal.findById(jobPortalId);
  if (!jobPref) {
    throw new ApiError(400, "JobPortal not found.");
  }

  // Destructure query parameters and define defaults
  const {
    name,
    location,
    category,
    experience,
    jobtype,
    page = Number(req.query.page) || 1,
    limit = Number(req.query.limit) || 5,
    sort = "newest",
  } = req.query;

  // Construct the query for similar profiles
  const query = {
    "apps.jobPortal": { $ne: null }, // Ensure they are linked to a job portal
  };

  if (name) query.username = { $regex: name, $options: "i" };
  else
    query["jobPortal.preferences.jobTitle"] = {
      $regex: jobPref.preferences.jobTitle,
      $options: "i",
    };

  if (location)
    query["jobPortal.preferences.location"] = {
      $regex: location,
      $options: "i",
    };
  else
    query["jobPortal.preferences.location"] = {
      $regex: jobPref.preferences.location,
      $options: "i",
    };

  if (category) query["jobPortal.preferences.category"] = category;
  if (experience?.length)
    query["jobPortal.preferences.experience"] = { $in: experience };
  if (jobtype?.length)
    query["jobPortal.preferences.jobType"] = { $in: jobtype };

  // Pagination logic
  const skip = (page - 1) * limit;

  // Sort order
  const sortOrder = {};
  if (sort === "newest") {
    sortOrder.createdAt = -1;
  } else if (sort === "oldest") {
    sortOrder.createdAt = 1;
  }

  // Aggregate pipeline to fetch similar profiles
  const profiles = await User.aggregate([
    {
      $lookup: {
        from: "jobportals",
        localField: "apps.jobPortal",
        foreignField: "_id",
        as: "jobPortal",
      },
    },
    {
      $unwind: "$jobPortal",
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
    {
      $project: {
        _id: 1,
        username: 1,
        email: 1,
        phone: 1,
        "jobPortal.preferences": 1,
      },
    },
  ]);

  // Count total matching profiles
  const totalCount = await User.countDocuments(query);

  // Determine if more profiles are available
  const hasMore = page * limit < totalCount;

  if (!profiles.length) {
    throw new ApiError(404, "No similar profiles found.");
  }

  // Send the response
  res.json(
    new ApiResponse(
      200,
      { profiles, hasMore },
      "Similar profiles fetched successfully."
    )
  );
});

module.exports = {
  getProfile,
  checkPreferenceStatus,
  getPreferences,
  updatePreferences,
  fetchMatchedJobs,
  fetchSimilarProfiles,
};
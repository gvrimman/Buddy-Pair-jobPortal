const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
	{
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		applicants: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "Employee",
			default: [],
		},
		jobTitle: {
			type: String,
			required: true,
		},
		jobDescription: {
			type: String,
			required: true,
		},
		companyEmail: {
			type: String,
			required: true,
		},
		industry: {
			type: String,
			required: true,
		},
		jobType: {
			type: String,
			required: true,
		},
		employmentType: {
			type: String,
			required: true,
		},
		qualification: {
			type: String,
			required: true,
		},
		experience: {
			type: String,
			required: true,
		},
		candidateGender: {
			type: String,
			required: true,
		},
		skills: {
			type: [String],
			required: true,
		},
		deadline: {
			type: Date,
			required: true,
		},
		jobLocation: {
			type: String,
			required: true,
			// enum: ["On-site", "Remote", "W-F-H", "Hybrid"],
		},
		offeredSalary: {
			type: String,
			required: true,
		},
		status: {
			type: Boolean,
			required: true,
			default: true,
		},
		shortListed: {
			type: [mongoose.Types.ObjectId],
			ref: "User",
			default: [],
		},
		rejected: {
			type: [mongoose.Types.ObjectId],
			ref: "User",
			default: [],
		},
		jobPlace: {
			type: String,
		},
	},
	{ timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;

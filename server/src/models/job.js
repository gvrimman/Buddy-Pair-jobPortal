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
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		email: {
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
		gender: {
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
		location: {
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

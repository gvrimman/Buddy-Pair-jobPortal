const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema(
	{
		employerId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		companyName: { type: String, required: true },
		companyEmail: { type: String, required: true },
		companyAddress: { type: String, required: true },
		companyWebSite: { type: String },
		companySize: { type: String, required: true },
		industryType: { type: String, required: true },
		companyLinkedin: { type: String, required: true },
		totalJobs: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "Job",
			default: [],
		},
		companyLogo: {
			type: String,
		},
	},
	{ timestamps: true }
);

const Employer = mongoose.model("Employer", employerSchema);
module.exports = Employer;

const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema(
	{
		employerId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		companyLogo: { type: String },
		companyCoverImg: { type: String },
		companyName: { type: String },
		companyMail: { type: String },
		companyContact: { type: Number },
		companyAddress: {
			street: { type: String },
			city: { type: String },
			state: { type: String },
			zip: { type: String },
			country: { type: String },
		},
		completeAddress: { type: String },
		companyWebSite: { type: String },
		founded: { type: String },
		companyTeamSize: { type: String },
		aboutCompany: { type: String },
		industryType: [String],
		socialMedia: {
			facebook: {
				type: String,
				default: "",
			},
			twitter: {
				type: String,
				default: "",
			},
			instagram: {
				type: String,
				default: "",
			},
			linkedin: {
				type: String,
				default: "",
			},
		},
		totalJobs: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "Job",
			default: [],
		},
		activeJobs: { type: Number },
		shortlistedJobs: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Job",
			},
		],
	},
	{ timestamps: true }
);

const Employer = mongoose.model("Employer", employerSchema);
module.exports = Employer;

const mongoose = require("mongoose");

const jobPortalSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	dob: {
		type: Date, // all
		trim: true,
	},
	age: {
		type: Number, // all
		trim: true,
	},
	gender: {
		type: String, // all
		trim: true,
	},
	qualification: {
		type: String, // all
		trim: true,
	},
	educationInstitute: {
		type: String, // both
	},
	educationType: {
		type: String, // both
		trim: true,
	},
	profession: {
		type: ["String"], // all
		required: true,
	},
	jobDetails: {
		type: Object, // employee
	},
	preferredJobLocation: {
		type: [String], // both
		trim: true,
	},
	preferredJobType: {
		type: String, // both
		trim: true,
	},
	socialLinks: {
		type: Object, // both
	},
	skills: {
		type: [String], // both
		trim: true,
	},
	locationName: {
		type: String, // all
	},
	location: {
		type: {
			type: String,
			enum: ["Point"],
			// required: true,
		},
		coordinates: {
			type: [Number],
			required: true,
		},
	},
	resume: {
		type: String, // both
	},
	profileImage: {
		type: String, // all
	},
	companyName: { type: String }, // employer
	companyEmail: { type: String }, // employer
	companyWebSite: { type: String }, // employer
	companyAddress: { type: String }, // employer
	companyDescription: { type: String },
	companySize: { type: String }, // employer
	industryType: { type: String }, // employer
	employmentType: { type: String },
	companyLinkedin: { type: String },
	totalJobs: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: "Job",
		default: [],
	},
	companyLogo: {
		type: String, // employer
	},
	subscription: {
		type: {
			type: String,
			enum: ["free", "premium"],
			default: "free",
		},
		expiry: {
			type: Date,
		},
	},
	role: {
		type: String,
		enum: ["employee", "employer"],
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const JobPortal = mongoose.model("JobPortal", jobPortalSchema);
module.exports = JobPortal;

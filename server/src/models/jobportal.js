const mongoose = require("mongoose");

const jobPortalSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	dob: {
		type: Date,
		trim: true,
	},
	age: {
		type: Number,
		trim: true,
	},
	gender: {
		type: String,
		trim: true,
	},
	qualification: {
		type: String,
		trim: true,
	},
	educationInstitute: {
		type: String,
	},
	educationType: {
		type: String,
		trim: true,
	},
	profession: {
		type: ["String"],
		required: true,
	},
	jobDetails: {
		type: Object,
	},
	preferredJobLocation: {
		type: [String],
		trim: true,
	},
	preferredJobType: {
		type: String,
		trim: true,
	},
	socialLinks: {
		type: Object,
	},
	skills: {
		type: [String],
		trim: true,
	},
	locationName: {
		type: String,
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
		type: String,
	},
	profileImage: {
		type: String,
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
	},
});

const JobPortal = mongoose.model("JobPortal", jobPortalSchema);
module.exports = JobPortal;

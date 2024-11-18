const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
	{
		employeeId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		// jobDetails: {
		// 	type: Object,
		// 	// required: true,
		// },
		// resume: {
		// 	type: String,
		// 	// required: true,
		// },
		educationType: {
			type: String, // added
			trim: true,
		},
		preferredJobLocation: {
			type: [String], // added
			trim: true,
		},
		preferredJobType: {
			type: String, // added
			trim: true,
		},
		// skills: {
		// 	type: [String], // added
		// 	trim: true,
		// },
		// portfolio: {
		// 	type: String, // added
		// 	trim: true,
		// },
		// linkedin: {
		// 	type: String, // added
		// 	trim: true,
		// },
		// github: {
		// 	type: String, // added
		// 	trim: true,
		// },
		// behance: {
		// 	type: String, // added
		// 	trim: true,
		// },
	},
	{ timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
	{
		googleId: { type: String, unique: true, sparse: true },
		name: {
			type: String,
			required: true,
			// unique: true,
			lowercase: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		contactNumber: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: function () {
				return !this.googleId;
			},
			trim: true,
			minlength: 3,
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
			type: String, // added
			trim: true,
		},
		hobbies: {
			type: [String],
			// required: true,
			sparse: true,
		},
		qualification: {
			type: String,
			trim: true,
		},
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
		skill: {
			type: [String], // added
			trim: true,
		},
		portfolio: {
			type: String, // added
			trim: true,
		},
		linkedin: {
			type: String, // added
			trim: true,
		},
		github: {
			type: String, // added
			trim: true,
		},
		behance: {
			type: String, // added
			trim: true,
		},
		jobDetails: {
			type: Object,
			// required: true,
		},
		employerDetails: {
			type: Object,
			// required: true,
		},
		resume: {
			type: String,
			// required: true,
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
		smokingHabits: {
			type: Boolean,
			trim: true,
			default: false,
			sparse: true,
		},
		drinkingHabits: {
			type: Boolean,
			trim: true,
			default: false,
			sparse: true,
		},
		profileImage: {
			type: String,
			// required: true,
		},
		shortReel: {
			type: String,
			// required: true,
		},
		story: {
			type: String,
		},
		relationshipGoal: {
			type: String,
			// required: true,
		},
		refreshToken: {
			type: String,
		},
		images: [
			{
				imageUrl: {
					type: String,
					// required: true,
				},
			},
		],
		role: {
			type: String,
			enum: ["employee", "employer", "admin"],
		},
	},
	{ timestamps: true }
);

// user password encrypting process
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	this.password = await bcrypt.hash(this.password, 10);
	next();
});

// password comparison process
userSchema.methods.isPasswordCorrect = async function (password) {
	return await bcrypt.compare(password, this.password);
};

// adding a method for creating a accessToken
userSchema.methods.generateAccessToken = function () {
	return jwt.sign(
		{
			_id: this._id,
			email: this.email,
		},
		process.env.ACCESS_TOKEN_SECRET_KEY,
		{
			expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
		}
	);
};

// adding a method for creating a refreshToken
userSchema.methods.generateRefreshToken = function () {
	return jwt.sign(
		{
			_id: this._id,
		},
		process.env.REFRESH_TOKEN_SECRET_KEY,
		{
			expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
		}
	);
};

const User = mongoose.model("User", userSchema);

module.exports = User;

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, unique: true, sparse: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    phone: { type: String, required: true, unique: true, index: true },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    apps: {
      jobPortal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobPortal",
      },
      datingApp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DatingApp",
      },
      matrimonyApp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MatrimonyApp",
      },
      eLearningApp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ELearningApp",
      },
      eCommerceApp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ECommerceApp",
      },
    },
    referrals: { type: Number, default: 0 }, // Total referrals count
    eligibleCourses: [String], // List of courses eligible for free
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

// googleId: { type: String, unique: true, sparse: true },
// 		name: {
// 			type: String,
// 			required: true,
// 			// unique: true,
// 			lowercase: true,
// 			trim: true,
// 		},
// 		email: {
// 			type: String,
// 			required: true,
// 			unique: true,
// 			trim: true,
// 		},
// 		contactNumber: {
// 			type: String,
// 			required: true,
// 			unique: true,
// 			trim: true,
// 		},
// 		password: {
// 			type: String,

// 		/**
// 		 * If the user is signing up with Google, the password is not required.
// 		 * Otherwise, the password is required.
// 		 */
// 			required: function () {
// 				return !this.googleId;
// 			},
// 			trim: true,
// 			minlength: 3,
// 		},
// 		dob: {
// 			type: Date,
// 			trim: true,
// 		},
// 		age: {
// 			type: Number,
// 			trim: true,
// 		},
// 		gender: {
// 			type: String, // added
// 			trim: true,
// 		},
// 		hobbies: {
// 			type: [String],
// 			// required: true,
// 			sparse: true,
// 		},
// 		qualification: {
// 			type: String,
// 			trim: true,
// 		},
// 		educationInstitute: {
// 			type: ["String"],
// 			required: true,
// 		},
// 		profession: {
// 			type: ["String"],
// 			required: true,
// 		},
// 		educationType: {
// 			type: String, // added
// 			trim: true,
// 		},
// 		preferredJobLocation: {
// 			type: [String], // added
// 			trim: true,
// 		},
// 		preferredJobType: {
// 			type: String, // added
// 			trim: true,
// 		},
// 		skill: {
// 			type: [String], // added
// 			trim: true,
// 		},
// 		portfolio: {
// 			type: String, // added
// 			trim: true,
// 		},
// 		linkedin: {
// 			type: String, // added
// 			trim: true,
// 		},
// 		github: {
// 			type: String, // added
// 			trim: true,
// 		},
// 		behance: {
// 			type: String, // added
// 			trim: true,
// 		},
// 		jobDetails: {
// 			type: Object,
// 			// required: true,
// 		},
// 		employerDetails: {
// 			type: Object,
// 			// required: true,
// 		},
// 		resume: {
// 			type: String,
// 			// required: true,
// 		},
// 		locationName: {
// 			type: String,
// 		},
// 		location: {
// 			type: {
// 				type: String,
// 				enum: ["Point"],
// 				// required: true,
// 			},
// 			coordinates: {
// 				type: [Number],
// 				required: true,
// 			},
// 		},
// 		smokingHabits: {
// 			type: Boolean,
// 			trim: true,
// 			default: false,
// 			sparse: true,
// 		},
// 		drinkingHabits: {
// 			type: Boolean,
// 			trim: true,
// 			default: false,
// 			sparse: true,
// 		},
// 		profileImage: {
// 			type: String,
// 			// required: true,
// 		},
// 		shortReel: {
// 			type: String,
// 			// required: true,
// 		},
// 		story: {
// 			type: String,
// 		},
// 		relationshipGoal: {
// 			type: String,
// 			// required: true,
// 		},
// 		refreshToken: {
// 			type: String,
// 		},
// 		images: [
// 			{
// 				imageUrl: {
// 					type: String,
// 					// required: true,
// 				},
// 			},
// 		],
// 		subscription: {
// 			type: {
// 				type: String,
// 				enum: ["free", "premium"],
// 				default: "free",
// 			},
// 			expiry: {
// 				type: Date,
// 			},
// 		},
// 		role: {
// 			type: String,
// 			enum: ["Employee", "Employer"],
// 		},

// const userSchema = new mongoose.Schema({
//
// });

// const jobPortalSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     qualification: { type: String, required: true },
//     designation: { type: String },
//     experience: { type: Number },
//     skills: { type: [String] }
// });

// const JobPortal = mongoose.model('JobPortal', jobPortalSchema);
// module.exports = JobPortal;

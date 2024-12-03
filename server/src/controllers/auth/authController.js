const jwt = require("jsonwebtoken");
const JobPortal = require("../../models/jobportal");
const User = require("../../models/user");
const ApiError = require("../../utils/apiError");
const ApiResponse = require("../../utils/apiResponse");
const asyncHandler = require("../../utils/asyncHandler");
const generateAccessAndRefreshToken = require("../../utils/generateAccessAndRefreshToken");
const nodemailer = require("nodemailer");

const renewalOfAccessToken = asyncHandler(async (req, res) => {
	const currentRefreshToken = req.cookies.refreshToken;
	if (!currentRefreshToken) {
		throw new ApiError(402, "Unauthorized request");
	}

	try {
		const decodedToken = jwt.verify(
			currentRefreshToken,
			process.env.REFRESH_TOKEN_SECRET_KEY
		);

		const user = await User.findById(decodedToken._id);
		if (!user) {
			throw new ApiError(401, "No user found with the refreshToken");
		}

		const accessToken = await user.generateAccessToken();
		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: true,
		});

		res.json(
			new ApiResponse(
				200,
				null,
				"Successfully generated new Access Token"
			)
		);
	} catch (error) {
		if (error instanceof jwt.TokenExpiredError) {
			throw new ApiError(402, "RefreshToken expired");
		} else if (error instanceof jwt.JsonWebTokenError) {
			throw new ApiError(402, "Invalid RefreshToken");
		} else {
			throw new ApiError(500, "Internal server error", [error.message]);
		}
	}
});

const signup = asyncHandler(async (req, res) => {
	const { name, email, contactNumber, password } = req.body;

	// validate all required fields
	if (
		[name, email, contactNumber, password].some(
			(field) => !field || field.trim() === ""
		)
	) {
		throw new ApiError(400, "All fields must be required");
	}

	// Validate email format
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		throw new ApiError(400, "Invalid email format");
	}

	// Validate password length
	if (password.length < 3) {
		throw new ApiError(400, "Password must be at least 8 characters long");
	}

	const userExist = await User.findOne({ email: email });

	if (userExist?.email === email) {
		throw new ApiError(409, "Email already used, try another..");
	} else if (userExist?.phone === contactNumber) {
		throw new ApiError(409, "Contact number already exists..");
	}

	// save to database
	const userData = await User.create({
		username: name,
		email,
		phone: contactNumber,
		password,
	});

	//Generating access and refresh tokens
	const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
		userData._id
	);
	// userData.refreshToken = refreshToken;
	await userData.save();

	const createdUser = await User.findById(userData._id).select(
		"-password -refreshToken"
	);

	const options = {
		httpOnly: true,
		secure: true,
		maxAge: 7 * 24 * 60 * 60 * 1000,
	};

	res.cookie("accessToken", accessToken, options)
		.cookie("refreshToken", refreshToken, options)
		.json(new ApiResponse(200, createdUser, "Signup Successful"));
});

// add employee data
const employeeSignup = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const {
		dob,
		gender,
		qualification,
		profession,
		location,
		locationName,
		educationInstitute,
		educationType,
		preferredJobLocation,
		preferredJobType,
		socialLinks,
		skills,
		jobDetails,
	} = req.body;

	const { profileImage, resume } = req.files;

	// validate all required fields
	if (
		[
			dob,
			gender,
			qualification,
			educationInstitute,
			educationType,
			preferredJobType,
		].some((field) => !field || field.trim() === "")
	) {
		throw new ApiError(400, "All fields must be required");
	}

	// validate array of fields
	if (
		!Array.isArray(profession) ||
		profession.length === 0 ||
		profession.some((prof) => prof.trim() === "")
	) {
		throw new ApiError(400, "Invalid Profession");
	}

	if (
		!Array.isArray(preferredJobLocation) ||
		preferredJobLocation.length === 0 ||
		preferredJobLocation.some((jobLoc) => jobLoc.trim() === "")
	) {
		throw new ApiError(400, "Invalid Preferred Job Locacation");
	}

	if (
		!Array.isArray(location) ||
		location.length !== 2 ||
		location.some((coord) => coord.trim() === "")
	) {
		throw new ApiError(400, "Invalid location");
	}

	// Validate skills as non-empty arrays
	if (!Array.isArray(skills) || skills.length === 0) {
		throw new ApiError(400, "Invalid skills");
	}

	//Validate Resume
	if (!req.files || !req.files.resume) {
		throw new ApiError(400, "Resume not found");
	}

	// age calculation
	let age = new Date().getFullYear() - new Date(dob).getFullYear();
	const monthDifference = new Date().getMonth() - new Date(dob).getMonth();

	if (
		monthDifference < 0 ||
		(monthDifference === 0 &&
			new Date().getDate() < new Date(dob).getDate())
	) {
		age--;
	}

	// save to database
	const employeeData = await JobPortal.create({
		userId: userId,
		dob,
		age,
		gender,
		qualification,
		profession,
		locationName, // Ensure to convert to numbers
		location: {
			type: "Point",
			coordinates: location, // or if you're constructing it, ensure the order is [longitude, latitude]
		},
		educationInstitute,
		educationType,
		preferredJobLocation,
		preferredJobType,
		socialLinks,
		skills,
		jobDetails: jobDetails ? jobDetails : { workExperience: "fresher" },
		profileImage: profileImage ? profileImage[0]?.location : "",
		resume: resume[0]?.location,
		role: "employee",
	});

	await employeeData.save();

	if (!employeeData) {
		throw new ApiError(400, "data not created");
	}

	// save createdEmployee id in user
	await User.findByIdAndUpdate(
		req.user._id,
		{
			"apps.jobPortal": employeeData._id,
		},
		{
			new: true,
		}
	);

	const createdEmployee = await User.findById(req.user._id)
		.select("-password -refreshToken")
		.populate({
			path: "apps.jobPortal",
		});

	res.json(new ApiResponse(200, createdEmployee, "Signup Completed"));
});

// add employer data
const employerSignup = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const {
		dob,
		gender,
		qualification,
		profession,
		location,
		locationName,
		companyName,
		companyEmail,
		companySite,
		companyAddress,
		companyDescription,
		companySize,
		industryType,
		employmentType,
		companyLinkedin,
	} = req.body;
	const { profileImage, companyLogo } = req.files;

	// validate all required fields
	if (
		[
			dob,
			gender,
			qualification,
			companyName,
			companyEmail,
			companySite,
			companyAddress,
			companyDescription,
			companySize,
			industryType,
			employmentType,
			companyLinkedin,
		].some((field) => !field || field.trim() === "")
	) {
		throw new ApiError(400, "All fields must be required");
	}

	// age calculation
	let age = new Date().getFullYear() - new Date(dob).getFullYear();
	const monthDifference = new Date().getMonth() - new Date(dob).getMonth();

	if (
		monthDifference < 0 ||
		(monthDifference === 0 &&
			new Date().getDate() < new Date(dob).getDate())
	) {
		age--;
	}

	// save to database
	const employerData = await JobPortal.create({
		userId: userId,
		companyName,
		companyEmail,
		companyWebSite: companySite,
		companyAddress,
		companyDescription,
		companySize,
		industryType,
		employmentType,
		companyLinkedin,
		companyLogo: companyLogo ? companyLogo[0]?.location : "",
		profileImage: profileImage ? profileImage[0]?.location : "",
		dob,
		age,
		gender,
		qualification,
		profession,
		locationName, // Ensure to convert to numbers
		location: {
			type: "Point",
			coordinates: location, // or if you're constructing it, ensure the order is [longitude, latitude]
		},
		role: "employer",
	});

	await employerData.save();

	if (!employerData) {
		throw new ApiError(400, "data not created");
	}

	// save createdEmployee id in user
	await User.findByIdAndUpdate(
		req.user._id,
		{
			"apps.jobPortal": employerData._id,
		},
		{
			new: true,
		}
	);

	const createdEmployer = await User.findById(req.user._id)
		.select("-password -refreshToken")
		.populate({
			path: "apps.jobPortal",
		});

	res.json(
		new ApiResponse(200, createdEmployer, "Signup as Employer Successful")
	);
});

const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if ([email, password].some((field) => !field || field.trim() === "")) {
		throw new ApiError(400, "All Fields are necessary");
	}

	const isUser = await User.findOne({ email });

	if (!isUser) {
		throw new ApiError(400, "No matching user found");
	}

	const isUserValid = await isUser.isPasswordCorrect(password);
	if (!isUserValid) {
		throw new ApiError(400, "Wrong Password/Email");
	}
	const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
		isUser._id
	);

	isUser.refreshToken = refreshToken;
	await isUser.save();

	const loggedInUser = await User.findById(isUser._id)
		.select("-password -refreshToken")
		.populate({
			path: "apps.jobPortal",
		});
	const options = {
		httpOnly: true,
		secure: true,
		maxAge: 7 * 24 * 60 * 60 * 1000,
	};

	res.cookie("accessToken", accessToken, options)
		.cookie("refreshToken", refreshToken, options)
		.json(new ApiResponse(200, loggedInUser, "Login Successful"));
});

const logout = asyncHandler(async (req, res) => {
	res.clearCookie("accessToken");
	res.clearCookie("refreshToken");
	res.json(new ApiResponse(200, null, "Logout Successful"));
});

const updateProfileInfo = asyncHandler(async (req, res) => {
	const {
		username,
		email,
		phone,
		gender,
		dob,
		about,
		qualification,
		educationInstitute,
		educationType,
		profession,
		jobDetails,
		skills,
		preferredJobLocation,
		preferredJobType,
		socialLinks,
	} = req.body;
	const profileImage = req.files && req.files[0] ? req.files[0] : null;
	const resume = req.files && req.files[0] ? req.files[0] : null;

	const userId = req.user._id;

	// check if email and phone already exist
	const userExist = await User.findOne({ email: email });
	if (userExist && userExist._id.toString() !== userId.toString()) {
		throw new ApiError(409, "Email already used, try another..");
	} else if (userExist && userExist._id.toString() !== userId.toString()) {
		throw new ApiError(409, "Contact number already exists..");
	}

	// update user data
	const user = await User.findByIdAndUpdate(
		userId,
		{
			username,
			email,
			phone,
		},
		{
			new: true,
		}
	);

	if (!user) {
		throw new ApiError(400, "user not updated");
	}

	// update employee data
	const employee = await JobPortal.findOneAndUpdate(
		{ userId },
		{
			gender,
			dob,
			about,
			qualification,
			educationInstitute,
			educationType,
			profession,
			jobDetails,
			skills,
			preferredJobLocation,
			preferredJobType,
			socialLinks,
			profileImage: profileImage?.location,
			resume: resume?.location,
		},
		{
			new: true,
		}
	);
	if (!employee) {
		throw new ApiError(400, "employee not found");
	}

	const updatedUser = await User.findById(userId)
		.select("-password -refreshToken")
		.populate({
			path: "apps.jobPortal",
		});

	res.json(new ApiResponse(200, updatedUser, "profile updated"));
});

const updatePassword = asyncHandler(async (req, res) => {
	const { oldPassword, newPassword } = req.body;
	const userId = req.user._id;
	const user = await User.findById(userId);
	if (!user) {
		throw new ApiError(400, "user not found");
	}
	const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
	if (!isPasswordCorrect) {
		throw new ApiError(400, "wrong old password");
	}
	user.password = newPassword;
	await user.save();

	res.json(new ApiResponse(200, user, "password updated"));
});

const updateEmployerProfileInfo = asyncHandler(async (req, res) => {
	const {
		companyName,
		companyEmail,
		companyWebSite,
		companyAddress,
		companyDescription,
		companySize,
		industryType,
		employmentType,
		phone,
		companyLinkedin,
	} = req.body;

	const companyLogo = req.files && req.files[0] ? req.files[0] : null;

	const userId = req.user._id;

	// check if phone already exist
	const userExist = await User.findById(userId);
	if (userExist && userExist._id.toString() !== userId.toString()) {
		throw new ApiError(409, "Contact number already exists..");
	}

	// update user data
	const user = await User.findByIdAndUpdate(
		userId,
		{
			phone,
		},
		{
			new: true,
		}
	);

	if (!user) {
		throw new ApiError(400, "user not updated");
	}

	// update employer data
	const employer = await JobPortal.findOneAndUpdate(
		{ userId },
		{
			companyName,
			companyEmail,
			companyWebSite,
			companyAddress,
			companyDescription,
			companySize,
			industryType,
			employmentType,
			companyLinkedin,
			companyLogo: companyLogo?.location,
		},
		{
			new: true,
		}
	);
	if (!employer) {
		throw new ApiError(400, "employer not found");
	}

	const updatedUser = await User.findById(userId)
		.select("-password -refreshToken")
		.populate({
			path: "apps.jobPortal",
		});

	res.json(new ApiResponse(200, updatedUser, "profile updated"));
});

// forgot password
const forgotPassword = asyncHandler(async (req, res) => {
	const { email } = req.body;

	const user = await User.findOne({ email })
		.select("apps.jobPortal")
		.populate("apps.jobPortal");
	if (!user) {
		throw new ApiError(400, "user not found");
	}

	// Generate a 4-digit OTP
	const otp = Math.floor(1000 + Math.random() * 9000).toString();

	if (!user.apps || !user.apps.jobPortal) {
		throw new ApiError(400, "Job Portal details not found for this user");
	}

	// Update JobPortal collection directly
	await JobPortal.findByIdAndUpdate(user.apps.jobPortal._id, {
		resetPasswordOtp: otp,
		resetPasswordExpire: Date.now() + 10 * 60 * 1000, // 10 minutes
	});

	// Configure nodemailer
	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	const mailOptions = {
		from: '"Job Portal Support" <support@jobportal.com>',
		to: email,
		subject: "Your Password Reset OTP for Job Portal",
		text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
	};

	await transporter.sendMail(mailOptions);
	res.json(new ApiResponse(200, { email }, "OTP sent to your email"));
});

// reset password
const resetPassword = asyncHandler(async (req, res) => {
	const { email, otp, newPassword } = req.body;

	const user = await User.findOne({ email })
		.select("apps.jobPortal")
		.populate("apps.jobPortal");
	if (!user) {
		throw new ApiError(400, "user not found");
	}

	if (!user.apps || !user.apps.jobPortal) {
		throw new ApiError(400, "Job Portal details not found for this user");
	}

	if (
		user.apps.jobPortal.resetPasswordOtp !== otp ||
		user.apps.jobPortal.resetPasswordExpire < Date.now()
	) {
		throw new ApiError(400, "Invalid or expired OTP");
	}

	// Update JobPortal collection directly
	const updatedJobPortal = await JobPortal.findByIdAndUpdate(
		user.apps.jobPortal._id,
		{
			$unset: {
				resetPasswordOtp: 1,
				resetPasswordExpire: 1
			}
		},
		{
			new: true
		}
	);

	if (!updatedJobPortal) {
		throw new ApiError(400, "Failed to update job portal");
	}

	user.password = newPassword;
	await user.save();

	res.json(new ApiResponse(200, user, "password updated"));
});

module.exports = {
	signup,
	employeeSignup,
	employerSignup,
	login,
	updateProfileInfo,
	updatePassword,
	renewalOfAccessToken,
	logout,
	updateEmployerProfileInfo,
	forgotPassword,
	resetPassword,
};

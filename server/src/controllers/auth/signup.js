const User = require("../../models/user");
const ApiError = require("../../utils/apiError");
const ApiResponse = require("../../utils/apiResponse");
const asyncHandler = require("../../utils/asyncHandler");
const generateAccessAndRefreshToken = require("../../utils/generateAccessAndRefreshToken");

const fresherSignup = asyncHandler(async (req, res) => {
	const {
		name,
		email,
		contactNumber,
		password,
		dob,
		gender,
		qualification,
		educationType,
		preferredJobLocation,
		preferredJobType,
		location,
		locationName,
		skill,
		portfolio,
		linkedin,
		github,
		behance,
	} = req.body;

	const { profileImage, resume } = req.files;

	// validate all required fields
	if (
		[
			name,
			email,
			contactNumber,
			password,
			dob,
			gender,
			qualification,
			educationType,
			linkedin,
			preferredJobType,
		].some((field) => !field || field.trim() === "")
	) {
		throw new ApiError(400, "All fields must be required");
	}

	// validate array of fields
	if (
		!Array.isArray(preferredJobLocation) ||
		preferredJobLocation.length === 0 ||
		preferredJobLocation.some((jobLoc) => jobLoc.trim() === "")
	) {
		throw new ApiError(400, "Invalid Preferred Job Locacation");
	}

	// Validate skills and location as non-empty arrays
	if (
		!Array.isArray(skill) ||
		skill.length === 0 ||
		skill.some((skil) => skil.trim() === "")
	) {
		throw new ApiError(400, "Invalid skills");
	}

	if (
		!Array.isArray(location) ||
		location.length !== 2 ||
		location.some((coord) => coord.trim() === "")
	) {
		throw new ApiError(400, "Invalid location");
	}

	//Validate profileImage
	if (!req.files || !req.files.profileImage) {
		throw new ApiError(400, "Profile Image not found");
	}

	//Validate Resume
	if (!req.files || !req.files.resume) {
		throw new ApiError(400, "Resume not found");
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
	} else if (userExist?.contactNumber === contactNumber) {
		throw new ApiError(409, "Contact number already exists..");
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
	const userData = await User.create({
		name,
		email,
		contactNumber,
		password,
		dob,
		age,
		gender,
		qualification,
		educationType,
		preferredJobLocation,
		preferredJobType,
		locationName, // Ensure to convert to numbers
		location: {
			type: "Point",
			coordinates: location, // or if you're constructing it, ensure the order is [longitude, latitude]
		},
		skill,
		portfolio,
		linkedin,
		github,
		behance,
		profileImage: profileImage[0]?.location,
		resume: resume[0]?.location,
		role: "employee",
	});

	//Generating access and refresh tokens
	const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
		userData._id
	);
	userData.refreshToken = refreshToken;
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

const employeeSignup = asyncHandler(async (req, res) => {
	const {
		name,
		email,
		contactNumber,
		password,
		dob,
		gender,
		qualification,
		educationType,
		preferredJobLocation,
		preferredJobType,
		location,
		locationName,
		skill,
		portfolio,
		linkedin,
		github,
		behance,
		jobDetails,
	} = req.body;

	const { profileImage, resume } = req.files;

	// validate all required fields
	if (
		[
			name,
			email,
			contactNumber,
			password,
			dob,
			gender,
			qualification,
			educationType,
			linkedin,
			preferredJobType,
		].some((field) => !field || field.trim() === "")
	) {
		throw new ApiError(400, "All fields must be required");
	}

	// validate array of fields
	if (
		!Array.isArray(preferredJobLocation) ||
		preferredJobLocation.length === 0 ||
		preferredJobLocation.some((jobLoc) => jobLoc.trim() === "")
	) {
		throw new ApiError(400, "Invalid Preferred Job Locacation");
	}

	// Validate skills and location as non-empty arrays
	if (
		!Array.isArray(skill) ||
		skill.length === 0 ||
		skill.some((skil) => skil.trim() === "")
	) {
		throw new ApiError(400, "Invalid skills");
	}

	if (
		!Array.isArray(location) ||
		location.length !== 2 ||
		location.some((coord) => coord.trim() === "")
	) {
		throw new ApiError(400, "Invalid location");
	}

	//Validate profileImage
	if (!req.files || !req.files.profileImage) {
		throw new ApiError(400, "Profile Image not found");
	}

	//Validate Resume
	if (!req.files || !req.files.resume) {
		throw new ApiError(400, "Resume not found");
	}

	// Validate jobDetails object
	if (!jobDetails || typeof jobDetails !== "object") {
		throw new ApiError(400, "Invalid job details");
	}

	const invalidJobDetails = Object.entries(jobDetails).some(
		([key, value]) => !value || value.trim() === ""
	);
	if (invalidJobDetails) {
		throw new ApiError(400, "Job details contains invalid or empty fields");
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
	} else if (userExist?.contactNumber === contactNumber) {
		throw new ApiError(409, "Contact number already exists..");
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
	const userData = await User.create({
		name,
		email,
		contactNumber,
		password,
		dob,
		age,
		gender,
		qualification,
		educationType,
		preferredJobLocation,
		preferredJobType,
		locationName, // Ensure to convert to numbers
		location: {
			type: "Point",
			coordinates: location, // or if you're constructing it, ensure the order is [longitude, latitude]
		},
		skill,
		portfolio,
		linkedin,
		github,
		behance,
		jobDetails,
		profileImage: profileImage[0]?.location,
		resume: resume[0]?.location,
		role: "employee",
	});

	//Generating access and refresh tokens
	const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
		userData._id
	);
	userData.refreshToken = refreshToken;
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

const employerSignup = asyncHandler(async (req, res) => {
	const { name, email, contactNumber, password, employerDetails } = req.body;
	const { profileImage } = req.files;

	// console.log(profileImage);

	// validate all required fields
	if (
		[name, email, contactNumber, password].some(
			(field) => !field || field.trim() === ""
		)
	) {
		throw new ApiError(400, "All fields must be required");
	}

	//Validate profileImage
	if (!req.files || !req.files.profileImage) {
		throw new ApiError(400, "Profile Image not found");
	}

	// Validate employerDetails object
	if (!employerDetails || typeof employerDetails !== "object") {
		throw new ApiError(400, "Invalid job details");
	}

	const invalidemployerDetails = Object.entries(employerDetails).some(
		([key, value]) => !value || value.trim() === ""
	);
	if (invalidemployerDetails) {
		throw new ApiError(400, "Job details contains invalid or empty fields");
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
	} else if (userExist?.contactNumber === contactNumber) {
		throw new ApiError(409, "Contact number already exists..");
	}

	// save to database
	const userData = await User.create({
		name,
		email,
		contactNumber,
		password,
		profileImage: profileImage[0]?.location,
		role: "employer",
		employerDetails,
	});

	//Generating access and refresh tokens
	const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
		userData._id
	);
	userData.refreshToken = refreshToken;
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
module.exports = {
	fresherSignup,
	employeeSignup,
	employerSignup,
};

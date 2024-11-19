const JobPortal = require("../../models/jobportal");
const User = require("../../models/user");
const ApiError = require("../../utils/apiError");
const ApiResponse = require("../../utils/apiResponse");
const asyncHandler = require("../../utils/asyncHandler");
const generateAccessAndRefreshToken = require("../../utils/generateAccessAndRefreshToken");

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
		profileImage: profileImage[0]?.location,
		resume: resume[0]?.location,
		role: "employee",
	});

	await employeeData.save();

	const createdEmployee = await JobPortal.findById(employeeData._id);

	// save createdEmployee id in user
	await User.findByIdAndUpdate(req.user._id, {
		"apps.jobPortal": createdEmployee._id,
	});

	if (!createdEmployee) {
		throw new ApiError(400, "Employee not created");
	}

	res.json(
		new ApiResponse(200, createdEmployee, "Signup as Employee Successful")
	);
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
		companyLogo: companyLogo[0]?.location,
		profileImage: profileImage[0]?.location,
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

	const createdEmployer = await JobPortal.findById(employerData._id);

	// save createdEmployee id in user
	await User.findByIdAndUpdate(req.user._id, {
		"apps.jobPortal": createdEmployer._id,
	});

	if (!createdEmployer) {
		throw new ApiError(400, "Employee not created");
	}

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

	const loggedInUser = await User.findById(isUser._id).select(
		"-password -refreshToken"
	);
	const options = {
		httpOnly: true,
		secure: true,
		maxAge: 7 * 24 * 60 * 60 * 1000,
	};

	res.cookie("accessToken", accessToken, options)
		.cookie("refreshToken", refreshToken, options)
		.json(new ApiResponse(200, loggedInUser, "Login Successful"));
});

module.exports = {
	signup,
	employeeSignup,
	employerSignup,
	login,
};

const Employee = require("../../models/employee");
const Employer = require("../../models/employer");
const User = require("../../models/user");
const ApiError = require("../../utils/apiError");
const ApiResponse = require("../../utils/apiResponse");
const asyncHandler = require("../../utils/asyncHandler");
const generateAccessAndRefreshToken = require("../../utils/generateAccessAndRefreshToken");

const signup = asyncHandler(async (req, res) => {
	const {
		name,
		email,
		contactNumber,
		password,
		dob,
		gender,
		qualification,
		educationInstitute,
		location,
		locationName,
		profession,
		role,
	} = req.body;

	const { profileImage } = req.files;

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
			educationInstitute,
			role,
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

	// Validate location as non-empty arrays

	if (
		!Array.isArray(location) ||
		location.length !== 2 ||
		location.some((coord) => coord.trim() === "")
	) {
		throw new ApiError(400, "Invalid location");
	}

	// //Validate profileImage
	if (!req.files || !req.files.profileImage) {
		throw new ApiError(400, "Profile Image not found");
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
		educationInstitute,
		locationName,
		location: {
			type: "Point",
			coordinates: location, // or if you're constructing it, ensure the order is [longitude, latitude]
		},
		profileImage: profileImage[0]?.location,
		profession,
		role,
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
	const employeeId = req.user._id;
	const {
		educationType,
		preferredJobLocation,
		preferredJobType,
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
		[educationType, educationType, linkedin, preferredJobType].some(
			(field) => !field || field.trim() === ""
		)
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

	// Validate skills as non-empty arrays
	if (!Array.isArray(skill) || skill.length === 0) {
		throw new ApiError(400, "Invalid skills");
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

	// save to database
	const employeeData = await Employee.create({
		employeeId: employeeId,
		educationType,
		preferredJobLocation,
		preferredJobType,
		skill,
		portfolio,
		linkedin,
		github,
		behance,
		jobDetails,
		profileImage: profileImage[0]?.location,
		resume: resume[0]?.location,
	});

	await employeeData.save();

	const createdEmployee = await Employee.findById(employeeData._id);

	if (!createdEmployee) {
		throw new ApiError(400, "Employee not created");
	}

	res.json(
		new ApiResponse(200, createdEmployee, "Signup as Employee Successful")
	);
});

// add employer data
const employerSignup = asyncHandler(async (req, res) => {
	const employerId = req.user._id;
	const { employerDetails } = req.body;
	const { profileImage } = req.files;

	// console.log(employerDetails);

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

	// save to database
	const employerData = await Employer.create({
		employerId: employerId,
		companyName: employerDetails.companyName,
		companyEmail: employerDetails.companyEmail,
		companyAddress: employerDetails.companyAddress,
		companyWebSite: employerDetails.companySite,
		companySize: employerDetails.companySize,
		industryType: employerDetails.industryType,
		companyLinkedin: employerDetails.companyLinkedin,
		companyLogo: profileImage[0]?.location,
	});

	await employerData.save();

	const createdEmployer = await Employer.findById(employerData._id);

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
	login
};

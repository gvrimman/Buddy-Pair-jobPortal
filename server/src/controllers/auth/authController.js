const jwt = require("jsonwebtoken");
const JobPortal = require("../../models/jobportal");
const Company = require("../../models/company");
const User = require("../../models/user");
const ApiError = require("../../utils/apiError");
const ApiResponse = require("../../utils/apiResponse");
const asyncHandler = require("../../utils/asyncHandler");
const generateAccessAndRefreshToken = require("../../utils/generateAccessAndRefreshToken");
const SendMail = require("../../config/mailer");
const isCompanyMail = require("../../utils/mailChecker");

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
			secure: process.env.NODE_ENV === "production",
        	sameSite: "strict",
        	domain: process.env.COOKIE_DOMAIN,
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

	if (userExist) {
		throw new ApiError(409, "Email already used, try another..");
	} 

	const userExistPh = await User.findOne({ phone: contactNumber });
	
	if(userExistPh) {
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

	// Generate a 4-digit OTP
	const otp = Math.floor(1000 + Math.random() * 9000).toString();
	userData.emailVerifyOtp = otp;
	userData.emailVerifyExpire = Date.now() + 10 * 60 * 1000;

	const mailOptions = {
		from: `"BuddyPair Jobs" <${process.env.EMAIL_USER}>`,
		to: email,
		subject: "Email Verification",
		text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
	};

  	await SendMail(mailOptions);
	await userData.save();

  	const createdUser = await User.findById(userData._id).select(
		"-password -refreshToken -emailVerifyOtp"
	);

	const options = {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        domain: process.env.COOKIE_DOMAIN,
	};

	res.cookie("accessToken", accessToken, options)
		.cookie("refreshToken", refreshToken, options)
		.json(new ApiResponse(200, createdUser, "Signup successful and verification otp is send to mail."));
});

// verify otp
const VerifyEmailOTP = asyncHandler(async (req, res) => {
	const { email, otp } = req.body;

	const user = await User.findOne({ email }).select("-password");

	if (!user) {
		throw new ApiError(400, "user not found");
	}

	if(user.emailVerified) {
		throw new ApiError(400, "Email already Verified");
	}

	if (
		user.emailVerifyOtp !== otp ||
		user.emailVerifyExpire < Date.now()
	) {
		throw new ApiError(400, "Invalid or expired OTP");
	}

	user.emailVerified = true;
	await user.save();

	res.json(new ApiResponse(200, user, "Email verified"));
});

// resend otp
const ResendEmailOTP = asyncHandler(async (req, res) => {
	const { email } = req.body;

	const user = await User.findOne({ email }).select("-password");

	if (!user) {
		throw new ApiError(400, "user not found");
	}
	if(user.emailVerified) {
		throw new ApiError(400, "Email already Verified");
	}

	// Generate a 4-digit OTP
	const otp = Math.floor(1000 + Math.random() * 9000).toString();
	user.emailVerifyOtp = otp;
	user.emailVerifyExpire = Date.now() + 10 * 60 * 1000;

	const mailOptions = {
		from: `"BuddyPair Jobs" <${process.env.EMAIL_USER}>`,
		to: email,
		subject: "Email Verification",
		text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
	};

  	await SendMail(mailOptions);
	await user.save();

	res.json(new ApiResponse(200, null, "OTP resended to your given mail"));
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
	// if (!req.files || !req.files.resume) {
	// 	throw new ApiError(400, "Resume not found");
	// }

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
		resume: resume ? resume[0]?.location : "",
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

const employerSignupV2 = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { dob, gender, qualification, profession, location, company } =
    req.body;
  const profileImage = req.files && req.files[0] ? req.files[0] : null;

  // validate all required fields
  if (
    [
      dob,
      gender,
      qualification
    ].some((field) => !field || field.trim() === "")
  ) {
    throw new ApiError(400, "All fields must be required");
  }
  if(company){
	  const existingCompany = await Company.findById(company);
	  if (!existingCompany) {
		throw new ApiError(400, "Company didn't exist");
	  }
  }

  // age calculation
  let age = new Date().getFullYear() - new Date(dob).getFullYear();
  const monthDifference = new Date().getMonth() - new Date(dob).getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && new Date().getDate() < new Date(dob).getDate())
  ) {
    age--;
  }

  // save to database
  const employerData = await JobPortal.create({
    userId: userId,
    company: company || null,
    profileImage: profileImage ? profileImage[0]?.location : "",
    dob,
    age,
    gender,
    qualification,
    profession,
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
		.select("-password -refreshToken -emailVerifyOtp -resetPasswordOtp")
		.populate({
			path: "apps.jobPortal",
			populate: {
				path: "company", 
			},
		});
	const options = {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        domain: process.env.COOKIE_DOMAIN,
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
			populate: {
				path: "company", 
			},
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
		companyNumber,
		companyLinkedin,
	} = req.body;

	const companyLogo = req.files && req.files[0] ? req.files[0] : null;
	const userId = req.user._id;

	// Fetch existing employer data
	const employer = await JobPortal.findOne({ userId });
	if (!employer) {
		throw new ApiError(400, "Employer not found");
	}

	// Update other employer fields
	await JobPortal.findOneAndUpdate(
		{ userId },
		{
			companyName,
			companyWebSite,
			companyAddress,
			companyDescription,
			companySize,
			industryType,
			employmentType,
			companyNumber,
			companyLinkedin,
			companyLogo: companyLogo?.location,
		},
		{ new: true }
	);

	// Check if email is being updated
	if (companyEmail && companyEmail !== employer.companyEmail) {
		const currentTime = Date.now();

		const existingemail = await JobPortal.findOne({ companyEmail });
		if(existingemail) {
			throw new ApiError(403, "This mail already verified by another company. you can't add.");
		}

		if(!isCompanyMail(companyEmail)) {
			throw new ApiError(403, "Personal mail addresses are not accepted.");
		}

		if (
			employer.CMailVerifyOTP &&
			employer.CMailOTPExpire &&
			currentTime - new Date(employer.CMailOTPExpire).getTime() < 60000
		) {
			throw new ApiError(429, "OTP was sent recently. Please wait before updating the email.");
		}
		const otp = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP

		// Save new email to `UnverifiedCmail` and send OTP
		employer.UnverifiedCmail = companyEmail;
		employer.CMailVerifyOTP = otp;
		employer.CMailOTPExpire = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

		const mailOptions = {
		from: `"BuddyPair Jobs" <${process.env.EMAIL_USER}>`,
		to: companyEmail,
		subject: "Company Mail Verification",
		text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
		};

		await SendMail(mailOptions);

		// Save the updated employer data
		await employer.save();
		// Fetch updated user data
		const updatedUser = await User.findById(userId)
			.select("-password -refreshToken")
			.populate({
				path: "apps.jobPortal",
				populate: {
					path: "company", 
				},
			});

		return res.json(
			new ApiResponse(
				200,
				updatedUser,
				"A verification email has been sent to the new email address. Please verify to complete the update."
			)
		);
	}

	// Fetch updated user data
	const updatedUser = await User.findById(userId)
		.select("-password -refreshToken")
		.populate({
		path: "apps.jobPortal",
		});

	res.json(new ApiResponse(200, updatedUser, "Company profile updated successfully"));
});

// verify company mail otp
const VerifyCompanyEmailOTP = asyncHandler(async (req, res) => {
	const { email, otp } = req.body;

	// Find employer with the provided unverified email and OTP
	const employer = await JobPortal.findOne({
		UnverifiedCmail: email,
		CMailVerifyOTP: otp,
		CMailOTPExpire: { $gte: Date.now() }, // Ensure OTP hasn't expired
	});

	if (!employer) {
		throw new ApiError(400, "Invalid OTP or OTP has expired");
	}

	// Update companyEmail and clear verification fields
	employer.companyEmail = email;
	employer.UnverifiedCmail = null;
	employer.CMailVerifyOTP = null;
	employer.CMailOTPExpire = null;

	await employer.save();

	res.json(new ApiResponse(200, null, "Email verified successfully"));
});

// resend company mail otp
const ResendCompanyEmailOTP = asyncHandler(async (req, res) => {
	const { email } = req.body;

	const employer = await JobPortal.findOne({ UnverifiedCmail: email });

	if (!employer) {
		throw new ApiError(404, "No unverified email found.");
	}

	const currentTime = Date.now();

	if (
		employer.emailVerificationOtp &&
		employer.otpExpiry &&
		currentTime - new Date(employer.otpExpiry).getTime() < 60000
	) {
		throw new ApiError(
		429,
		"OTP was sent recently. Please wait before resending."
		);
	}

	const otp = Math.floor(1000 + Math.random() * 9000);
	employer.emailVerificationOtp = otp;
	employer.otpExpiry = new Date(currentTime + 10 * 60 * 1000);

	await employer.save();

	const mailOptions = {
		from: `"BuddyPair Jobs" <${process.env.EMAIL_USER}>`,
		to: email,
		subject: "Resend Company Mail Verification OTP",
		text: `Your new OTP is ${otp}. It will expire in 10 minutes.`,
	};

	await SendMail(mailOptions);

	res.json(new ApiResponse(200, null, "Verification OTP resent successfully."));
});

// forgot password
const forgotPassword = asyncHandler(async (req, res) => {
	const { email } = req.body;

	const user = await User.findOne({ email });
	if (!user) {
		throw new ApiError(400, "user not found");
	}

	// Generate a 4-digit OTP
	const otp = Math.floor(1000 + Math.random() * 9000).toString();

	// Update user collection directly
	user.resetPasswordOtp = otp;
  	user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
	await user.save();

	const mailOptions = {
		from: `"BuddyPair Jobs" <${process.env.EMAIL_USER}>`,
		to: email,
		subject: "Your Password Reset OTP for Job Portal",
		text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
	};

	await SendMail(mailOptions);
	res.json(new ApiResponse(200, { email }, "OTP sent to your email"));
});

// reset password
const resetPassword = asyncHandler(async (req, res) => {
	const { email, otp, newPassword } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		throw new ApiError(400, "user not found");
	}

	if (
		user.resetPasswordOtp !== otp ||
		user.resetPasswordExpire < Date.now()
	) {
		throw new ApiError(400, "Invalid or expired OTP");
	}

	user.password = newPassword;
	user.resetPasswordOtp = null;
	await user.save();

	res.json(new ApiResponse(200, user, "password updated"));
});

module.exports = {
	signup,
	VerifyEmailOTP,
	ResendEmailOTP,
	employeeSignup,
	employerSignup,
	employerSignupV2,
	login,
	updateProfileInfo,
	updatePassword,
	renewalOfAccessToken,
	logout,
	updateEmployerProfileInfo,
	VerifyCompanyEmailOTP,
	ResendCompanyEmailOTP,
	forgotPassword,
	resetPassword,
};

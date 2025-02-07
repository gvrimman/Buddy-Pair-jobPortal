const Company = require("../models/company");
const EmployerRequest = require("../models/employerRequest");
const JobPortal = require("../models/jobportal");
const SendMail = require("../config/mailer");
const ApiError = require("../utils/apiError"); // your custom error class
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const isCompanyMail = require("../utils/mailChecker");

const getAllCompanies = asyncHandler(async (req, res) => {
  const companies = await Company.find().select("name _id createdBy");
  res.json(new ApiResponse(200, companies, "companies"));
});

const updateCompanyProfile = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    website,
    address,
    description,
    size,
    industry,
    workType,
    linkedin,
  } = req.body;

  const companyLogo = req.files && req.files[0] ? req.files[0] : null;
  const userId = req.user._id;

  const company = await Company.findOne({ createdBy: userId });
  if (!company) {
    throw new ApiError(404, "Company not found.");
  }

  await Company.findOneAndUpdate(
    { createdBy: userId },
    {
      name,
      website,
      address,
      description,
      size,
      industry,
      workType,
      linkedin,
      logo: companyLogo?.location,
    }
  );

  // If email is updated and is different from current verified email, trigger verification
  if (email && email !== company.email) {
    const currentTime = Date.now();

    const existingemail = await Company.findOne({ email });
    if (existingemail) {
      throw new ApiError(
        403,
        "This mail already verified by another company. you can't add."
      );
    }

    if (!isCompanyMail(email)) {
      throw new ApiError(403, "Personal mail addresses are not accepted.");
    }

    if (
      company.emailVerifyOTP &&
      company.emailOTPExpire &&
      currentTime - new Date(company.emailOTPExpire).getTime() < 60000
    ) {
      throw new ApiError(
        429,
        "OTP was sent recently. Please wait before updating the email."
      );
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpire = new Date(Date.now() + 10 * 60 * 1000);

    company.unVerifiedEmail = req.body.email;
    company.emailVerifyOTP = otp;
    company.emailOTPExpire = otpExpire;

    const mailOptions = {
      from: `"BuddyPair Jobs" <${process.env.EMAIL_USER}>`,
      to: req.body.email,
      subject: "Company Email Verification",
      text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
    };

    await SendMail(mailOptions);

    // Save the updated company data
    await company.save();
    // Inform client that a verification email has been sent
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          company,
          "A verification email has been sent to the new email address. Please verify to complete the update."
        )
      );
  }

  // Fetch updated user data
  const updatedCompany = await Company.findOne({ createdBy: userId }).select(
    "-emailVerifyOTP"
  );

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedCompany,
        "Company profile updated successfully."
      )
    );
});

const verifyCompanyEmailOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  // Find company using unVerifiedEmail, OTP and check expiry
  const company = await Company.findOne({
    unVerifiedEmail: email,
    emailVerifyOTP: otp,
    emailOTPExpire: { $gte: Date.now() },
  });

  if (!company) {
    throw new ApiError(400, "Invalid OTP or OTP has expired");
  }

  // Update company record to mark email as verified
  company.email = email;
  company.emailVerified = true;
  company.unVerifiedEmail = null;
  company.emailVerifyOTP = null;
  company.emailOTPExpire = null;
  await company.save();

  res
    .status(200)
    .json(new ApiResponse(200, company, "Email verified successfully"));
});

const ResendCompanyEmailOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const userId = req.user._id;

  const company = await Company.findOne({
    unVerifiedEmail: email,
    createdBy: userId,
  });

  if (!company) {
    throw new ApiError(404, "Company not found.");
  }

  const currentTime = Date.now();

  if (
    company.emailVerifyOTP &&
    company.emailOTPExpire &&
    currentTime - new Date(company.emailOTPExpire).getTime() < 60000
  ) {
    throw new ApiError(
      429,
      "OTP was sent recently. Please wait before resending."
    );
  }

  const otp = Math.floor(1000 + Math.random() * 9000);
  company.emailVerifyOTP = otp;
  company.emailOTPExpire = new Date(currentTime + 10 * 60 * 1000);

  await company.save();

  const mailOptions = {
    from: `"BuddyPair Jobs" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Resend Company Mail Verification OTP",
    text: `Your new OTP is ${otp}. It will expire in 10 minutes.`,
  };

  await SendMail(mailOptions);

  res.json(new ApiResponse(200, null, "Verification OTP resent successfully."));
});

const registerCompany = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    website,
    industry,
    location,
    address,
    description,
    size,
    linkedin,
    workType,
  } = req.body;
  const companyLogo = req.files && req.files[0] ? req.files[0] : null;
  const userId = req.user._id;
  const userData = await JobPortal.findOne({ userId });

  // Check if company already exists
  const emailCheck = await Company.findOne({ email });
  if (emailCheck) {
    throw new ApiError(400, "A company with this email already exists.");
  }
  const websiteCheck = await Company.findOne({ website });
  if (websiteCheck) {
    throw new ApiError(400, "A company with this website already exists.");
  }
  const nameCheck = await Company.findOne({ name });
  if (nameCheck) {
    throw new ApiError(400, "A company with this name already exists.");
  }
  const userCheck = await Company.findOne({ createdBy: userId });
  if (userCheck) {
    throw new ApiError(400, "A company is already exists under your account.");
  }

  // Generate OTP
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const otpExpire = new Date(Date.now() + 10 * 60 * 1000); // valid for 10 minutes

  // Create company. Note: company email remains unverified until OTP is confirmed.
  const company = new Company({
    name,
    website,
    industry,
    location,
    address,
    description,
    size,
    workType,
    linkedin,
    emailVerified: false,
    unVerifiedEmail: email,
    emailVerifyOTP: otp,
    emailOTPExpire: otpExpire,
    createdBy: userId,
    logo: companyLogo ? companyLogo?.location : null,
  });

  await company.save();

  userData.company = company._id;
  await userData.save();

  // Send verification email
  const mailOptions = {
    from: `"BuddyPair Jobs" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Company Email Verification",
    text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
  };

  await SendMail(mailOptions);

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        null,
        "Company registered successfully. A verification email has been sent."
      )
    );
});

const SendJoinRequest = asyncHandler(async (req, res) => {
  const { companyId } = req.body;
  const existingRequest = await EmployerRequest.findOne({
    user: req.user.id,
    company: companyId,
  });

  if (existingRequest) throw new ApiError(400, "Request already sent.");

  const newRequest = new EmployerRequest({
    user: req.user.id,
    company: companyId,
  });
  await newRequest.save();

  res
    .status(201)
    .json(new ApiResponse(201, newRequest, "Request sent successfully"));
});

const VerifyRequest = asyncHandler(async (req, res) => {
  const { requestId, status } = req.body;

  const employeeRequest = await EmployeeRequest.findById(requestId);
  if (!employeeRequest) throw new ApiError(404, "Request not found.");

  if (!["approved", "rejected"].includes(status))
    throw new ApiError(400, "Invalid status.");

  employeeRequest.status = status;
  await employeeRequest.save();

  res
    .status(200)
    .json(new ApiResponse(200, null, `Request ${status} successfully`));
});

module.exports = {
  updateCompanyProfile,
  verifyCompanyEmailOTP,
  ResendCompanyEmailOTP,
  registerCompany,
  SendJoinRequest,
  VerifyRequest,
  getAllCompanies,
};

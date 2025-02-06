const Company = require("../models/company");
const EmployerRequest = require("../models/employerRequest");
const JobPortal = require("../models/jobportal");
const SendMail = require("../config/mailer");
const ApiError = require("../utils/apiError"); // your custom error class
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getAllCompanies = asyncHandler(async (req, res) => {
    const companies = await Company.find().select("name _id createdBy");
    res.json(new ApiResponse(200, companies, "companies"));
});

const updateCompanyProfile = asyncHandler(async (req, res, next) => {
  try {
    const companyLogo = req.files && req.files[0] ? req.files[0] : null;
    console.log(companyLogo);
    const userId = req.user._id;
    const company = await Company.findOne({ createdBy: userId });
    if (!company) {
      throw new ApiError(404, "Company not found.");
    }

    // If email is updated and is different from current verified email, trigger verification
    if (req.body.email && req.body.email !== company.email) {
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      const otpExpire = new Date(Date.now() + 10 * 60 * 1000);

      company.unVerifiedEmail = req.body.email;
      company.emailVerifyOTP = otp;
      company.emailOTPExpire = otpExpire;
      // Optionally, do not immediately update company.email until verified
      if(companyLogo) company.logo = companyLogo;

      const mailOptions = {
        from: `"BuddyPair Jobs" <${process.env.EMAIL_USER}>`,
        to: req.body.email,
        subject: "Company Email Verification",
        text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
      };

      await SendMail(mailOptions);

      // Do not update company.email in this step, just inform the client to verify the new email
      // Remove email from the update payload so it doesn't overwrite the verified email
      delete req.body.email;

      // Inform client that a verification email has been sent
      res.status(200).json(new ApiResponse(200, null, "Verification email sent for new email. Please verify to complete the update."));
      return;
    }

    // For non-email updates, update the company record
    Object.assign(company, req.body);

    await company.save();
    res
      .status(200)
      .json(new ApiResponse(200, company, "Company profile updated successfully."));
  } catch (err) {
    next(err);
  }
});

const verifyCompanyEmailOTP = asyncHandler(async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    // Find company using unVerifiedEmail, OTP and check expiry
    const company = await Company.findOne({
      unVerifiedEmail: email,
      emailVerifyOTP: otp,
      emailOTPExpire: { $gte: Date.now() },
    });
    if (!company) {
      throw new ApiError(400, "Invalid OTP or OTP has expired.");
    }

    // Update company record to mark email as verified
    company.email = email;
    company.emailVerified = true;
    company.unVerifiedEmail = null;
    company.emailVerifyOTP = null;
    company.emailOTPExpire = null;
    await company.save();

    res.status(200).json(new ApiResponse(200, null, "Company email verified successfully."));
  } catch (err) {
    next(err);
  }
});

const registerCompany = asyncHandler(async (req, res, next) => {
  try {
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
      throw new ApiError(
        400,
        "A company with this website already exists."
      );
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
      email, // initial email (could be stored as unverified until verification)
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
      logo: companyLogo ? companyLogo[0]?.location : null,
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

    res.status(201).json(new ApiResponse(201, null, "Company registered successfully. A verification email has been sent."));
  } catch (err) {
    next(err);
  }
});

const SendJoinRequest = asyncHandler(async (req, res) => {
    const { companyId } = req.body;
    const existingRequest = await EmployerRequest.findOne({
      user: req.user.id,
      company: companyId,
    });

    if (existingRequest)
      throw new ApiError(400, "Request already sent.")

    const newRequest = new EmployerRequest({
      user: req.user.id,
      company: companyId,
    });
    await newRequest.save();

    res
      .status(201)
      .json(new ApiResponse(201, newRequest, "Request sent successfully"));
});

const VerifyRequest = asyncHandler( async (req, res) => {
    const { requestId, status } = req.body;

    const employeeRequest = await EmployeeRequest.findById(requestId);
    if (!employeeRequest)
      throw new ApiError(404, "Request not found.");

    if (!["approved", "rejected"].includes(status))
      throw new ApiError(400, "Invalid status.");

    employeeRequest.status = status;
    await employeeRequest.save();

    res.status(200).json(new ApiResponse(200, null, `Request ${status} successfully`));
});

module.exports = {
    updateCompanyProfile,
    verifyCompanyEmailOTP,
    registerCompany,
    SendJoinRequest,
    VerifyRequest,
    getAllCompanies
};

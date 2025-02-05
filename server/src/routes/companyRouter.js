const express = require("express");
const { upload } = require("../middlewares/multer");
const {
  registerCompany,
  verifyCompanyEmailOTP,
  updateCompanyProfile,
  SendJoinRequest,
  VerifyRequest,
  getAllCompanies,
} = require("../controllers/companyController");
const { verifyJwt } = require("../middlewares/jwtAuth");

const router = express.Router();

//Get all companies
router.get("/", verifyJwt, getAllCompanies);

// Register company (only for new companies)
router.post(
  "/register",
  verifyJwt,
  upload.any({ name: "companyLogo", maxCount: 1 }),
  registerCompany
);

// Verify email OTP
router.post("/verify-email-otp", verifyJwt, verifyCompanyEmailOTP);

// Update company profile (with email update handling)
router.put(
  "/update-company",
  verifyJwt,
  upload.any({ name: "companyLogo", maxCount: 1 }),
  updateCompanyProfile
);

router.post("/request-join", verifyJwt, SendJoinRequest);
router.post("/verify-employee", verifyJwt, VerifyRequest);

module.exports = router;

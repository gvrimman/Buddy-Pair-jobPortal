const express = require("express");
const { upload } = require("../middlewares/multer");

const { verifyJwt } = require("../middlewares/jwtAuth");
const {
  signup,
  VerifyEmailOTP,
  ResendEmailOTP,
  employerSignup,
  employeeSignup,
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
} = require("../controllers/auth/authController");
const {
  googleAuth,
  googleAuthCallback,
} = require("../controllers/auth/googleAuth");

const router = express.Router();

// refresh-token renewal
router.route("/refresh-token").post(renewalOfAccessToken);

// user sign up
router.route("/signup").post(signup);

router.route("/signup/verifyotp").post(VerifyEmailOTP);
router.route("/signup/resendotp").post(ResendEmailOTP);

router.route("/employee-signup").post(
  verifyJwt,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
  ]),
  employeeSignup
);

router.route("/employer-signup").post(
  verifyJwt,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "companyLogo", maxCount: 1 },
  ]),
  employerSignup
);

router.route("/employer-signup/v2").post(
  verifyJwt,
  upload.any({ name: "profileImage", maxCount: 1 }),
  employerSignupV2
);

// user sign in
router.route("/login").post(login);

// update user profile [employee]
router.route("/update-profile").put(
  verifyJwt,
  upload.any([
    { name: "resume", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
  ]),
  updateProfileInfo
);

// update user profile [employer]
router
  .route("/update-employer-profile")
  .put(
    verifyJwt,
    upload.any({ name: "profileImage", maxCount: 1 }),
    updateEmployerProfileInfo
  );
router.route("/update-employer-profile/verifyotp").post(VerifyCompanyEmailOTP);
router.route("/update-employer-profile/resendotp").post(ResendCompanyEmailOTP);

// user logout
router.route("/logout").post(verifyJwt, logout);

// update user password
router.route("/password").put(verifyJwt, updatePassword);

// forgot password
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);

// google authentication
router.route("/google").get(googleAuth);
router.route("/google/callback").get(googleAuthCallback);

module.exports = router;

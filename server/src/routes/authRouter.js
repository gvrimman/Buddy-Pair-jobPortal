const express = require("express");
const { upload } = require("../middlewares/multer");

const { verifyJwt, authorize } = require("../middlewares/jwtAuth");
const {
	signup,
	employerSignup,
	employeeSignup,
	login,
	updateProfileInfo,
	updatePassword,
	renewalOfAccessToken,
	logout,
	updateEmployerProfileInfo,
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

router.route("/employee-signup").post(
	upload.fields([
		{ name: "resume", maxCount: 1 },
		{ name: "profileImage", maxCount: 1 },
	]),
	verifyJwt,
	employeeSignup
);

router.route("/employer-signup").post(
	upload.fields([
		{ name: "profileImage", maxCount: 1 },
		{ name: "companyLogo", maxCount: 1 },
	]),
	verifyJwt,
	employerSignup
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
	authorize("employee"),
	updateProfileInfo
);

// update user profile [employer]
router
	.route("/update-employer-profile")
	.put(
		verifyJwt,
		upload.any({ name: "profileImage", maxCount: 1 }),
		authorize("employer"),
		updateEmployerProfileInfo
	);

// user logout
router.route("/logout").post(verifyJwt, logout);

// update user password
router.route("/password").put(verifyJwt, authorize("employee"), updatePassword);

// forgot password
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);

// google authentication
router.route("/google").get(googleAuth);
router.route("/google/callback").get(googleAuthCallback);

module.exports = router;

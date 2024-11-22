const express = require("express");
const { upload } = require("../middlewares/multer");

const { verifyJwt, authorize } = require("../middlewares/jwtAuth");
const {
	signup,
	employerSignup,
	employeeSignup,
	login,
	updateProfileInfo,
	updateAdditionalInfo,
} = require("../controllers/auth/authController");

const router = express.Router();

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

// update user profile
router
	.route("/update-profile")
	.put(
		verifyJwt,
		upload.any({ name: "profileImage", maxCount: 1 }),
		authorize("employee"),
		updateProfileInfo
	);

module.exports = router;

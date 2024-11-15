const express = require("express");
const { upload } = require("../middlewares/multer");
const {
	fresherSignup,
	employeeSignup,
	employerSignup,
} = require("../controllers/auth/signup");
const { login } = require("../controllers/auth/login");

const router = express.Router();

// user sign up
router.route("/fresher-signup").post(
	upload.fields([
		{ name: "resume", maxCount: 1 },
		{ name: "profileImage", maxCount: 1 },
	]),
	fresherSignup
);
router.route("/employee-signup").post(
	upload.fields([
		{ name: "resume", maxCount: 1 },
		{ name: "profileImage", maxCount: 1 },
	]),
	employeeSignup
);
router
	.route("/employer-signup")
	.post(
		upload.fields([{ name: "profileImage", maxCount: 1 }]),
		employerSignup
	);

// user sign in
router.route("/login").post(login);

module.exports = router;

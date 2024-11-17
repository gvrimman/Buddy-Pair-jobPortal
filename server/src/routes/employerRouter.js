const express = require("express");
const { postJob, getAllPostedJobs, deleteSingleJob } = require("../controllers/employerController");
const { verifyJwt, authorize } = require("../middlewares/jwtAuth");

const router = express.Router();

router.route("/post-job").post(verifyJwt, authorize("Employer"), postJob);
router
	.route("/get-posted-jobs")
	.get(verifyJwt, authorize("Employer"), getAllPostedJobs); // get all posted jobs by employer

	router.route("/")
router
	.route("/delete-job/:id")
	.delete(verifyJwt, authorize("Employer"), deleteSingleJob); // delete single job

module.exports = router;

const express = require("express");
const {
	postJob,
	getAllPostedJobs,
	deleteSingleJob,
	getJob,
	updateJob,
	getCandidates,
	getCandidate,
} = require("../controllers/employerController");
const { verifyJwt, authorize } = require("../middlewares/jwtAuth");

const router = express.Router();

router.route("/post-job").post(verifyJwt, authorize("Employer"), postJob);
router
	.route("/get-posted-jobs")
	.get(verifyJwt, authorize("Employer"), getAllPostedJobs); // get all posted jobs by employer

router
	.route("/job-update/:id")
	.put(verifyJwt, authorize("Employer"), updateJob); // update job by employer

router.route("/job/:id").get(verifyJwt, getJob); // get single job by id
router
	.route("/delete-job/:id")
	.delete(verifyJwt, authorize("Employer"), deleteSingleJob); // delete single job

router
	.route("/candidates")
	.get(verifyJwt, authorize("Employer"), getCandidates); // get all candidates

router.route("/candidate/:id").get(verifyJwt, authorize
	("Employer"), getCandidate); // get single candidate

module.exports = router;



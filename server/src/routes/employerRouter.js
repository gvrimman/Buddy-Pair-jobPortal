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

router.route("/post-job").post(verifyJwt, authorize("employer"), postJob);
router
	.route("/get-posted-jobs")
	.get(verifyJwt, authorize("employer"), getAllPostedJobs); // get all posted jobs by employer

router
	.route("/job-update/:id")
	.put(verifyJwt, authorize("employer"), updateJob); // update job by employer

router.route("/job/:id").get(verifyJwt, getJob); // get single job by id
router
	.route("/delete-job/:id")
	.delete(verifyJwt, authorize("employer"), deleteSingleJob); // delete single job

router
	.route("/candidates")
	.get(verifyJwt, authorize("employer"), getCandidates); // get all candidates

router.route("/candidate/:id").get(verifyJwt, authorize
	("employer"), getCandidate); // get single candidate

module.exports = router;



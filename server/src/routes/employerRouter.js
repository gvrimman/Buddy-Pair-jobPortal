const express = require("express");
const {
	postJob,
	getAllPostedJobs,
	deleteSingleJob,
	getJob,
	updateJob,
	getCandidates,
	getCandidate,
	getApplicants,
	getJobApplicants,
	acceptJob,
	rejectJob,
	acceptedJobs,
	rejectedJobs,
	getCompanies,
	getCompany,
} = require("../controllers/employerController");
const { verifyJwt, authorize } = require("../middlewares/jwtAuth");

const router = express.Router();

router.route("/post-job").post(verifyJwt, authorize("employer"), postJob); // post a job
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

router
	.route("/candidate/:id")
	.get(verifyJwt, authorize("employer"), getCandidate); // get single candidate

router
	.route("/applicants")
	.get(verifyJwt, authorize("employer"), getApplicants); // get all applicants for all jobs

router
	.route("/job-applicants/:id")
	.get(verifyJwt, authorize("employer"), getJobApplicants); // get all applicants for single job

router.route("/job-accept").post(verifyJwt, authorize("employer"), acceptJob); // accept a job application
router.route("/job-reject").post(verifyJwt, authorize("employer"), rejectJob); // accept a job application
router.route("/accepted-jobs").get(verifyJwt, authorize("employer"), acceptedJobs); // get all accepted jobs applicantions

router.route("/rejected-jobs").get(verifyJwt, authorize("employer"), rejectedJobs); // get all rejected jobs


router
	.route("/companies")
	.get(verifyJwt, authorize("employer", "employee"), getCompanies); // get all companies

	router.route("/company/:id").get(verifyJwt, authorize("employer", "employee"), getCompany); // get single company by id
module.exports = router;

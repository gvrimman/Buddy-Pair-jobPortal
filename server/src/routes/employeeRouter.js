const express = require("express");

const { verifyJwt, authorize } = require("../middlewares/jwtAuth");
const {
	getJobs,
	getJob,
	bookmarkJob,
	getBookmarkedJobs,
	deleteBookmarkedJob,
	applyJob,
    getAppliedJobs,
	deleteAppliedJob,
} = require("../controllers/employeeController");

const router = express.Router();

router.route("/jobs").get(verifyJwt, authorize("employee"), getJobs); // get all jobs by filter conditions
router.route("/job/:id").get(verifyJwt, authorize("employee"), getJob); // get single job by id
router
	.route("/bookmark-job/:id")
	.post(verifyJwt, authorize("employee"), bookmarkJob); // bookmark a job by id
router
	.route("/bookmark-job/:id")
	.delete(verifyJwt, authorize("employee"), deleteBookmarkedJob); // delete bookmarded job
router
	.route("/bookmarked-jobs")
	.get(verifyJwt, authorize("employee"), getBookmarkedJobs); // get all bookmarked jobs for user
router.route("/apply-job/:id").post(verifyJwt, authorize("employee"), applyJob); // apply a job

router.route("/delete-job/:id").delete(verifyJwt, authorize("employee"), deleteAppliedJob); // delete applied job

router
	.route("/applied-jobs")
	.get(verifyJwt, authorize("employee"), getAppliedJobs); // get all applied jobs for user
module.exports = router;

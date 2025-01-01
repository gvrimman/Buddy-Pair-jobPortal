const express = require("express");

const { verifyJwt } = require("../middlewares/jwtAuth");
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

router.route("/jobs").get(verifyJwt, getJobs); // get all jobs by filter conditions
router.route("/job/:id").get(verifyJwt, getJob); // get single job by id
router.route("/bookmark-job/:id").post(verifyJwt, bookmarkJob); // bookmark a job by id
router.route("/bookmark-job/:id").delete(verifyJwt, deleteBookmarkedJob); // delete bookmarded job
router.route("/bookmarked-jobs").get(verifyJwt, getBookmarkedJobs); // get all bookmarked jobs for user
router.route("/apply-job/:id").post(verifyJwt, applyJob); // apply a job

router.route("/delete-job/:id").delete(verifyJwt, deleteAppliedJob); // delete applied job

router.route("/applied-jobs").get(verifyJwt, getAppliedJobs); // get all applied jobs for user

module.exports = router;

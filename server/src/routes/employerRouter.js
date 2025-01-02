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
const { verifyJwt } = require("../middlewares/jwtAuth");

const router = express.Router();

router.route("/post-job").post(verifyJwt, postJob); // post a job
router.route("/get-posted-jobs").get(verifyJwt, getAllPostedJobs); // get all posted jobs by employer

router.route("/job-update/:id").put(verifyJwt, updateJob); // update job by employer

router.route("/job/:id").get(verifyJwt, getJob); // get single job by id
router.route("/delete-job/:id").delete(verifyJwt, deleteSingleJob); // delete single job

router.route("/candidates").get(verifyJwt, getCandidates); // get all candidates

router.route("/candidate/:id").get(verifyJwt, getCandidate); // get single candidate

router.route("/applicants").get(verifyJwt, getApplicants); // get all applicants for all jobs

router.route("/job-applicants/:id").get(verifyJwt, getJobApplicants); // get all applicants for single job

router.route("/job-accept").post(verifyJwt, acceptJob); // accept a job application
router.route("/job-reject").post(verifyJwt, rejectJob); // reject a job application
router.route("/accepted-jobs").get(verifyJwt, acceptedJobs); // get all accepted jobs applicantions

router.route("/rejected-jobs").get(verifyJwt, rejectedJobs); // get all rejected jobs

router.route("/companies").get(verifyJwt, getCompanies); // get all companies

router.route("/company/:id").get(verifyJwt, getCompany); // get single company by id

module.exports = router;

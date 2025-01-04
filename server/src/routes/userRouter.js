const express = require("express");
const { verifyJwt } = require("../middlewares/jwtAuth");
const {
  getProfile,
  getProfileByID,
  checkPreferenceStatus,
  getPreferences,
  updatePreferences,
  fetchMatchedJobs,
  getJobByID,
  fetchSimilarProfiles
} = require("../controllers/userController");

const router = express.Router();

router.route("/profile").get(verifyJwt, getProfile); // get profile
router.route("/profile/:id").get(verifyJwt, getProfileByID); // get profile
router.route("/preference/status").get(verifyJwt, checkPreferenceStatus); // check preference status
router
  .route("/preference")
  .get(verifyJwt, getPreferences)
  .post(verifyJwt, updatePreferences); // preference update/get
router.route("/findjobs").get(verifyJwt, fetchMatchedJobs);
router.route("/job/:id").get(verifyJwt, getJobByID);
router.route("/similarprofiles").get(verifyJwt, fetchSimilarProfiles);

module.exports = router;

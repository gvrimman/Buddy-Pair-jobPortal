const express = require("express");
const { verifyJwt } = require("../middlewares/jwtAuth");
const {
  getProfile,
  checkPreferenceStatus,
  getPreferences,
  updatePreferences,
  fetchMatchedJobs,
  fetchSimilarProfiles
} = require("../controllers/userController");

const router = express.Router();

router.route("/profile").get(verifyJwt, getProfile); // get profile
router.route("/preference/status").get(verifyJwt, checkPreferenceStatus); // check preference status
router
  .route("/preference")
  .get(verifyJwt, getPreferences)
  .post(verifyJwt, updatePreferences); // preference update/get
router.route("/findjobs").get(verifyJwt, fetchMatchedJobs);
router.route("/similarprofiles").get(verifyJwt, fetchSimilarProfiles);

module.exports = router;

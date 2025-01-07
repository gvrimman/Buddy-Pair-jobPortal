const express = require("express");
const {
  GenerateReferralToken,
  TrackReferralToken,
  GetRefTokenProgress,
} = require("../controllers/referrralController");
const { verifyJwt } = require("../middlewares/jwtAuth");

const router = express.Router();

router.post("/generate", verifyJwt, GenerateReferralToken);
router.post("/track", verifyJwt, TrackReferralToken);
router.get("/progress", verifyJwt, GetRefTokenProgress);

module.exports = router;

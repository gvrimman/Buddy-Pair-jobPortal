const express = require("express");
const {
  GenerateReferralToken,
  TrackReferralToken,
  GetRefTokenProgress,
  GetadminSettings,
  UpdateadminSettings,
} = require("../controllers/referrralController");
const { verifyJwt } = require("../middlewares/jwtAuth");

const router = express.Router();

router.post("/generate", verifyJwt, GenerateReferralToken);
router.post("/track", verifyJwt, TrackReferralToken);
router.get("/progress", verifyJwt, GetRefTokenProgress);

router.get("/admin/settings", verifyJwt, GetadminSettings);
router.put("/admin/settings", verifyJwt, UpdateadminSettings);

module.exports = router;

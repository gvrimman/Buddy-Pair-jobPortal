const express = require("express");
const { postJob } = require("../controllers/employerController");
const { verifyJwt, authorize } = require("../middlewares/jwtAuth");

const router = express.Router();

router.route("/post-job").post(verifyJwt, authorize("employer"), postJob);

module.exports = router;

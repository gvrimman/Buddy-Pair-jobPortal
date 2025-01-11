const express = require("express");
const { SendContactForm } = require("../controllers/contactController");
const { verifyJwt } = require("../middlewares/jwtAuth");
const router = express.Router();

router.post("/", verifyJwt, SendContactForm);

module.exports = router;

const express = require("express");
const { SendContactForm } = require("../controllers/contactController");
const router = express.Router();

router.post("/", SendContactForm);

module.exports = router;

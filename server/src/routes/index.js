const express = require("express");
const authRoutes = require("./authRouter");
const emplyerRoutes = require("./employerRouter")
const router = express.Router();

// all routes
router.use("/auth", authRoutes);
router.use("/employer", emplyerRoutes);

module.exports = router;

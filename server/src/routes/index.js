const express = require("express");
const authRoutes = require("./authRouter");
const emplyerRoutes = require("./employerRouter")
const emplyeeRoutes = require("./employeeRouter");
const router = express.Router();

// all routes
router.use("/auth", authRoutes);
router.use("/employer", emplyerRoutes);
router.use("/employee", emplyeeRoutes);

module.exports = router;

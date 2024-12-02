const express = require("express");
const authRoutes = require("./authRouter");
const emplyerRoutes = require("./employerRouter")
const emplyeeRoutes = require("./employeeRouter");
const messageRoutes = require("./messageRouter");
const notificationRoutes = require("./notificationRouter");
const router = express.Router();

// all routes
router.use("/auth", authRoutes);
router.use("/employer", emplyerRoutes);
router.use("/employee", emplyeeRoutes);
router.use("/message", messageRoutes);
router.use("/notification", notificationRoutes);

module.exports = router;

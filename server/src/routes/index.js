const express = require("express");
const authRoutes = require("./authRouter");
const emplyerRoutes = require("./employerRouter")
const emplyeeRoutes = require("./employeeRouter");
const userRouter = require("./userRouter");
const messageRoutes = require("./messageRouter");
const notificationRoutes = require("./notificationRouter");
const referralRouter = require("./referralRouter");
const contactRoutes = require("./contactRouter");
const router = express.Router();

// all routes
router.use("/auth", authRoutes);
router.use("/employer", emplyerRoutes);
router.use("/employee", emplyeeRoutes);
router.use("/user", userRouter);
router.use("/message", messageRoutes);
router.use("/notification", notificationRoutes);
router.use("/referral", referralRouter);
router.use("/contact", contactRoutes);

module.exports = router;

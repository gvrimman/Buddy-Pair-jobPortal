const express = require("express");
const { verifyJwt, authorize } = require("../middlewares/jwtAuth");
const { getAllNotifications, getAllUnreadNotifications, markReadNotification } = require("../controllers/notificationController");


const router = express.Router();

router.route("/").get(verifyJwt, getAllNotifications);
router.route("/unread").get(verifyJwt, getAllUnreadNotifications);
router.route("/mark-read/:id").put(verifyJwt, markReadNotification);


module.exports = router;
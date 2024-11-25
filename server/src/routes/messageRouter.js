const express = require("express");

const { verifyJwt, authorize } = require("../middlewares/jwtAuth");
const {
	getMessages,
	sendMessage,
	getUserUnreadMessages,
	markMessageAsRead,
	markAllMessageAsRead,
	getOtherUsers,
} = require("../controllers/messageController");

const router = express.Router();

router.route("/other-users").get(verifyJwt, getOtherUsers);
router.route("/:id").get(verifyJwt, getMessages);
router.route("/send/:id").post(verifyJwt, sendMessage);
router.route("/:id/unread").get(verifyJwt, getUserUnreadMessages);

router.route("/:id/read").post(verifyJwt, markMessageAsRead);
router.route("/read").post(verifyJwt, markAllMessageAsRead);

/* 
router.get("/:id", getMessages);
router.post("/send/:id", sendMessage);
router.get("/:id/unread", getUserUnreadMessages);

router.post("/:id/read", markMessageAsRead);
router.post("/read", markAllMessageAsRead);


*/

module.exports = router;

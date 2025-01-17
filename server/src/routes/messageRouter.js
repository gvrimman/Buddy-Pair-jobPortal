const express = require("express");

const { verifyJwt } = require("../middlewares/jwtAuth");
const {
  getMessages,
  sendMessage,
  getUserUnreadMessages,
  markMessageAsRead,
  markAllMessageAsRead,
  getOtherUsers,
  createConversation,
  getConversation,
  getAllConversation,
} = require("../controllers/messageController");

const router = express.Router();

router.route("/other-users").get(verifyJwt, getOtherUsers);
router.route("/:id").get(verifyJwt, getMessages);
router.route("/send/:id").post(verifyJwt, sendMessage);
router.route("/:id/unread").get(verifyJwt, getUserUnreadMessages);

router.route("/:id/read").post(verifyJwt, markMessageAsRead);
router.route("/read").post(verifyJwt, markAllMessageAsRead);

//Chat updated routes
router.route("/create").post(verifyJwt, createConversation);
router.route("/chat/all").get(verifyJwt, getAllConversation);
router.route("/chat/:id").get(verifyJwt, getConversation);

/* 
router.get("/:id", getMessages);
router.post("/send/:id", sendMessage);
router.get("/:id/unread", getUserUnreadMessages);

router.post("/:id/read", markMessageAsRead);
router.post("/read", markAllMessageAsRead);


*/

module.exports = router;

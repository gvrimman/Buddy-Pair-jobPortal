const mongoose = require("mongoose");
const Conversation = require("../models/conversation");
const JobPortal = require("../models/jobportal");
const Message = require("../models/message");
const { getReceiverSocketId } = require("../socket/socket");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/user");

// get messages from user
const getMessages = asyncHandler(async (req, res) => {
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  if (
    !mongoose.Types.ObjectId.isValid(receiverId) ||
    !mongoose.Types.ObjectId.isValid(senderId)
  ) {
    throw new ApiError(400, "Invalid Sender or Reciever Id");
  }

  const conversation = await Conversation.findOne({
    participants: {
      $all: [senderId, receiverId],
    },
  }).populate("messages");

  const messages = conversation.messages;

  res.json(new ApiResponse(200, messages, "messages"));
});

const sendMessage = asyncHandler(async (req, res) => {
  const { id: receiver } = req.params;
  const senderId = req.user._id;
  const { message, chatId: chatRoom } = req.body;

  if (!receiver || typeof receiver !== "string") {
    throw new ApiError(400, "Invalid receiver ID");
  }

  const receiverId = new mongoose.Types.ObjectId(receiver);

  if (!message) {
    throw new ApiError(400, "Message content is required");
  }

  if (
    !mongoose.Types.ObjectId.isValid(receiverId) ||
    !mongoose.Types.ObjectId.isValid(senderId)
  ) {
    throw new ApiError(400, "Invalid Sender or Reciever Id");
  }

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = new Conversation({
      participants: [senderId, receiverId],
    });
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    message,
    chatRoom,
  });

  if (newMessage) {
    conversation.messages.push(newMessage._id);
  }

  const recipient = await JobPortal.findOne({ userId: receiverId });

  recipient.unreadMessages.push(newMessage?._id);
  await recipient.save();

  // this will help to run parallel
  await Promise.all([conversation.save(), newMessage.save()]);

  //Socket IO Functionality here:
  const receiverSocketId = getReceiverSocketId(receiverId);

  if (receiverSocketId) {
    // io.to(<socket_id) emit() is used to send events to specific client.
    io.to(receiverSocketId).emit("newMessage", newMessage);

    io.to(receiverSocketId).emit("getNotification", newMessage);
  }

  res.json(new ApiResponse(200, newMessage, "message sent"));
});

const getUserUnreadMessages = asyncHandler(async (req, res) => {
  const receiverId = req.user._id;

  if (!receiverId) {
    throw new ApiError(400, "User Not Found");
  }

  if (!mongoose.Types.ObjectId.isValid(receiverId)) {
    throw new ApiError(400, "Invalid User Id");
  }

  const user = await JobPortal.findOne({ userId: receiverId })
    .populate("unreadMessages")
    .select("unreadMessages");

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  res.json(
    new ApiResponse(200, { unread: user.unreadMessages }, "unread messages")
  );
});

const markMessageAsRead = asyncHandler(async (req, res) => {
  const { id: senderId } = req.params;
  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(400, "User Not Found");
  }

  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(senderId)
  ) {
    throw new ApiError("400", "Invalid Id");
  }

  const user = await JobPortal.findOne({ userId: userId })
    .populate("unreadMessages")
    .select("unreadMessages");

  if (!user) {
    throw new ApiError("400", "User Not Found");
  }

  const filteredMessages = user.unreadMessages?.filter(
    (message) => message.senderId.toString() !== senderId
  );

  user.unreadMessages = filteredMessages;
  await user.save();

  res.json(
    new ApiResponse(200, { unread: filteredMessages }, "unread messages")
  );
});

const markAllMessageAsRead = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(400, "User Not Found");
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid Id");
  }

  const user = await JobPortal.findOne({ userId: userId })
    .populate("unreadMessages")
    .select("unreadMessages");

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  user.unreadMessages = [];
  await user.save();

  res.json(
    new ApiResponse(200, { unread: user.unreadMessages }, "unread messages")
  );
});

const getOtherUsers = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const users = await JobPortal.find({ userId: { $ne: userId } }).populate(
    "userId"
  );
  res.json(new ApiResponse(200, users, "other users"));
});

//new chat handling methods
const createConversation = asyncHandler(async (req, res) => {
  const { id: receiverId } = req.body;
  const senderId = req.user._id;

  if (
    !mongoose.Types.ObjectId.isValid(receiverId) ||
    !mongoose.Types.ObjectId.isValid(senderId)
  ) {
    throw new ApiError(400, "Invalid Sender or Receiver Id");
  }

  const conversation = await Conversation.findOne({
    participants: {
      $all: [senderId, receiverId],
    },
  });

  if (conversation) {
    return res.json(new ApiResponse(300, null, "Conversation with this user is already exist"));
  }

  const newConversation = await new Conversation({
    participants: [senderId, receiverId],
  }).save();

  res.json(new ApiResponse(200, newConversation, "conversation created"));
});

const getConversation = asyncHandler(async (req, res) => {
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  if (
    !mongoose.Types.ObjectId.isValid(receiverId) ||
    !mongoose.Types.ObjectId.isValid(senderId)
  ) {
    throw new ApiError(400, "Invalid Sender or Receiver Id");
  }

  const conversation = await Conversation.findOne({
    participants: {
      $all: [senderId, receiverId],
    },
  }).populate("participants");

  if (!conversation) {
    throw new ApiError(400, "Conversation with this user is not found");
  }

  res.json(new ApiResponse(200, conversation));
});

const getAllConversation = asyncHandler(async (req, res) => {
  const senderId = req.user._id;
  let fetchQuery = { participants: { $in: [senderId] } };

  const requester = await User.findById(senderId).populate("apps.jobPortal");

  if (!requester) {
    throw new ApiError(400, "Requester not found");
  }

  if (
    requester?.apps?.jobPortal &&
    requester?.apps?.jobPortal.role === "employee"
  ) {
	fetchQuery.initiated = true;
  }

  const conversations = await Conversation.find(fetchQuery)
    .populate({
      path: "participants",
      populate: {
        path: "apps.jobPortal", 
        model: "JobPortal", 
      },
    })
    .sort({ updatedAt: -1 });

  const formattedConversation = await Promise.all(
    conversations.map(async (conversation) => {
      const otherParticipant = conversation.participants.find(
        (p) => p._id.toString() !== senderId.toString()
      );
 
	  if(!otherParticipant) return;

      const lastMessage = await Message.findOne({ chatRoom: conversation._id })
        .sort({ timestamp: -1, _id: -1 })
        .lean();

      return {
        chatId: conversation._id,
        userId: otherParticipant?._id || "",
        user: {
          _id: otherParticipant?._id || "",
          username: otherParticipant?.username || "",
          profilePic: otherParticipant?.apps?.jobPortal?.profileImage || "",
        },
        lastMessage: {
          text: lastMessage ? lastMessage.content : "No messages yet",
          read: lastMessage
            ? lastMessage.senderId.toString() === senderId.toString()
              ? true
              : lastMessage.read
            : true,
          timestamp: lastMessage ? lastMessage.createdAt : null,
        },
        isNew: Boolean(!lastMessage),
      };
    })
  );

  res.json(new ApiResponse(200, formattedConversation.filter(con=>con)));
});

module.exports = {
  getMessages,
  sendMessage,
  getUserUnreadMessages,
  markMessageAsRead,
  markAllMessageAsRead,
  getOtherUsers,
  createConversation,
  getConversation,
  getAllConversation,
};

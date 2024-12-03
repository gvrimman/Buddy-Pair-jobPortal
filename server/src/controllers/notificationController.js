const Notification = require("../models/notification");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

// get all notifications
const getAllNotifications = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const notifications = await Notification.find({ receiverId: userId })
		.sort({
			createdAt: -1,
		})
		.populate({
			path: "senderId",
			select: "username apps.jobPortal",
			populate: {
				path: "apps.jobPortal",
				select: "profileImage",
			},
		});
	if (!notifications) {
		throw new ApiError(400, "notifications not found");
	}
	res.json(new ApiResponse(200, notifications, "all notifications"));
});

// get all unread notifications
const getAllUnreadNotifications = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const unreadNotifications = await Notification.find({
		receiverId: userId,
		isRead: false,
	}).sort({
		createdAt: -1,
	});

	if (!unreadNotifications) {
		throw new ApiError(400, "unread notifications not found");
	}

	res.json(
		new ApiResponse(200, unreadNotifications, "all unread notifications")
	);
});

// mare as read a notification
const markReadNotification = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const notification = await Notification.findById(id);
	if (!notification) {
		throw new ApiError(400, "notification not found");
	}

	notification.isRead = true;
	await notification.save();

	res.json(new ApiResponse(200, notification, "notification marked as read"));
});

module.exports = {
	getAllNotifications,
	getAllUnreadNotifications,
	markReadNotification,
};

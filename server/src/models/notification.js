const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
	{
		senderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		receiverId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		link: {
			type: String,
		},
		isRead: {
			type: Boolean,
			required: true,
			default: false,
		},

	},
	{ timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;

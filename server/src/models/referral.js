const mongoose = require("mongoose");

const referralCodeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  referralCode: { type: String, unique: true },
  type: String, // "free_course" or "discount"
  referrals: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users referred
  totalReferrals: { type: Number, default: 0 },
});

module.exports = mongoose.model("ReferralCode", referralCodeSchema);

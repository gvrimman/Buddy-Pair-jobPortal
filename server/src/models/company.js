const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  website: { type: String, required: true, unique: true },
  emailVerified: { type: Boolean, default: false },
  unVerifiedEmail: { type: String },
  industry: { type: String, required: true },
  location: { type: String },
  address: { type: String },
  workType: { type: String },
  description: { type: String },
  size: { type: String },
  logo: { type: String },
  linkedin: { type: String },
  emailVerifyOTP: { type: String },
  emailOTPExpire: { type: Date },
  status: {
    type: String,
    enum: ["pending", "verified", "rejected"],
    default: "pending",
  },
  jobs: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Job",
    default: [],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Company", companySchema);

const mongoose = require("mongoose");

const adminSettingsSchema = new mongoose.Schema({
  activeReferralType: { type: String, default: null }, // "free_course", "discount", or null
  maxDiscount: { type: Number, default: 10 },
  discountPerReferral: { type: Number, default: 5000 },
  freeCourseTarget: { type: Number, default: 200 },
  courses: [
    {
      name: String,
      duration: String,
      price: Number,
      description: String,
    },
  ],
});

module.exports = mongoose.model("AdminConfig", adminSettingsSchema);

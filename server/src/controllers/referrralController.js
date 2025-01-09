const User = require("../models/user");
const Referral = require("../models/referral");
const AdminConfig = require("../models/AdminConfig");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const GenerateReferralToken = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const adminConfig = await AdminConfig.findOne();

  if (!adminConfig || !adminConfig.activeReferralType) {
    return res.status(400).json({ message: "Referral system is not active" });
  }
  const existingCode = await Referral.findOne({
    userId,
    type: adminConfig.activeReferralType,
  });

  if (existingCode)
    return res.status(400).json({ message: "Referral code already exists" });

  const referralCode = `REF${Math.random()
    .toString(36)
    .substr(2, 8)
    .toUpperCase()}`;

  const newCode = await Referral.create({
    userId,
    referralCode,
    type: adminConfig.activeReferralType,
    referrals: [],
  });

  res.json({ referralCode: newCode.referralCode });
});

const TrackReferralToken = asyncHandler(async (req, res) => {
  const { referralCode } = req.body;
  const referredUserId = req.user._id;
  
  const adminConfig = await AdminConfig.findOne();

  if (!adminConfig || !adminConfig.activeReferralType) {
    return res.status(400).json({ message: "Referral system is not active" });
  }
  
  const referrer = await Referral.findOne({ referralCode });
  
  if (!referrer)
  return res.status(404).json({ message: "Invalid referral code" });

  if (referrer.userId.toString() === referredUserId.toString()) {
    return res.status(400).json({ message: "Self-referral is not allowed" });
  }

  if (referrer.referrals.includes(referredUserId.toString())) {
    return res.status(400).json({ message: "Referral already tracked" });
  }

  // Check if the user has already been referred by someone else
  const existingReferral = await Referral.findOne({
    referrals: referredUserId.toString(),
  });
  if (existingReferral) {
    return res
      .status(400)
      .json({ message: "User has already been referred by another user" });
  }

  if (referrer.type !== adminConfig.activeReferralType) {
    return res.status(400).json({ message: "Referral code is inactive" });
  }
  
  referrer.referrals.push(referredUserId);
  referrer.totalReferrals += 1;
  await referrer.save();

  if (referrer.type === "free_course" && referrer.totalReferrals >= 200) {
    const user = await User.findById(referrer.userId);
    user.eligibleCourses = (await AdminConfig.findOne()).courses.map(
      (course) => course.name
    );
    await user.save();
  }
  res.json({ message: "Referral tracked successfully" });
});

const GetRefTokenProgress = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const userData = await User.findById(userId);
    const adminConfig = await AdminConfig.findOne();

    if (!adminConfig || !adminConfig.activeReferralType) {
      return res.status(400).json({ message: "Referral system is not active" });
    }

    // Fetch the referral data
    const referral = await Referral.findOne({
      userId,
      type: adminConfig.activeReferralType,
    })
      .populate("referrals", "username email") // Populate referred users' basic info
      .exec();

    if (!referral) {
      return res.status(404).json({ message: "No referral data found" });
    }

    res.json({
      referralCode: referral.referralCode,
      referrals: referral.referrals,
      settings: {
        activeReferralType: adminConfig.activeReferralType,
        maxDiscount: adminConfig.maxDiscount,
        discountPerReferral: adminConfig.discountPerReferral,
        freeCourseTarget: adminConfig.freeCourseTarget,
        courses: adminConfig.courses,
        eligibleCourses: userData.eligibleCourses,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

const GetadminSettings = asyncHandler(async (req, res) => {
  const settings = await AdminConfig.findOne();
  res.json(settings);
});

const UpdateadminSettings = asyncHandler(async (req, res) => {
  const updatedSettings = await AdminConfig.findOneAndUpdate({}, req.body, {
    new: true,
    upsert: true,
  });
  res.json(updatedSettings);
});


module.exports = {
  GenerateReferralToken,
  TrackReferralToken,
  GetRefTokenProgress,
  GetadminSettings,
  UpdateadminSettings,
};

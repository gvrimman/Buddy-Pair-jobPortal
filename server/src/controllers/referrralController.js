const User = require("../models/user");
const Referral = require("../models/referral");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const GenerateReferralToken = asyncHandler(async (req, res) => {
  const { type } = req.body;

  if (!["discount200Users", "courseReduction"].includes(type)) {
    return res.status(400).json({ error: "Invalid referral type." });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found." });

    user.referralType = type;
    await user.save();

    const referralLink = `${process.env.CLIENT_URL}/referral?referrer=${user._id}&type=${type}`;
    res.json({ referralLink });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate referral link." });
  }
});

const TrackReferralToken = asyncHandler(async (req, res) => {
    const { referrer, type } = req.query;
    const { refereeEmail } = req.body;

    try {
      const referrerUser = await User.findById(referrer);
      if (!referrerUser || referrerUser.referralType !== type) {
        return res
          .status(400)
          .json({ error: "Invalid referrer or referral type." });
      }

      const refereeUser = await User.findOne({ email: refereeEmail });
      if (!refereeUser) {
        return res.status(404).json({ error: "Referee not found." });
      }

      const existingReferral = await Referral.findOne({
        referrer,
        referee: refereeUser.id,
      });
      if (existingReferral) {
        return res.status(400).json({ error: "Referral already tracked." });
      }

      await Referral.create({ referrer, referee: refereeUser.id, type });
      referrerUser.referredCount += 1;

      // Update discount or reward
      if (type === "courseReduction") {
        referrerUser.discountAmount = Math.min(
          referrerUser.referredCount * 5000,
          50000
        );
      } else if (
        type === "discount200Users" &&
        referrerUser.referredCount >= 200
      ) {
        referrerUser.rewardEarned = true;
      }

      await referrerUser.save();
      res.json({ message: "Referral tracked successfully." });
    } catch (err) {
      res.status(500).json({ error: "Failed to track referral." });
    }
});

const GetRefTokenProgress = asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ error: "User not found." });

      const referrals = await Referral.find({ referrer: user.id });
      res.json({
        referralType: user.referralType,
        referredCount: user.referredCount,
        referrals,
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch referral progress." });
    }
});

module.exports = {
  GenerateReferralToken,
  TrackReferralToken,
  GetRefTokenProgress,
};

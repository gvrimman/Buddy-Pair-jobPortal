import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";

const ReferralDashboard = () => {
  const [referralLink, setReferralLink] = useState("");
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateReferralLink = async (type) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/referral/generate", { type });
      setReferralLink(response.data.referralLink);
    } catch (error) {
      alert("Failed to generate referral link.");
    }
    setLoading(false);
  };

  const fetchProgress = async () => {
    try {
      const response = await axiosInstance.get("/referral/progress");
      setProgress(response.data);
    } catch (error) {
      alert("Failed to fetch referral progress.");
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Referral Dashboard
        </h1>

        {/* Generate Referral Link Section */}
        <div className="mb-6">
          <button
            onClick={() => generateReferralLink("discount200Users")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition mr-4"
          >
            Generate 200 Users Discount Link
          </button>
          <button
            onClick={() => generateReferralLink("courseReduction")}
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
          >
            Generate Course Reduction Link
          </button>
        </div>

        {/* Referral Link */}
        {loading && <p className="text-gray-500">Generating link...</p>}
        {referralLink && (
          <div className="bg-gray-50 p-4 rounded-lg shadow border">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Your Referral Link:
            </h3>
            <p className="text-gray-600 break-all">{referralLink}</p>
          </div>
        )}

        {/* Referral Progress */}
        {progress && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow border">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Referral Progress
            </h3>
            <p className="text-gray-600">
              <span className="font-semibold">Type:</span>{" "}
              {progress.referralType}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Referred Count:</span>{" "}
              {progress.referredCount}
            </p>

            {/* Referral List */}
            <ul className="mt-4 space-y-2">
              {progress.referrals.map((ref) => (
                <li
                  key={ref._id}
                  className="bg-white p-2 rounded-lg shadow border"
                >
                  Referred User ID: {ref.referee}
                </li>
              ))}
            </ul>

            {/* Rewards Section */}
            {progress.referralType === "discount200Users" &&
              progress.referredCount >= 200 && (
                <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition">
                  Claim Reward
                </button>
              )}
            {progress.referralType === "courseReduction" && (
              <p className="mt-4 text-green-700 font-semibold">
                Discount Earned: ₹{progress.discountAmount}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferralDashboard;

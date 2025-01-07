import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";

const ProfileSection = () => {
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get("/referral/progress");
      setProfile(response.data);
    } catch (error) {
      alert("Failed to fetch profile details.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile</h1>

        {profile ? (
          <div className="bg-gray-50 p-4 rounded-lg shadow border">
            <p className="text-gray-600">
              <span className="font-semibold">Active Referral Type:</span>{" "}
              {profile.referralType}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Referred Count:</span>{" "}
              {profile.referredCount}
            </p>

            {/* Progress */}
            {profile.referralType === "discount200Users" &&
              profile.referredCount >= 200 && (
                <p className="text-green-600 mt-2 font-semibold">
                  Reward Available: Claim your course selection!
                </p>
              )}
            {profile.referralType === "courseReduction" && (
              <p className="text-green-600 mt-2 font-semibold">
                Discount Earned: ₹{profile.discountAmount}
              </p>
            )}

            {/* Referral List */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Referrals
              </h3>
              <ul className="space-y-2">
                {profile.referrals.map((ref) => (
                  <li
                    key={ref._id}
                    className="bg-white p-2 rounded-lg shadow border"
                  >
                    Referred User ID: {ref.referee}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;

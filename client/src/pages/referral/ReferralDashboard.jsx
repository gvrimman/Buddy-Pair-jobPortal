import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";
import ShareLink from "./ShareLink";


function ReferralDashboard() {
  const [referralCode, setReferralCode] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    // Fetch referral data
    const fetchReferralData = async () => {
      const { data } = await axios.get("referral/progress");
      setReferralCode(data.referralCode);
      setReferrals(data.referrals);
      setSettings(data.settings);
    };
    fetchReferralData();
  }, []);

  const generateCode = async () => {
    const { data } = await axios.post("referral/generate");
    setReferralCode(data.referralCode);
  };

  return (
    <div className="container mx-auto p-4 max-w-[900px] w-full flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold text-gray-700">Referral Program</h1>
      {!referralCode ? (
        <button
          className="mt-4 px-4 py-2 bg-theme-500 text-white rounded"
          onClick={generateCode}
        >
          Generate Referral Code
        </button>
      ) : (
        <ShareLink referralCode={referralCode} />
      )}

      <h2 className="text-xl font-bold mt-6 text-gray-700">Referred Users</h2>
      <ul>
        {referrals.map((ref) => (
          <li className="text-gray-700" key={ref.id}>
            {ref.username}
          </li>
        ))}
      </ul>

      {settings?.activeReferralType === "free_course" && (
        <div className="mt-6">
          <h2 className="text-xl font-bold text-gray-700">
            Eligible for Free Courses
          </h2>
          {settings?.eligibleCourses?.length > 0 ? (
            <select className="border p-2 rounded">
              {settings?.eligibleCourses.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-gray-700">
              Reach 200 referrals to unlock free courses.
            </p>
          )}
        </div>
      )}

      {settings?.activeReferralType === "discount" && (
        <div className="mt-6">
          <h2 className="text-xl font-bold text-gray-700">Course Discounts</h2>
          {settings?.courses.map((course) => (
            <div
              key={course.name}
              className="p-4 border rounded mb-4 text-gray-700"
            >
              <h3 className="text-lg font-bold">{course.name}</h3>
              <p>Duration: {course.duration}</p>
              <p>Original Price: ₹{course.price}</p>
              <p>
                Discounted Price: ₹
                {Math.max(
                  course.price -
                    referrals.length * settings.discountPerReferral,
                  course.price -
                    settings.maxDiscount * settings.discountPerReferral
                )}
              </p>
              <button className="mt-2 px-4 py-2 bg-theme-500 text-white rounded">
                Buy Course
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReferralDashboard;

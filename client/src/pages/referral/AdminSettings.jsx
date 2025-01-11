import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";

function AdminSettings() {
  const [settings, setSettings] = useState({
    activeReferralType: null,
    maxDiscount: 10,
    discountPerReferral: 5000,
    freeCourseTarget: 200,
    courses: [],
  });

  const fetchSettings = async () => {
    const { data } = await axios.get("referral/admin/settings");
    setSettings(data);
  };

  const updateSettings = async () => {
    await axios.put("referral/admin/settings", settings);
    alert("Settings updated successfully");
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-[900px] w-full flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Admin Referral Settings</h1>
      <div className="mt-4">
        <label className="block font-bold">Referral Type</label>
        <select
          value={settings?.activeReferralType}
          onChange={(e) =>
            setSettings({ ...settings, activeReferralType: e.target.value })
          }
          className="border p-2 rounded"
        >
          <option value="">None</option>
          <option value="free_course">Free Course</option>
          <option value="discount">Discount</option>
        </select>
      </div>

      <div className="mt-4">
        <label className="block font-bold">Max Discount</label>
        <input
          type="number"
          value={settings?.maxDiscount}
          onChange={(e) =>
            setSettings({ ...settings, maxDiscount: +e.target.value })
          }
          className="border p-2 rounded"
        />
      </div>

      <div className="mt-4">
        <label className="block font-bold">Discount Per Referral</label>
        <input
          type="number"
          value={settings?.discountPerReferral}
          onChange={(e) =>
            setSettings({ ...settings, discountPerReferral: +e.target.value })
          }
          className="border p-2 rounded"
        />
      </div>

      <div className="mt-4">
        <label className="block font-bold">Free Course Target</label>
        <input
          type="number"
          value={settings?.freeCourseTarget}
          onChange={(e) =>
            setSettings({ ...settings, freeCourseTarget: +e.target.value })
          }
          className="border p-2 rounded"
        />
      </div>

      <div className="mt-4">
        <label className="block font-bold">Courses</label>
        <textarea
          value={JSON.stringify(settings?.courses, null, 2)}
          onChange={(e) =>
            setSettings({ ...settings, courses: JSON.parse(e.target.value) })
          }
          className="border p-2 rounded w-full h-48"
        />
      </div>

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={updateSettings}
      >
        Update Settings
      </button>
    </div>
  );
}

export default AdminSettings;

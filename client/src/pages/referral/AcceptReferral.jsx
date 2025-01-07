import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axios";

const AcceptReferral = () => {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Extract query parameters
  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return {
      referrer: params.get("referrer"),
      type: params.get("type"),
    };
  };

  const validateReferral = async (referrer, type) => {
    try {
      const validTypes = ["discount200Users", "courseReduction"];
      if (!validTypes.includes(type)) {
        throw new Error("Invalid referral type.");
      }

      const response = await axiosInstance.post("/referral/validate", {
        referrer,
        type,
      });
      setStatus(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Something went wrong."
      );
    }
  };

  useEffect(() => {
    const { referrer, type } = getQueryParams();

    if (!referrer || !type) {
      setError("Missing required query parameters.");
      return;
    }

    validateReferral(referrer, type);
  }, [location]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Referral Status
        </h1>

        {/* Loading Indicator */}
        {!status && !error && (
          <p className="text-center text-gray-500">Validating referral...</p>
        )}

        {/* Error Handling */}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        {/* Referral Status */}
        {status && (
          <div className="bg-green-100 text-green-700 p-4 rounded-lg">
            <p>
              <span className="font-semibold">Referrer:</span> {status.referrer}
            </p>
            <p>
              <span className="font-semibold">Type:</span> {status.type}
            </p>
            <p>
              <span className="font-semibold">Status:</span> {status.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcceptReferral;

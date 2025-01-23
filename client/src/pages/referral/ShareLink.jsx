import React, { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaWhatsapp, FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import QRCode from "qrcode";

const ShareLink = ({ referralCode }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const referralLink = `${import.meta.env.VITE_CLIENT_URL}/job-portal/referral/?code=${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied to clipboard!");
  };

  useEffect(() => {
    QRCode.toDataURL(referralLink, { width: 200 }, (err, url) => {
      if (err) {
        console.error("Error generating QR Code", err);
        return;
      }
      setQrCodeUrl(url);
    });
  }, [referralLink]);

  const downloadQRCode = () => {
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = "referral-qr-code.png";
    link.click();
  };

  const shareToSocialMedia = (platform) => {
    const encodedLink = encodeURIComponent(referralLink);
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedLink}&text=Join%20our%20platform%20using%20my%20referral%20code!`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=Join%20our%20platform%20using%20my%20referral%20code!%20${encodedLink}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-gray-700">Referral Program</h3>
      <p className="mt-4 text-gray-600">
        Share your referral code and link with friends to earn rewards!
      </p>

      <div className="mt-6">
        <p className="text-lg font-medium text-gray-700">Your Referral Code:</p>
        <div className="flex items-center mt-2 bg-gray-100 p-2 rounded-lg">
          <strong className="text-xl text-theme-500">{referralCode}</strong>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-lg font-medium text-gray-700">Your Referral Link:</p>
        <div className="flex items-center mt-2 bg-gray-100 p-2 rounded-lg">
          <span className="text-gray-600 text-xs overflow-hidden text-ellipsis">
            {referralLink}
          </span>
          <button
            className="ml-auto px-3 py-1 bg-theme-500 text-white rounded-lg hover:bg-theme-600 flex items-center"
            onClick={copyToClipboard}
          >
            <FaCopy className="m-1" />
          </button>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-lg font-medium text-gray-700">Just Scan:</p>
        <div className="mt-2 flex justify-center bg-white p-4 rounded-lg shadow-md">
          {qrCodeUrl ? (
            <img src={qrCodeUrl} alt="Referral QR Code" />
          ) : (
            <p>Loading QR Code...</p>
          )}
        </div>
        <button
          className="mt-4 px-4 py-2 bg-theme-500 text-white rounded-lg hover:bg-theme-600"
          onClick={downloadQRCode}
        >
          Download QR Code
        </button>
      </div>

      <div className="mt-6">
        <p className="text-lg font-medium text-gray-700">Share on:</p>
        <div className="flex space-x-4 mt-4">
          <button
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            onClick={() => shareToSocialMedia("facebook")}
          >
            <FaFacebook size={20} />
          </button>
          <button
            className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500"
            onClick={() => shareToSocialMedia("twitter")}
          >
            <FaTwitter size={20} />
          </button>
          <button
            className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
            onClick={() => shareToSocialMedia("whatsapp")}
          >
            <FaWhatsapp size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareLink;

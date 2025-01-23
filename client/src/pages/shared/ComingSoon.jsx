import React from "react";
import { FaFacebookF, FaTwitter } from "react-icons/fa";

function ComingSoon() {
  return (
    <div className="bg-gradient-to-r min-h-screen flex items-center justify-center">
      <div className="text-center text-white flex justify-center items-center flex-col">
        <h1 className="text-5xl font-bold mb-4 animate-pulse text-theme-500">
          Coming Soon
        </h1>
        <p className="text-lg mb-6 text-theme-600">
          We're working hard to bring you an amazing experience.
        </p>

        {/* Image Placeholder */}
        <div className="w-48 h-48 rounded-full animate-pulse mb-6">
          <img
            src={"/assets/images/coming-soon.png"}
            alt="Placeholder"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mt-10">
          <p className="text-sm text-theme-500">Follow us on:</p>
          <div className="flex justify-center mt-2">
            <a
              href="#"
              className="text-theme-500 hover:text-theme-200 mx-2 transition-all duration-300"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="#"
              className="text-theme-500 hover:text-theme-200 mx-2 transition-all duration-300"
            >
              <FaTwitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;

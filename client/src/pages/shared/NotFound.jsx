import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-wrap justify-center items-center bg-white text-gray-900">
      <div className="order-2 sm:order-1 text-center">
        <h1 className="text-6xl font-extrabold text-theme-500 animate-bounce">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mt-4">
          Oops! Page not found
        </h2>
        <p className="text-lg mt-2 text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-theme-500 text-white rounded-lg shadow-lg hover:bg-theme-600 transition-transform transform hover:scale-105"
          >
            Back to Home
          </Link>
        </div>
      </div>

      <div className="order-1 sm:order-2 mt-10 flex justify-center">
        <img
          src="/assets/images/404Error.gif"
          alt="Job portal themed illustration"
          className="w-64 md:w-96 animate-pulse"
        />
      </div>
    </div>
  );
};

export default NotFound;

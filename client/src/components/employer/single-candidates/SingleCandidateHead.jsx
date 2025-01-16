import React from "react";
import female from "/assets/images/femaleprofile.jpg";
import { IoBookmarkOutline } from "react-icons/io5";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { GoClock } from "react-icons/go";
import { GrLocation } from "react-icons/gr";
import { useSelector } from "react-redux";

function SingleCandidateHead() {
  const { candidate } = useSelector((state) => state.employer);
  
  return (
    <div className="bg-customBgColor py-6 my-5 rounded-md shadow-md">
      <div className="max-w-[1440px] mx-auto grid gap-6 px-4 text-center lg:text-left">
        {/* Profile Image and Basic Info */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          <img
            src={candidate?.profileImage || "/default-profile.png"}
            alt="Candidate"
            className="w-16 h-16 rounded-full mx-auto lg:mx-0"
          />
          <div>
            <h1 className="text-xl font-semibold capitalize">
              {candidate?.userId?.username || "Unknown Candidate"}
            </h1>
            <p className="text-sm text-purple-600">
              {candidate?.jobDetails?.jobTitle || "No Job Title"}
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-2">
          {candidate?.skills?.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-purple-100 text-purple-500 text-xs font-semibold rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Location and Other Info */}
        <div className="flex flex-wrap justify-center lg:justify-between items-center gap-4 text-gray-500">
          <div className="flex items-center gap-2">
            <GrLocation className="text-lg" />
            <p className="text-sm">{candidate?.locationName || "Location"}</p>
          </div>
          {candidate?.jobDetails?.cTc && (
            <div className="flex items-center gap-2">
              <FaMoneyBill1Wave className="text-lg" />
              <p className="text-sm">{candidate?.jobDetails?.cTc}</p>
            </div>
          )}
          <div className="flex items-center gap-2">
            <GoClock className="text-lg" />
            <p className="text-sm">{candidate?.jobDetails?.workExperience}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center lg:justify-end gap-3">
          <a
            href={candidate?.resume}
            download
            className="px-5 py-3 bg-purple-600 hover:bg-purple-800 text-white text-sm font-medium rounded-lg"
          >
            Download CV
          </a>
          <button className="p-3 bg-purple-100 text-purple-500 rounded-lg">
            <IoBookmarkOutline className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleCandidateHead;

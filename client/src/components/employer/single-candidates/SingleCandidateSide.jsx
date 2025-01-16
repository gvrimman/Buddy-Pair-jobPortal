import React from "react";
import { SlCalender } from "react-icons/sl";
import { GiSandsOfTime } from "react-icons/gi";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { PiGraduationCapLight } from "react-icons/pi";
import { useSelector } from "react-redux";
import SmallBox from "../../common/SmallBox";

function SingleCandidateSide() {
  const { candidate } = useSelector((state) => state.employer);

  const sideDetails = [
    { icon: <SlCalender />, title: candidate?.jobDetails?.workExperience },
    { icon: <GiSandsOfTime />, title: candidate?.age },
    { icon: <FaMoneyBill1Wave />, title: candidate?.jobDetails?.ctc || "N/A" },
    { icon: <FaMoneyBill1Wave />, title: candidate?.jobDetails?.eCtc || "N/A" },
    { icon: <PiGraduationCapLight />, title: candidate?.qualification },
  ];

  return (
    <div className="bg-gray-100 p-5 shadow-md rounded-md space-y-4">
      {sideDetails.map((detail, index) => (
        <SmallBox key={index} icon={detail.icon} title={detail.title} />
      ))}
    </div>
  );
}


export default SingleCandidateSide;

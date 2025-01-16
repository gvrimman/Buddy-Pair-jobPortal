import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import CandidateExperience from "../../components/employer/single-candidates/CandidateExperience";
import CandidateEducation from "../../components/employer/single-candidates/CandidateEducation";
import AboutCandidate from "../../components/employer/single-candidates/AboutCandidate";
import SocialMedia from "../../components/employer/single-candidates/SocialMedia";
import MessageMe from "../../components/employer/single-candidates/MessageMe";
import SingleCandidateSide from "../../components/employer/single-candidates/SingleCandidateSide";
import SingleCandidateHead from "../../components/employer/single-candidates/SingleCandidateHead";
import { getCandidateById } from "../../apis/employerApi";

function SingleCandidate() {
  const dispatch = useDispatch();
  const { id } = useParams(); 

  useEffect(() => {
    dispatch(getCandidateById(id));
  }, [id, dispatch]);


  return (
    <>
      {/* Candidate Header Section */}
      <SingleCandidateHead />

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="order-2 lg:order-1">
          <SingleCandidateSide />
          <div className="mt-6 space-y-4 pb-16">
            <SocialMedia />
            <MessageMe />
          </div>
        </div>

        {/* Main Details */}
        <div className="col-span-2 order-1 lg:order-2 space-y-6">
          <AboutCandidate />
          <CandidateEducation />
          <CandidateExperience />
        </div>
      </div>
    </>
  );
}

export default SingleCandidate;

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
      <SingleCandidateHead />
      <div className="max-w-[1440px] mx-auto bg-white px-3 py-5 grid lg:grid-cols-3">
        <div className="w-full lg:w-4/5 grid gap-4">
          <SingleCandidateSide />
          <SocialMedia />
          <MessageMe />
        </div>

        <div className="col-span-2 px-3 ">
          <AboutCandidate />
          <CandidateEducation />
          <CandidateExperience />
        </div>
      </div>
    </>
  );
}

export default SingleCandidate;

import React, { useEffect, useState } from "react";
import CandidatesSideSection from "../components/candidates/CandidatesSideSection"
import { useDispatch } from "react-redux";
import CandidatesSideBar from "../components/candidates/CandidatesSideBar";
import CandidatesSection from "../components/candidates/CandidatesSection";
// import { getAllCandidates } from "../../../../redux/employerSlice";

function Candidates() {
  const [toggleJobSection, setToggleJobSection] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getAllCandidates());
  }, [dispatch]);

  return (
    <div className="max-w-[1440px] mx-auto px-7 grid lg:grid-cols-4">
      <CandidatesSideSection />
      <CandidatesSideBar
        toggleValue={toggleJobSection}
        setToggleValue={setToggleJobSection}
      />
      <CandidatesSection
        toggleValue={toggleJobSection}
        setToggleValue={setToggleJobSection}
      />
    </div>
  );
}

export default Candidates;

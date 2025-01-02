import React, { useEffect, useState } from "react";
import CandidatesSideSection from "../../components/employer/candidates/CandidatesSideSection";
import CandidatesSideBar from "../../components/employer/candidates/CandidatesSideBar";
import CandidatesSection from "../../components/employer/candidates/CandidatesSection";
import { useDispatch, useSelector } from "react-redux";
import { getCandidates } from "../../apis/employerApi";
import Filter from "../../components/common/Filter";
import JobView from "../../components/employer/candidates/JobView";
import SideBar from "../../layouts/Layout";

function Candidates() {
	const [toggleJobSection, setToggleJobSection] = useState(false);

	return (
		// <div className="max-w-[1440px] mx-auto px-7 grid lg:grid-cols-4">

		<div className="w-[95%] max-w-[1440px] mx-auto">
			{/* <Filter /> */}
			<JobView />
			<CandidatesSideSection />
			{/* <CandidatesSideBar
				toggleValue={toggleJobSection}
				setToggleValue={setToggleJobSection}
			/> 
			<CandidatesSection
				toggleValue={toggleJobSection}
				setToggleValue={setToggleJobSection}
			/>  */}
		</div>
	);
}

export default Candidates;

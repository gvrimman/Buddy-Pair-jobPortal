import React, { useEffect } from "react";

import CandidateCards from "../CandidateCards";

import maleprofile from "/assets/images/maleprofile.jpg";
import femaleprofile from "/assets/images/femaleprofile.jpg";
import { useSelector } from "react-redux";


function Applicants() {
	const { applicants } = useSelector((state) => state.employer);
	return (
		<div className="grid bg-white mx-2 p-4 rounded-md shadow ">
			<div className="lg:flex justify-between items-center">
				<h2 className="py-2 text-lg tracking-wide font-semibold">
					Applicants
				</h2>
				<p className="font-semibold">
					Found {applicants?.length} Applicants
				</p>
				{/* <select
					name="dataOrder"
					className="w-fit my-2 px-5 py-3 bg-gray-200 placeholder:text-slate-500 text-sm font-semibold tracking-wide rounded-md focus:bg-white focus:outline focus:outline-2 focus:outline-blue-500">
					<option value="newest">Newest</option>
					<option value="oldest">Oldest</option>
				</select> */}
			</div>
			<div className="grid lg:grid-cols-2 gap-3">
				<CandidateCards
					maleImg={maleprofile}
					femaleImg={femaleprofile}
				/>
			</div>
		</div>
	);
}

export default Applicants;

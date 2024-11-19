import React from "react";
import {
	experienceData,
	genderOptions,
	preferredJobType,
} from "../../../utils/constants.js";
import TextSearch from "../../common/TextSearch.jsx";
import OptionSearch from "../../common/OptionSearch.jsx";
import SwitchSearch from "../../common/SwitchSearch.jsx";

function CandidatesSideSection({ setQuery }) {
	return (
		<div className="my-5 p-3 hidden lg:grid gap-4 bg-customBgColor rounded-lg ">
			<TextSearch
				setQuery={setQuery}
				firsttitle={"Search by keywords"}
				secondtitle={"Location"}
			/>
			<OptionSearch
				setQuery={setQuery}
				title={"Category"}
				contents={preferredJobType}
			/>
			<SwitchSearch
				setQuery={setQuery}
				title={"Experience"}
				contents={experienceData}
			/>
			{/* <RadioSearch title={"Date Posted"} contents={postedDateData} /> */}
			<SwitchSearch
				setQuery={setQuery}
				title={"Gender"}
				contents={genderOptions}
			/>
		</div>
	);
}

export default CandidatesSideSection;

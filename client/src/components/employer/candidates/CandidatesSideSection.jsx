import React from "react";
import {
	experienceData,
	genderOptions,
	preferredJobType,
} from "../../../utils/constants.js";
import TextSearch from "../../common/TextSearch.jsx";
import OptionSearch from "../../common/OptionSearch.jsx";
import SwitchSearch from "../../common/SwitchSearch.jsx";

function CandidatesSideSection() {
	return (
		<div className="my-5 p-3 hidden lg:grid gap-4 bg-customBgColor rounded-lg ">
			<TextSearch
				firsttitle={"Search by keywords"}
				secondtitle={"Location"}
			/>
			<OptionSearch
				title={"Category"}
				contents={preferredJobType}
			/>
			<SwitchSearch
				title={"Experience"}
				contents={experienceData}
			/>
			<SwitchSearch
				title={"Gender"}
				contents={genderOptions}
			/>
		</div>
	);
}

export default CandidatesSideSection;

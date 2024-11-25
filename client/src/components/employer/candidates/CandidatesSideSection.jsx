import React from "react";
import {
	experienceData,
	genderOptions,
	preferredJobType,
} from "../../../utils/constants.js";
import TextSearch from "../../common/TextSearch.jsx";
import OptionSearch from "../../common/OptionSearch.jsx";
import SwitchSearch from "../../common/SwitchSearch.jsx";

function CandidatesSideSection({ setQuery, query }) {
	return (
		<div className="my-5 p-3 hidden lg:grid gap-4 bg-customBgColor rounded-lg ">
			<TextSearch
				setQuery={setQuery}
				query={query}
				firsttitle={"Search by keywords"}
				secondtitle={"Location"}
			/>
			<OptionSearch
				setQuery={setQuery}
				title={"Category"}
				query={query}
				contents={preferredJobType}
			/>
			<SwitchSearch
				setQuery={setQuery}
				title={"Experience"}
				contents={experienceData}
				query={query}
			/>
			{/* <RadioSearch title={"Date Posted"} contents={postedDateData} /> */}
			<SwitchSearch
				setQuery={setQuery}
				title={"Gender"}
				contents={genderOptions}
				query={query}
			/>
		</div>
	);
}

export default CandidatesSideSection;

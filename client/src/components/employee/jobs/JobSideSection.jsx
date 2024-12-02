import React from "react";
import TextSearch from "../../common/TextSearch.jsx";
import OptionSearch from "../../common/OptionSearch.jsx";
import SwitchSearch from "../../common/SwitchSearch.jsx";
import RadioSearch from "../../common/RadioSearch.jsx";
import {
	experienceData,
	jobTypes,
	postedDateData,
	preferredJobType,
} from "../../../utils/constants.js";

function JobSideSection() {
	return (
		<div className="my-5 hidden lg:grid gap-4 ">
			<TextSearch
				firsttitle={"Search by keywords"}
				secondtitle={"Location"}
			/>
			<OptionSearch
				title={"Category"}
				contents={preferredJobType}
			/>
			<SwitchSearch
				title={"Job Type"}
				contents={jobTypes}
			/>
			<RadioSearch
				title={"Date Posted"}
				contents={postedDateData}
			/>
			<SwitchSearch
				title={"Experience"}
				contents={experienceData}
			/>
		</div>
	);
}

export default JobSideSection;

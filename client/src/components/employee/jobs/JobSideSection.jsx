import React from "react";

import { categoryData, jobTypeData } from "../../../utils/job-search.js";
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

function JobSideSection({ setQuery }) {
	return (
		<div className="my-5 hidden lg:grid gap-4 ">
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
				title={"Job Type"}
				contents={jobTypes}
			/>
			<RadioSearch
				setQuery={setQuery}
				title={"Date Posted"}
				contents={postedDateData}
			/>
			<SwitchSearch
				setQuery={setQuery}
				title={"Experience"}
				contents={experienceData}
			/>
		</div>
	);
}

export default JobSideSection;

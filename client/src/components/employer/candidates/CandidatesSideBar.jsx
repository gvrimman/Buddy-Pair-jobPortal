import React from "react";
import { IoMdClose } from "react-icons/io";

import {  experienceData, genderOptions, preferredJobType } from "../../../utils/constants.js";
import TextSearch from "../../common/TextSearch.jsx";
import OptionSearch from "../../common/OptionSearch.jsx";
import SwitchSearch from "../../common/SwitchSearch.jsx";

function CandidatesSideBar({ toggleValue, setToggleValue, setQuery }) {
	return (
		<div
			className={`bg-customBgColor h-screen py-5 absolute grid gap-5 ps-6 pr-2 transition-all ease-in-out duration-500 z-10 overflow-y-auto scroll-smooth ${
				toggleValue ? "left-0" : "-left-[95%]"
			}`}>
			<div className="relative flex ">
				<TextSearch
					setQuery={setQuery}
					firsttitle={"Search by keywords"}
					secondtitle={"Location"}
				/>
				<div
					onClick={() => setToggleValue(false)}
					className="absolute -top-2 right-0 w-fit h-fit text-xl font-medium outline outline-1 outline-slate-700 rounded-full p-[6px] cursor-pointer">
					<IoMdClose />
				</div>
			</div>
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

export default CandidatesSideBar;

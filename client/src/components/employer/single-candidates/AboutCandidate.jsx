import React from "react";
import { useSelector } from "react-redux";

function AboutCandidate() {
	const { candidate } = useSelector((state) => state.employer);
	return (
		<div className="grid gap-3">
			<h1 className="text-lg font-semibold tracking-wide">
				Candidate About
			</h1>
			<p className="px-1 text-sm text-stone-950 tracking-wider leading-relaxed">
				{candidate?.about}
			</p>
		</div>
	);
}

export default AboutCandidate;

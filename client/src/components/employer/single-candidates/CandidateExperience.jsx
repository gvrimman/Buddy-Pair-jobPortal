import React from "react";
import { useSelector } from "react-redux";

function CandidateExperience() {
	const { candidate } = useSelector((state) => state.employer);
	return (
		<div className="mt-5 grid gap-3">
			{candidate?.jobDetails?.jobTitle && (
				<>
					<h1 className="text-lg font-semibold tracking-wide">
						RecentWork Experience
					</h1>

					<div className="px-1 flex gap-4">
						<div className="w-8 h-8 flex justify-center items-center  bg-blue-100 text-blue-500 font-semibold rounded-full">
							{candidate?.jobDetails?.companyName?.charAt(0)}
						</div>
						<div>
							<h3 className="text-sm font-semibold tracking-wide">
								{candidate?.jobDetails?.jobTitle}
							</h3>

							<h3 className="mt-2 text-sm text-blue-500 font-semibold tracking-wide">
								{candidate?.jobDetails?.companyName}
							</h3>
						</div>
						<div className="h-fit px-4 py-1 bg-blue-100 text-sm text-blue-500 font-semibold rounded-full">
							<span>💵{candidate?.jobDetails?.ctc}</span>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default CandidateExperience;

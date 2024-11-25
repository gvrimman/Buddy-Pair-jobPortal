import React from "react";
import { useSelector } from "react-redux";

function CandidateEducation() {
  const { candidate } = useSelector((state) => state.employer);

  return (
		<div className="mt-5 grid gap-3">
			<h1 className="text-lg font-semibold tracking-wide">Education</h1>

			<div className="px-1 flex gap-4">
				<div className="w-8 h-8 flex justify-center items-center  bg-red-100 text-red-500 font-semibold rounded-full">
					{candidate?.educationInstitute?.charAt(0)}
				</div>
				<div>
					<h3 className="text-sm font-semibold tracking-wide">
						{candidate?.qualification}
					</h3>

					<h3 className="mt-2 text-sm text-red-500 font-semibold tracking-wide">
						{candidate?.educationInstitute}
					</h3>
				</div>
				<div className="h-fit px-4 py-1 bg-red-100 text-sm text-red-500 font-semibold rounded-full">
					<span>{candidate?.educationType}</span>
				</div>
			</div>
		</div>
  );
}

export default CandidateEducation;

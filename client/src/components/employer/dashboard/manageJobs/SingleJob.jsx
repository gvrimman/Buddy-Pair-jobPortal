import React from "react";
import { Button } from "@material-tailwind/react";

function SingleJob({ data, setJobViewModalOpen }) {
	return (
		<div>
			<h3 className="font-semibold text-xl mb-3 underline">
				{data.jobTitle}
			</h3>
			<p>
				Job Type: <span>{data.jobType}</span>
			</p>
			<p>
				Employment Type: <span>{data.employmentType}</span>
			</p>
			<p>
				job Descreption: <span>{data.jobDescription}</span>
			</p>
			<p>
				Required Skills: <span></span>
			</p>
			<p>
				Qualification: <span>{data.qualification}</span>
			</p>
			<p>
				Preferred Candidate Gender: <span>{data.candidateGender}</span>
			</p>
			<p>
				Company Email: <span>{data.companyEmail}</span>
			</p>
			<p>
				Industry Type: <span>{data.industry}</span>
			</p>
			<p>
				Job Location: <span>{data.jobLocation}</span>
			</p>
			<p>
				Job Place: <span>{data.jobPlace}</span>
			</p>
			<p>
				Offered Salary: <span>{data.offeredSalary}</span>
			</p>
			<p>
				Last Apply Date: <span>{data.deadline}</span>
			</p>
			<div className="text-end">
				<Button
					onClick={() => setJobViewModalOpen(false)}
					className="bg-red-400">
					close
				</Button>
			</div>
		</div>
	);
}

export default SingleJob;

import React, { useEffect, useState } from "react";

import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getJobs } from "../../apis/employeeApi";
import { setQuery } from "../../Redux/reducers/employeeReducer";

function NormalSearchInput() {
	const [searchTerms, setSearchTerms] = useState({
		name: "",
		location: "",
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (searchTerms.name === "" && searchTerms.location === "") {
			showError("Please enter job title or location");
			return;
		}

		dispatch(clearJobs());
		dispatch(getJobs(searchTerms));
		dispatch(setQuery(searchTerms));
		navigate("/job-portal/employee/jobs");
	};

	return (
		<div className="w-full grid justify-center md:justify-start lg:hidden mt-4 px-4">
			<form onSubmit={handleSubmit} className="grid gap-3">
				<div className="px-3 py-4 flex items-center gap-2 bg-white text-slate-950 rounded-md shadow-md shadow-slate-400 ">
					<div className="text-xl ">
						<CiSearch />
					</div>
					<input
						className="outline-none"
						type="text"
						placeholder="job title"
						name="title"
						onChange={(e) =>
							setSearchTerms({
								...searchTerms,
								name: e.target.value,
							})
						}
					/>
				</div>
				<div className="px-3 py-4 flex items-center gap-2 bg-white text-slate-950 rounded-md shadow-md shadow-slate-400">
					<div className="text-xl ">
						<CiLocationOn />
					</div>
					<input
						className="outline-none"
						type="text"
						placeholder="Location"
						name="jobPlace"
						onChange={(e) =>
							setSearchTerms({
								...searchTerms,
								location: e.target.value,
							})
						}
					/>
				</div>
				<button className="outline-none bg-[#673ab7] text-white px-5 py-3 rounded-md">
					Find Jobs
				</button>
			</form>
		</div>
	);
}

export default NormalSearchInput;

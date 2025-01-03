import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { getJobs } from "./../../apis/employeeApi";
import { showError } from "../../utils/toast";
import {
	clearJobs,
	clearQuery,
	setQuery,
} from "../../Redux/reducers/employeeReducer";

function LargeSearchInput() {
	const [searchTerms, setSearchTerms] = useState({
		name: "",
		location: "",
	});
	// console.log(searchTerms);
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
		dispatch(clearQuery());
		dispatch(setQuery(searchTerms));
		navigate("/job-portal/employee/jobs");
	};
	return (
		<div className="hidden lg:block">
			<form
				onSubmit={handleSubmit}
				className="flex  bg-white w-fit mt-4 px-5 py-8 rounded-lg shadow-lg">
				<div className="flex items-center gap-2 text-slate-950">
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
				<div className="flex items-center gap-2 text-slate-950">
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

export default LargeSearchInput;

import React, { useState } from "react";

import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCandidates } from "../../apis/employerApi";
import { showError } from "../../utils/toast";
import { clearCandidates, setQuery } from "../../Redux/reducers/employerReducer";

function LargeSearch() {
	const [searchTerms, setSearchTerms] = useState({
		name: "",
		location: "",
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (searchTerms.name === "" && searchTerms.location === "") {
			showError("Please enter job location or candidate name");
			return;
		}
		dispatch(clearCandidates());
		dispatch(getCandidates(searchTerms));
		dispatch(setQuery(searchTerms));
		navigate("/job-portal/employer/candidates");
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
						className="outline-none bg-white"
						type="text"
						placeholder="job title or candidate"
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
						className="outline-none bg-white"
						type="text"
						placeholder="City or postcode"
						onChange={(e) =>
							setSearchTerms({
								...searchTerms,
								location: e.target.value,
							})
						}
					/>
				</div>
				<button className="outline-none bg-[#673ab7] text-white px-5 py-3 rounded-md">
					Find Candidates
				</button>
			</form>
		</div>
	);
}

export default LargeSearch;

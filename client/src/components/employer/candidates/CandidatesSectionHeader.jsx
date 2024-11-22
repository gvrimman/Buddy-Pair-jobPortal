import React, { useState } from "react";
import { IoFilterOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { getCandidates } from "../../../apis/employerApi";
import { Button } from "@material-tailwind/react";

function CandidatesSectionHeader({ setToggleValue, setQuery, query }) {
	const dispatch = useDispatch();

	const handleClearFilter = () => {
		dispatch(getCandidates());
	};

	const handleSortChange = (e) => {
		setQuery((prev) => ({ ...prev, sort: e.target.value }));
		dispatch(getCandidates(query));
	};

	const handleSearchCandidate = () => {
		dispatch(getCandidates(query));
	};

	return (
		<div className="grid mx-auto md:flex lg:justify-end gap-3">
			<div className="w-fit mx-auto px-3 md:px-4 py-1 flex items-center gap-3 bg-white text-blue-500 text-md  rounded-md shadow-sm lg:hidden hover:cursor-pointer">
				<IoFilterOutline />
				<p
					className="tracking-wide"
					onClick={() => setToggleValue(true)}>
					Filter
				</p>
			</div>
			<div className="grid md:flex gap-3">
				<button
					className="hidden md:block px-6 py-2 outline outline-1 outline-red-500 antialiased text-[#000] rounded-md hover:bg-red-500 hover:text-[#fff]"
					onClick={handleClearFilter}>
					Clear All
				</button>
				<select
					className="text-sm bg-white outline outline-1 outline-slate-300 px-2 py-2 rounded-md"
					onChange={handleSortChange}
					// value={sortValue.sort}
				>
					<option value="default">Sort by (Default)</option>
					<option value="newest">Newest</option>
					<option value="oldest">Oldest</option>
				</select>
				<button
					onClick={handleClearFilter}
					className="md:hidden px-6 py-2 bg-red-500 antialiased text-white font-medium rounded-md">
					Clear All
				</button>
				<button
					className="px-7 py-2 outline outline-1 outline-green-500 antialiased text-[#000] hover:font-semibold rounded-md hover:bg-green-500 hover:text-[#fff]"
					onClick={handleSearchCandidate}>
					Search
				</button>
			</div>
		</div>
	);
}

export default CandidatesSectionHeader;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoSearchOutline } from "react-icons/io5";
import SearchedUser from "./SearchedUser";
import { showError } from "../../../utils/toast";
import { useNavigate } from "react-router-dom";
import { FaCircleChevronLeft } from "react-icons/fa6";

function SearchBar() {
	const [searchValue, setSearchValue] = useState("");
	const [searchedUser, setSearchedUser] = useState(null);
	const { userLists } = useSelector((state) => state.chat);
  const navigate = useNavigate()

	const handleSearch = async () => {
		if (!searchValue) return;

		if (searchValue.length < 3) {
			return showError("Search Term Must Be At Least 3 Characters Long");
		}
		try {
			const user = await userLists?.find((obj) =>
				obj?.userId?.username
					?.toLowerCase()
					.includes(searchValue.toLowerCase())
			);

			if (user) {
				setSearchedUser(user);
				setSearchValue("");
			} else {
				showError("No Such User Found");
			}
		} catch (error) {
			showError("Something Error Occured Searching User");
		}
	};

	const handleEnterBtn = (e) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};
	return (
		<div className="flex items-center gap-4 w-full">
			<button
				className="lg:hidden text-3xl text-slate-600"
				onClick={() => navigate(-1)}>
				<FaCircleChevronLeft />
			</button>
			<div className="relative h-16 w-full bg-customBgColor p-3 flex items-center gap-3 border rounded-lg ">
				<div className="cursor-pointer" onClick={handleSearch}>
					<IoSearchOutline />
				</div>
				<input
					type="text"
					placeholder="Search"
					className="bg-customBgColor placeholder:text-sm placeholder:text-black focus:outline-none"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					onKeyDown={handleEnterBtn}
				/>
				{searchedUser && (
					<div className=" absolute top-14 left-0 right-0 w-full ">
						<SearchedUser
							user={searchedUser}
							setValue={setSearchedUser}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default SearchBar;

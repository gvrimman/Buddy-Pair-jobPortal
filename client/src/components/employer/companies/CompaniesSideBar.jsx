import React from 'react'
import { IoMdClose } from "react-icons/io";
import TextSearch from '../../common/TextSearch';


function CompaniesSideBar({ toggleValue, setToggleValue, setQuery }) {
	return (
		<div
			className={`bg-customBgColor h-screen py-5 absolute top-0 grid gap-5 ps-6 pr-2 transition-all ease-in-out duration-500 z-10 overflow-y-auto scroll-smooth ${
				toggleValue ? "left-0" : "-left-[95%]"
			}`}>
			<div className="relative flex">
				<TextSearch
					setQuery={setQuery}
					firsttitle={"Search Companies"}
					secondtitle={"Location"}
				/>
				<div
					onClick={() => setToggleValue(false)}
					className="absolute -top-2 right-0 w-fit h-fit text-xl font-medium outline outline-1 outline-slate-700 rounded-full p-[6px] cursor-pointer">
					<IoMdClose />
				</div>
			</div>
		</div>
	);
}

export default CompaniesSideBar
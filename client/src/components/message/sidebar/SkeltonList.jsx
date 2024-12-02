import React from "react";

function SkeltonList() {
	return (
		
			<div className="flex flex-col items-center my-5 space-y-2">
				{Array.from({ length: 5 }).map((_, index) => (
					<div
						key={index}
						className="w-full h-10 bg-gray-200 rounded animate-pulse"></div>
				))}
			</div>
		
	);
}

export default SkeltonList;

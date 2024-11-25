import React from "react";
import TextSearch from "../../common/TextSearch";

function CompaniesSideSection({ setQuery, query }) {
	return (
		<div className="h-fit my-5 p-3 hidden lg:grid gap-4 bg-customBgColor">
			<TextSearch
				setQuery={setQuery}
				query={query}
				firsttitle={"Search Companies"}
				secondtitle={"Location"}
			/>
		</div>
	);
}

export default CompaniesSideSection;

import React from 'react'
import TextSearch from '../../common/TextSearch'

function CompanySideSection({ setQuery, query }) {
	return (
		<div className="my-5 hidden lg:grid gap-4 ">
			<TextSearch
				setQuery={setQuery}
				query={query}
				firsttitle={"Search by keywords"}
				secondtitle={"Location"}
			/>
		</div>
	);
}

export default CompanySideSection
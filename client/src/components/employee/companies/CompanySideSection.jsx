import React from 'react'
import TextSearch from '../../common/TextSearch'

function CompanySideSection() {
	return (
		<div className="my-5 hidden lg:grid gap-4 ">
			<TextSearch
				firsttitle={"Search by keywords"}
				secondtitle={"Location"}
			/>
		</div>
	);
}

export default CompanySideSection
import React from "react";

function RadioSearch({ title, contents, setQuery, query }) {
	const handleRadioValue = (e) => {
		// setQuery({ datePosted: e.target.value});
		setQuery((prev) => ({ ...prev, datePosted: e.target.value }));
	};

	return (
		<div>
			<h1 className="font-semibold text-lg">{title}</h1>
			<ul className="mt-3 grid gap-2 items-center">
				{contents?.map((item) => (
					<li key={item} className="w-fit">
						<label className="flex gap-3 items-center text-slate-600 cursor-pointer">
							<input
								type="radio"
								name="postedDate"
								value={item}
								className="w-4 h-4"
								onChange={handleRadioValue}
								checked={query?.datePosted === item}
							/>
							<span className="text-sm">{item}</span>
						</label>
					</li>
				))}
			</ul>
		</div>
	);
}

export default RadioSearch;

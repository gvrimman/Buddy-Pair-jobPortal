import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../../Redux/reducers/employeeReducer";

function SwitchSearch({ title, contents }) {
	const { query } = useSelector((state) => state.employee);
	const dispatch = useDispatch();
	const [selectedValues, setSelectedValues] = useState([]);

	const handleToggle = (value) => {
		const newValues = selectedValues.includes(value.value)
			? selectedValues.filter((v) => v !== value.value)
			: [...selectedValues, value.value];

		dispatch(
			setQuery({
				...query,
				[title.replace(/\s+/g, "").toLowerCase()]: newValues,
			})
		);
		setSelectedValues(newValues);
	};
	return (
		<div>
			<h1 className="font-semibold text-lg">{title}</h1>
			<ul className="mt-3">
				{contents?.map((item, i) => (
					<li className="py-1 w-fit" key={i}>
						<label className="flex items-center text-slate-600 cursor-pointer">
							<input
								type="checkbox"
								value={item.value}
								className="sr-only peer"
								checked={
									selectedValues.includes(item.value) &&
									Object.keys(query).length > 0
								}
								onChange={() => handleToggle(item)}
							/>

							<div className="relative w-11 h-5 bg-slate-50 outline outline-1 outline-slate-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:start-4 peer-checked:after:bg-white rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:start-1 after:bg-slate-300 after:border-gray-300  after:rounded-full after:h-3 after:w-3 after:transition-all  peer-checked:bg-blue-600 "></div>
							<span className="ms-3 text-sm">
								{item.valueToDisplay}
							</span>
						</label>
					</li>
				))}
			</ul>
		</div>
	);
}

export default SwitchSearch;

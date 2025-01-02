import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import { setQuery } from "../../Redux/reducers/employeeReducer";

const animatedComponents = makeAnimated();

export default function DropdownCheckbox({ label, option }) {
	const { query } = useSelector((state) => state.employee);
	const dispatch = useDispatch();

	const handleChange = (e) => {
		dispatch(
			setQuery({
				...query,
				[label.toLowerCase()]: e.map((item) => item.value),
			})
		);
	};

	const defaultValues = option.filter((opt) =>
		query[label.toLowerCase()]?.includes(opt.value)
	);

	return (
		<Select
			className="text-sm"
			styles={{
				
			}}
			placeholder={label}
			closeMenuOnSelect={false}
			components={animatedComponents}
			isMulti
			onChange={handleChange}
			options={option.map((opt) => ({
				value: opt.value,
				label: opt.valueToDisplay,
			}))}
			defaultValue={defaultValues.map((opt) => ({
				value: opt.value,
				label: opt.valueToDisplay,
			}))}
		/>
	);
}

/* 
{
  query: {
    experience: [
      'fresher',
      '0-1'
    ],
    gender: [
      'male',
      'female'
    ]
  }
}

*/

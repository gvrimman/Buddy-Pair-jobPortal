import { Checkbox, Input } from "@material-tailwind/react";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../../Redux/reducers/employeeReducer";

function DropdownCheckbox({ label, option }) {
	const { query } = useSelector((state) => state.employee);
	const dispatch = useDispatch();

	const [isOpen, setIsOpen] = useState(false);
	const [values, setValues] = useState({});
	const componentRef = useRef(null);

	const onBlur = (e) => {
		setTimeout(() => {
			if (
				componentRef.current &&
				!componentRef.current.contains(document.activeElement)
			) {
				setIsOpen(false);
			}
		}, 0);
	};

	const handleClick = (e) => {
		setIsOpen((prev) => !prev);
	};

	const handleMouseDown = (e) => {
		e.preventDefault();
	};

	const handleCheck = (e) => {
		const { value, checked } = e.target;
		const labl = e.target.labels?.[1]?.innerText || "";

		const updatedValues = { ...values };

		if (checked) {
			updatedValues[value] = labl;
		} else {
			delete updatedValues[value];
		}

		setValues(updatedValues);

		dispatch(
			setQuery({
				...query,
				[label.toLowerCase()]: Object.keys(updatedValues),
			})
		);
	};

	return (
		<div className="relative flex-1" ref={componentRef}>
			<Input
				onFocus={() => setIsOpen(true)}
				onBlur={onBlur}
				label={label}
				readOnly
				value={
					Object.values(values).join(" • ")
				}
				onClick={handleClick}
			/>
			<ul
				className={`absolute left-0 right-0 translate-y-2 z-10 rounded-md text-sm font-medium bg-white shadow-xl p-3 transition overflow-y-auto max-h-[200px] ${
					isOpen ? "block" : "hidden"
				}`}
				onMouseDown={handleMouseDown}>
				{option.map((opt, i) => (
					<li
						key={i}
						className="hover:bg-[#E4E9ED] transition rounded-lg">
						<Checkbox
							onChange={handleCheck}
							value={opt?.value}
							label={opt?.valueToDisplay}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}

export default DropdownCheckbox;

import { Tooltip } from "@material-tailwind/react";
import React from "react";
import { Controller } from "react-hook-form";
import { PiExclamationMarkBold } from "react-icons/pi";
import Select from "react-select";

function MultiSelect({ options, placeholder, name, control, errors, value }) {
	const formattedValue = React.useMemo(() => {
		if (!value) return [];
		return value.map((val) => {
			const matchedOption = options.find(
				(option) => option.label === val || option.value === val
			);
			return (
				matchedOption || {
					value: val.replace(/\s+/g, "_").toLowerCase(),
					label: val,
				}
			);
		});
	}, [value, options]);

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={formattedValue}
			render={({ field }) => (
				<div className="relative">
					<Select
						{...field}
						isMulti
						options={options}
						value={field.value || formattedValue}
						onChange={(selectedOptions) => {
							field.onChange(selectedOptions || []);
						}}
						onBlur={field.onBlur}
						placeholder=""
						className="basic-multi-select border-black text-xs py-1"
						classNamePrefix="select"
					/>
					<label className="absolute -top-1 left-4 text-black text-xs bg-white ">
						{placeholder}
					</label>
					{errors && (
						<Tooltip
							content={errors?.message}
							placement="right"
							className="bg-gray-300 text-red-500 tooltip-custom">
							<span className="absolute top-2 right-2 bg-gray-300 text-red-500 p-1 rounded-full cursor-pointer">
								<PiExclamationMarkBold />
							</span>
						</Tooltip>
					)}
				</div>
			)}
		/>
	);
}

export default MultiSelect;

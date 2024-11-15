import { Tooltip } from "@material-tailwind/react";
import React from "react";
import { Controller } from "react-hook-form";
import { PiExclamationMarkBold } from "react-icons/pi";
import Select from "react-select";

function MultiSelect({ options, placeholder, name, control, errors }) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<div className="relative">
					<Select
						{...field}
						placeholder=""
						isMulti
						name="colors"
						options={options}
						className="basic-multi-select border-black text-xs"
						classNamePrefix="select"
					/>
					<label className="absolute -top-2 left-4 text-black text-xs bg-white ">
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

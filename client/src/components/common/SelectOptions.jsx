import React, { useState } from "react";
import { Controller } from "react-hook-form";

function SelectOptions({
	name,
	label,
	control,
	options,
  errors
}) {
	
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<div className="grid w-full">
					<label className="text-sm font-semibold">{label}</label>
					<select
						{...field}
						className="w-full ms-1 my-2 p-[21px] bg-gray-200 placeholder:text-slate-500 text-sm font-semibold tracking-wide rounded-md focus:bg-white focus:outline focus:outline-2 focus:outline-blue-500"
						>
						<option value="">Select</option>
						{options?.map((elm, i) => (
							<option key={i} value={elm?.value}>
								{elm?.valueToDisplay}
							</option>
						))}
					</select>
				</div>
			)}
		/>
	);
}

export default SelectOptions;

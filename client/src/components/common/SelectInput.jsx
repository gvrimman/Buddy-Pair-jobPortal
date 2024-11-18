import { Select, Option, Tooltip } from "@material-tailwind/react";
import { Controller } from "react-hook-form";
import { PiExclamationMarkBold } from "react-icons/pi";

function SelectInput({ name, label, control, options, errors, value }) {
	return (
		<div className="relative">
			<Controller
				name={name}
				control={control}
				defaultValue={value}
				render={({ field }) => (
					<div className="relative">
						<Select label={label} size="lg" {...field}>
							{options.map((elm, i) => (
								<Option key={i} value={elm.value}>
									{elm.valueToDisplay}
								</Option>
							))}
						</Select>
						{errors && (
							<Tooltip
								content={errors?.message}
								placement="right"
								className="bg-gray-300 text-red-500 tooltip-custom">
								<span className="absolute top-3 right-2 bg-gray-300 text-red-500 p-1 rounded-full cursor-pointer">
									<PiExclamationMarkBold />
								</span>
							</Tooltip>
						)}
					</div>
				)}
			/>
		</div>
	);
}

export default SelectInput;

import { Textarea, Tooltip } from '@material-tailwind/react';
import React from 'react'
import { PiExclamationMarkBold } from "react-icons/pi";


function TextAreaInput({ type, label, registering, errors,value }) {
	return (
		<div className="relative">
			<Textarea type={type} size="lg" label={label} defaultValue={value} {...registering} />
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
	);
}

export default TextAreaInput
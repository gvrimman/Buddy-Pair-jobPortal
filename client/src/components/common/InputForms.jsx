import React, { useEffect, useState } from "react";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";

function InputForms({ label, type, placeText, registering, errors }) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	return (
		<div className="grid">
			<label className="text-sm font-semibold">{label}</label>
			<div className="relative flex items-center">
				<input
					{...registering}
					type={
						type === "password" && isPasswordVisible ? "text" : type
					}
					placeholder={placeText}
					autoCorrect="false"
					className="w-full ms-1 my-2 p-[21px] bg-gray-200 placeholder:text-slate-500 text-sm font-semibold tracking-wide rounded-md focus:bg-white focus:outline focus:outline-2 focus:outline-blue-500"
				/>
				{type === "password" && (
					<button
						type="button"
						className="absolute right-4"
						onClick={() =>
							setIsPasswordVisible(!isPasswordVisible)
						}>
						{isPasswordVisible ? <BiShow /> : <BiHide />}
					</button>
				)}
			</div>
		</div>
	);
}

export default InputForms;

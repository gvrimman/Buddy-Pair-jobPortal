import React, { useEffect, useState } from "react";
import { MdOutlineWorkOutline } from "react-icons/md";

function OptionSearch({ title, contents }) {
  const [optionValue, setOptionValue] = useState("");

  const handleOptionValue = (e) => {
    setOptionValue(e.target.value);
  };


  return (
		<div>
			<h1 className="font-semibold text-lg">{title}</h1>
			<div className="w-fit mt-3 px-3 py-3 flex justify-between items-center gap-2 border-1 border-[#ecedf2] text-slate-950 bg-white rounded-md">
				<div className="mt-1">
					<MdOutlineWorkOutline />
				</div>

				<select
					name="category"
					className="text-slate-950 outline-none px-3 py-1"
					value={optionValue}
					onChange={handleOptionValue}>
					<option value="">Choose a category</option>
					{contents?.map((item, i) => (
						<option value={item.value} key={i}>
							{item.valueToDisplay}
						</option>
					))}
				</select>
			</div>
		</div>
  );
}

export default OptionSearch;

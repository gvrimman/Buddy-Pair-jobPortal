import React, { useEffect, useState } from "react";

function RadioSearch({ title, contents }) {
  const [radioValue, setRadioValue] = useState("");


  const handleRadioValue = (e) => {
    setRadioValue(e.target.value);
  };


  return (
    <div>
      <h1 className="font-semibold text-lg">{title}</h1>
      <ul className="mt-3 grid gap-2 items-center">
        {contents?.map((item) => (
          <li key={item} className="w-fit">
            <label className="flex gap-3 items-center text-slate-600 cursor-pointer">
              <input
                type="radio"
                name="postedDate"
                value={item}
                checked={radioValue === item}
                className="w-4 h-4"
                onChange={handleRadioValue}
              />
              <span className="text-sm">{item}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RadioSearch;

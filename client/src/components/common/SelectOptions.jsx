import React, { useState } from "react";

function SelectOptions({ name, title, options, value, handleChildValue }) {
  const handleSelection = (e) => {
    const newValue = e.target.value;
    handleChildValue(name,newValue)
  }
  return (
    <div className="grid w-full">
      <label className="text-sm font-semibold">{title}</label>
      <select
        name={name}
        className="w-full ms-1 my-2 p-[21px] bg-gray-200 placeholder:text-slate-500 text-sm font-semibold tracking-wide rounded-md focus:bg-white focus:outline focus:outline-2 focus:outline-blue-500"
        onChange={handleSelection}
      >
        <option value="">Select</option>
        {options?.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectOptions;

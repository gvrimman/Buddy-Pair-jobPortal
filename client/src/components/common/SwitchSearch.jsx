import React, { useEffect, useState } from "react";

function SwitchSearch({ title, contents }) {

  const [selectedValues, setSelectedValues] = useState([]);

  const handleToggle = (value) => {
    setSelectedValues((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };


  return (
    <div>
      <h1 className="font-semibold text-lg">{title}</h1>
      <ul className="mt-3">
        {contents?.map((item, i) => (
          <li className="py-1 w-fit" key={i}>
            <label className="flex items-center text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                value={item}
                className="sr-only peer"
                checked={selectedValues.includes(item)}
                onChange={() => handleToggle(item)}
              />
              <div className="relative w-11 h-5 bg-slate-50 outline outline-1 outline-slate-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:start-4 peer-checked:after:bg-white rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:start-1 after:bg-slate-300 after:border-gray-300  after:rounded-full after:h-3 after:w-3 after:transition-all  peer-checked:bg-blue-600 "></div>
              <span className="ms-3 text-sm">{item}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SwitchSearch;

import React, { useState } from "react";

function InputField({ label, type, name, handleChildValue }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputValue = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    handleChildValue(name, newValue);
  };
  return (
    <div className="grid gap-1 my-2">
      <label className="capitalize text-sm font-semibold">{label}</label>
      <input
        type={type}
        value={inputValue}
        onChange={handleInputValue}
        className="p-2 bg-white outline outline-2 outline-[#673ab7] focus:outline foucus:outline-1 focus:outline-[#673ab7] rounded-lg"
      />
    </div>
  );
}

export default InputField;

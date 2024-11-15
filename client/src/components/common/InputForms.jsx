import React, { useEffect, useState } from "react";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";

function InputForms({ title, type, placeText, name, value, handleChildValue }) {
  const [inputValue, setInputValue] = useState(value || "");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputValue = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    handleChildValue(name, newValue);
  };

  return (
    <div className="grid">
      <label className="text-sm font-semibold">{title}</label>
      <div className="relative flex items-center">
        <input
          type={type === "password" && isPasswordVisible ? "text" : type}
          placeholder={placeText}
          autoCorrect="false"
          className="w-full ms-1 my-2 p-[21px] bg-gray-200 placeholder:text-slate-500 text-sm font-semibold tracking-wide rounded-md focus:bg-white focus:outline focus:outline-2 focus:outline-blue-500"
          value={inputValue}
          onChange={handleInputValue}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute right-4"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
           { isPasswordVisible ? (
            <BiShow />
            ) : (
            <BiHide />)}
          </button>
        )}
      </div>
    </div>
  );
}

export default InputForms;

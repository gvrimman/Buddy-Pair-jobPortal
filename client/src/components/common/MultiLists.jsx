import React, { useState } from "react";

import { AiOutlineCloseCircle } from "react-icons/ai";

function MultiLists({ title, handleChildValue }) {
  const [inputText, setInputText] = useState("");
  const [inputList, setInputList] = useState([]);

  const handleAddBtn = () => {
    if (inputText.trim()) {
      const newList = [...inputList, inputText];
      setInputList(newList);
      handleChildValue(newList);
      setInputText("");
    }
  };

  const handleEnterBtn = (e) => {
    if (e.key === "Enter") {
      handleAddBtn();
    }
  };

  const handleRemoveItem = (text) => {
    const newLists = inputList.filter((item) => item !== text);
    setInputList(newLists);
  };
  return (
    <div className="grid gap-1">
      <div className="grid grid-cols-3 gap-3">
        <input
          type="text"
          placeholder={title}
          className="col-span-2 bg-white outline outline-2 outline-[#673ab7] focus:outline foucus:outline-1 focus:outline-[#673ab7] ps-2 p-2 rounded-lg"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleEnterBtn}
        />
        <button
          onClick={handleAddBtn}
          className=" text-center bg-[#673ab7] text-white font-semibold p-2 rounded-lg"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {inputList?.map((text, index) => (
          <div
            key={index}
            className="w-fit flex items-center gap-2 px-2 py-1 text-black bg-gray-200 rounded-full"
          >
            <p className="antialiased">{text}</p>
            <span
              className="text-red-500 text-md rounded-full cursor-pointer"
              onClick={() => handleRemoveItem(text)}
            >
              {<AiOutlineCloseCircle />}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MultiLists;

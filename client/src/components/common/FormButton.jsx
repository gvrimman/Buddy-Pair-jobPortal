import React from "react";

function FormButton({ text, saveParentValue }) {
  return (
    <button
      className="w-fit mt-4 px-16 py-3 bg-theme-500  text-white font-semibold capitalize hover:bg-violet-900 outline-none rounded-md"
      onClick={saveParentValue}
    >
      {text}
    </button>
  );
}

export default FormButton;

import React from "react";

function TitleRendering({ title }) {
  return (
    <div className="w-full h-[100vh] bg-theme-500 flex flex-col justify-center items-center transition-all ease-in-out duration-300  ">
      <p className={`render-para fade-in text-white `}>welcome to</p>
      <h1 className={`fade-in text-white text-4xl font-semibold `}>{title}</h1>
    </div>
  );
}

export default TitleRendering;

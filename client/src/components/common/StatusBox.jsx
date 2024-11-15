import React from "react";

function StatusBox({ text, textColor, bgColor, count, icon }) {
  return (
    <div className="bg-white flex items-center justify-between p-4 shadow-md rounded-lg">
      <div
        className={`text-${textColor} bg-${bgColor} p-2 text-4xl rounded-lg`}
      >
        {icon}
      </div>
      <div>
        <h3
          className={`text-${textColor} text-right text-2xl font-semibold tracking-wide`}
        >
          {count}
        </h3>
        <p className="capitalize text-sm ">{text}</p>
      </div>
    </div>
  );
}

export default StatusBox;

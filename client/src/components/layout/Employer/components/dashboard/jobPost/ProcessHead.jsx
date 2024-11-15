import React from "react";

function ProcessHead({ title, icon }) {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-blue-100 text-blue-500 text-4xl p-4 rounded-full">
        {icon}
      </div>
      <p className="font-semibold">{title}</p>
    </div>
  );
}

export default ProcessHead;

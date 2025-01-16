import React from "react";

function SmallBox({icon, title, text}) {
  return (
    <div className="flex items-start gap-3 ">
      <div className="mt-1 text-xl text-purple-600">
        {icon}
      </div>
      <div>
        <h3 className="text-base font-semibold mb-2">{title}</h3>
        <p className="text-sm">{text} </p>
      </div>
    </div>
  );
}

export default SmallBox;

import React from "react";

function SkeltonList() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="px-3 grid grid-cols-4 items-center gap-1">
          <div className="skeleton mx-auto bg-slate-600 w-12 h-12 rounded-full"></div>
          <div className="skeleton col-span-2 bg-slate-600 w-20 h-4"></div>
          <div className="skeleton bg-slate-600 w-10 h-4"></div>
        </div>
      ))}
    </>
  );
}

export default SkeltonList;

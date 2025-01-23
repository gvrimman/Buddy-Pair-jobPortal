import React from "react";

function PolicyContainer({ children }) {
  return (
    <div className="rounded-md shadow-md border py-4 px-6 text-gray-700 text-sm my-4 bg-white pb-16">
      {children}
    </div>
  );
}

function PolicyLayout({ title, children }) {
  return (
    <div className="max-w-[900px] w-full mx-auto">
      <PolicyContainer>
        <h1 className="text-xl font-bold text-theme-500 mb-4">{title}</h1>
        {children}
      </PolicyContainer>
    </div>
  );
}

export default PolicyLayout;

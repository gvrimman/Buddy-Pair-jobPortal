import React from "react";
import banner from "/assets/images/employeebanner.jpg";

import LargeSearchInput from "./LargeSearchInput";
import NormalSearchInput from "./NormalSearchInput";

function HomeBanner() {
  
  return (
    <div
      className="w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="max-w-[1440px] h-full mx-auto px-7 flex flex-col justify-center gap-3 ">
        <div className="flex flex-col gap-1 capitalize text-2xl lg:text-4xl font-bold subpixel-antialiased text-[#673ab7]">
          <p>Find your perfect job</p>
          <p>Match</p>
        </div>

        <p className="antialiased text-[#0000008a]  font-medium">
          Find Jobs, Employment & Career Opportunities
        </p>
        <LargeSearchInput />
        <NormalSearchInput />
      </div>
    </div>
  );
}

export default HomeBanner;

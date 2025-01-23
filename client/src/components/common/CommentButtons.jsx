import React from "react";

function CommentButtons({ icon, text }) {
  return (
    <button className="relative group/eye bg-theme-100 text-theme-500 p-2 rounded-lg hover:bg-theme-600 hover:text-white hover:font-semibold">
      {icon}
      <span className="w-max p-2 bg-theme-200 text-white text-[10px] font-semibold rounded-md hidden group-hover/eye:block group-hover/eye:absolute group-hover/eye:-top-9 group-hover/eye:-left-10">
        {text}
      </span>
    </button>
  );
}

export default CommentButtons;

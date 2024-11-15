import React from "react";

function CommentButtons({ icon, text }) {
  return (
    <button className="relative group/eye bg-blue-100 text-blue-500 p-2 rounded-lg hover:bg-blue-600 hover:text-white hover:font-semibold">
      {icon}
      <span className="w-max p-2 bg-black text-white text-[10px] font-semibold rounded-md hidden group-hover/eye:block group-hover/eye:absolute group-hover/eye:-top-9 group-hover/eye:-left-10">
        {text}
      </span>
    </button>
  );
}

export default CommentButtons;

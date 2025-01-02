import React from "react";
import ProfileCard from "./ProfileCard";

function ProfileGrid({ data }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-5">
      {data.map((job, idx) => (
        <ProfileCard key={idx} data={job} />
      ))}
    </div>
  );
}

export default ProfileGrid;

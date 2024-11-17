import React from "react";
import { useSelector } from "react-redux";
import { IoBriefcaseOutline } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";

import StatusBox from "../../../StatusBox";
import CandidateCards from "../../../employer/dashboard/CandidateCards";

function HomeDashboard() {
  const { appliedJobs, bookMarkedJobs, recentApplied } = useSelector(
    (state) => state.employee
  );
  const { messages } = useSelector((state) => state.chat);

  return (
    <div>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatusBox
          text={"applied jobs"}
          textColor={"blue-500"}
          bgColor={"blue-100"}
          count={appliedJobs?.length || 0}
          icon={<IoBriefcaseOutline />}
        />
        <StatusBox
          text={"bookmarks"}
          textColor={"blue-500"}
          bgColor={"blue-100"}
          count={bookMarkedJobs?.length || 0}
          icon={<IoBookmarkOutline />}
        />
        <StatusBox
          text={"messages"}
          textColor={"blue-500"}
          bgColor={"blue-100"}
          count={messages?.length || 0}
          icon={<MdOutlineMessage />}
        />
        <StatusBox
          text={"notifications"}
          textColor={"blue-500"}
          bgColor={"blue-100"}
          count={0}
          icon={<IoMdNotificationsOutline />}
        />
      </div>
      <div className="mt-4 py-2 bg-white rounded-md shadow-md">
        <h2 className="my-3 mx-4 font-semibold">Recent Applications</h2>
        <div className="grid lg:grid-cols-2 gap-3 mx-4">
          <CandidateCards
            data={recentApplied}
          />
        </div>
      </div>
    </div>
  );
}

export default HomeDashboard;

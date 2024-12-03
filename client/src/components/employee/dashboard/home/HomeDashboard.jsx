import React from "react";
import { useSelector } from "react-redux";
import { IoBriefcaseOutline } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";

import CandidateCards from "../../../employer/dashboard/CandidateCards";
import StatusBox from "../../../common/StatusBox";

function HomeDashboard() {
const { appliedJobs, bookmarkedJobs } = useSelector((state) => state.employee);

  return (
		<div>
			<div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
				<StatusBox
					text={"applied jobs"}
					textColor={"blue-500"}
					bgColor={"blue-100"}
					count={appliedJobs?.length}
					icon={<IoBriefcaseOutline />}
				/>
				<StatusBox
					text={"bookmarks"}
					textColor={"blue-500"}
					bgColor={"blue-100"}
					count={bookmarkedJobs?.length}
					icon={<IoBookmarkOutline />}
				/>
				<StatusBox
					text={"messages"}
					textColor={"blue-500"}
					bgColor={"blue-100"}
					count={0}
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
					{/* <CandidateCards
            data={[]}
          /> */}
				</div>
			</div>
		</div>
  );
}

export default HomeDashboard;

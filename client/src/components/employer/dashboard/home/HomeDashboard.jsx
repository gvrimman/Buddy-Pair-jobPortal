import React from "react";

import { IoBriefcaseOutline } from "react-icons/io5";
import { FaRegFileAlt } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { IoBookmarkOutline } from "react-icons/io5";
import { MdOutlineWorkOutline } from "react-icons/md";

import ViewsGraph from "./ViewsGraph";

import maleprofile from "/assets/images/maleprofile.jpg";
import femaleprofile from "/assets/images/femaleprofile.jpg";
import CandidateCards from "../CandidateCards";
import { viewsStatusData } from "../../../../utils/graph-data";
import { notifyData } from "../../../../utils/jobs-data";
import StatusBox from "../../../common/StatusBox";

function HomeDashboard() {
	const userData = null;
	return (
		<div>
			<div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
				<StatusBox
					text={"posted jobs"}
					textColor={"blue-500"}
					bgColor={"blue-100"}
					count={22}
					icon={<IoBriefcaseOutline />}
				/>
				<StatusBox
					text={"application"}
					textColor={"red-500"}
					bgColor={"red-100"}
					count={22}
					icon={<FaRegFileAlt />}
				/>
				<StatusBox
					text={"message"}
					textColor={"orange-500"}
					bgColor={"orange-100"}
					count={22}
					icon={<MdOutlineMessage />}
				/>
				<StatusBox
					text={"shortlist"}
					textColor={"green-500"}
					bgColor={"green-100"}
					count={22}
					icon={<IoBookmarkOutline />}
				/>
			</div>

			<div className="grid xl:grid-cols-2 gap-3 mt-4">
				<div className="my-2 bg-white rounded-md shadow-md">
					<h2 className="my-3 mx-4 font-semibold">
						Your Profile Views
					</h2>
					<ViewsGraph data={viewsStatusData} />
				</div>

				<div className="my-2 bg-white rounded-md shadow-md">
					<h2 className="my-3 mx-4 font-semibold">Notifications</h2>
					{notifyData?.map((item, index) => (
						<div
							className="mx-4 py-2 flex items-center gap-2"
							key={index}>
							<div
								className={`p-2 text-base rounded-full ${
									index % 2 === 0
										? "bg-blue-100 text-blue-500"
										: "bg-green-100 text-green-500"
								}`}>
								<MdOutlineWorkOutline />
							</div>
							<div className="flex flex-wrap gap-1">
								<p className="text-sm font-semibold">
									{item.name}
								</p>
								<p className="text-sm text-slate-600">
									applied for a job
								</p>
								<p
									className={`text-sm font-semibold ${
										index % 2 === 0
											? "text-blue-500"
											: "text-green-500"
									}`}>
									{item.position}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="mt-4 py-2 bg-white rounded-md shadow-md">
				<h2 className="my-3 mx-4 font-semibold">Recent Applications</h2>
				<div className="grid lg:grid-cols-2 gap-3 mx-4">
					<CandidateCards
						data={userData}
						maleImg={maleprofile}
						femaleImg={femaleprofile}
					/>
				</div>
			</div>
		</div>
	);
}

export default HomeDashboard;

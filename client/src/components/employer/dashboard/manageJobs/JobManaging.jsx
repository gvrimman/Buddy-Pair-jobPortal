import React from "react";
import ManageTable from "./ManageTable";
import { manageJobsMonthOptions } from "../../../../utils/constants";
import { useSelector } from "react-redux";

function JobManaging() {
	const { pagination } = useSelector((state) => state.employer);
	return (
		<div className="grid bg-white mx-2 p-4 rounded-md shadow ">
			<div className="lg:flex justify-between items-center">
				<h2 className="py-2 text-lg tracking-wide font-semibold">
					Job List
				</h2>
				<p className=" font-semibold">
					Found {pagination?.totalJobs} Jobs
				</p>
				{/* <select
          className=" my-2 p-[21px] bg-customBgColor text-sm tracking-wide border rounded-md focus:outline focus:outline-2 focus:outline-blue-500"
          name="onMonts"
        >
          {manageJobsMonthOptions?.map((item, index) => (
            <option key={index} value={item.value}>
              {item.valueToDisplay}
            </option>
          ))}
        </select> */}
			</div>
			<div className="mt-3 overflow-x-scroll">
				<ManageTable />
			</div>
		</div>
	);
}

export default JobManaging;

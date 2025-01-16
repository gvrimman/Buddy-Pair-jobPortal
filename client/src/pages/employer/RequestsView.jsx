import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { getAppiedJobs, deleteAAppiedJob } from "../../apis/employeeApi";
import { GrFormView } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbLoader2 } from "react-icons/tb";

function RequestsView() {
  const { appliedJobs, isLoading, pagination } = useSelector(
    (state) => state.employee
  );
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAppiedJobs());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteAAppiedJob(id));
  };

  const fetchMoreData = () => {
    if (!pagination.hasNext || isLoading) return;

    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    dispatch(getAppiedJobs(nextPage));
  };

  return (
    <div className="max-w-[900px] w-full">
      <div className="mx-2">
        <div className="flex items-center justify-between my-3">
          <h1 className="text-xl font-semibold tracking-wider text-purple-500">
            Applied Jobs
          </h1>
          <p className="font-semibold text-purple-500">
            You have applied for {pagination?.totalApplied} jobs
          </p>
        </div>
        <div className="grid grid-cols-3 relative bg-white h-12 rounded-full border border-purple-300">
          {["Requests", "Accepted", "Rejected"].map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`text-sm font-medium m-1 py-2 rounded-full transition text-center ${
                activeTab === index
                  ? "bg-purple-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-purple-100 hover:text-purple-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <InfiniteScroll
          dataLength={appliedJobs?.length}
          next={fetchMoreData}
          hasMore={pagination.hasNext}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p className="text-center font-semibold mt-5">No more requests</p>
          }
        >
          {/* job card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-5">
            <div
              className={`fixed inset-0  bg-gray-500 opacity-30 transition  ${
                isLoading ? "block" : "hidden"
              }`}
            ></div>
            <span
              className={`text-purple-900 text-2xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ${
                isLoading ? "block" : "hidden"
              } `}
            >
              <TbLoader2 className="animate-spin" />
            </span>
            {appliedJobs.map((data, i) => (
              <div key={i} className="bg-white shadow rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-2">{data?.jobTitle}</h2>
                <p className="text-gray-600 text-sm mb-1">
                  <span className="font-medium">Location:</span>{" "}
                  {data?.jobPlace}
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  <span className="font-medium">Job Type:</span>{" "}
                  {data?.jobLocation}
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  <span className="font-medium">Applied on:</span>{" "}
                  {new Date(data?.createdAt).toLocaleDateString()}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded">
                    ₹ {data?.offeredSalary} LPA
                  </span>
                  <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded">
                    {data?.status ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {data?.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <button
                    onClick={() => navigate(`/job-portal/job/${data._id}`)}
                    className="flex items-center justify-center w-8 h-8 bg-purple-100 hover:bg-purple-500 text-xl text-purple-500 hover:text-white rounded-lg"
                  >
                    <GrFormView />
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(data._id);
                    }}
                    className="flex items-center justify-center w-8 h-8 bg-purple-100 hover:bg-red-500 text-purple-500 hover:text-white rounded-lg"
                  >
                    <RiDeleteBinLine />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default RequestsView;

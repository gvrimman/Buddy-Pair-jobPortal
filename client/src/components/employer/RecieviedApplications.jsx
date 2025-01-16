import React, { useState, useEffect } from "react";
import { TbLoader2 } from "react-icons/tb";
import { IoEyeOutline } from "react-icons/io5";
import { IoCheckmarkOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import CommentButtons from "../common/CommentButtons";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAcceptedJobs,
  getJobApplicants,
  getRejectedJobs,
  acceptAJob,
  rejectAJob,
} from "../../apis/employerApi";
import { clearApplicants } from "../../Redux/reducers/employerReducer";
import InfiniteScroll from "react-infinite-scroll-component";
import useListenNotification from "../../hooks/useListenNotification";
import { useSocket } from "../../hooks/useSocket";

function RecieviedApplications() {
  useSocket();
  const { applicants, acceptedApplicants, rejected, isLoading, hasMore } =
    useSelector((state) => state.employer);
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(1);
  const { jobId: id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sendNotifications } = useListenNotification();

  useEffect(() => {
    dispatch(clearApplicants());
    dispatch(getJobApplicants({ id, page }));
  }, []);

  useEffect(() => {
    dispatch(getAcceptedJobs());
    dispatch(getRejectedJobs());
  }, [dispatch]);

  const fetchMoreData = () => {
    if (!hasMore || isLoading) return;

    const nextPage = page + 1;
    setPage(nextPage);
    dispatch(getJobApplicants({ id, nextPage }));
    dispatch(getAcceptedJobs());
    dispatch(getRejectedJobs());
  };

  const handleApprove = async (jobId, userId) => {
    try {
      dispatch(acceptAJob(jobId, userId));
      dispatch(getAcceptedJobs());
      sendNotifications(
        userId,
        "accept",
        "You have been accepted for this job",
        `job/${jobId}`
      );
    } catch (error) {
      console.error("Error approving job:", error);
    }
  };

  const handleReject = async (jobId, userId) => {
    try {
      dispatch(rejectAJob(jobId, userId));
      dispatch(getRejectedJobs());
      sendNotifications(
        userId,
        "reject",
        "Your Job application has been rejected",
        `job/${jobId}`
      );
    } catch (error) {
      console.error("Error rejecting job:", error);
    }
  };

  return (
    <>
      <h4 className="font-semibold text-fs-sm underline underline-offset-4 mt-4">
        Recieved Applicants({applicants?.length})
      </h4>
      <div className="mt-5 sticky top-10">
        <div className="grid grid-cols-3 relative bg-white h-12 rounded-full border border-purple-300">
          {["Pending", "Approved", "Rejected"].map((tab, index) => (
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
        {/* job card grid */}
        <InfiniteScroll
          dataLength={applicants?.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p className="text-center font-semibold mt-5">No more applicants</p>
          }
        >
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
            {applicants.map((data, i) => (
              <div key={i} className="bg-white shadow rounded-lg p-4">
                <div
                  onClick={() =>
                    navigate(`/job-portal/profile/${data?.applicant?.userId}`)
                  }
                  className="flex items-center gap-3 mb-3 cursor-pointer"
                >
                  <div className="w-12 overflow-hidden rounded-full">
                    <img
                      src={
                        data?.applicant?.profileImage
                          ? data?.applicant?.profileImage
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5UsMY1i6v3JJUPiywpxzqPR0LixTR3WH-3g&s"
                      }
                      className="w-full h-full"
                      alt={data?.applicant?.username}
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">
                      {data?.applicant?.username}
                    </h2>
                    <span className="text-sm font-bold">
                      Applied for {data?.jobTitle}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-1">
                  <span className="font-medium">Location:</span>{" "}
                  {data?.applicant.location || "Not Avaliable"}
                </p>
                {data?.applicant.workExperience && (
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Experience:</span>{" "}
                    {data?.applicant.workExperience}{" "}
                    {data?.applicant.workExperience === "fresher"
                      ? ""
                      : "Years"}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded">
                    {data?.applicant.email}
                  </span>
                  <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded">
                    {data?.applicant.phone}
                  </span>
                  {data?.skills?.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-3">
                  <div
                    onClick={() =>
                      navigate(`/job-portal/candidate/${data?.applicant?._id}`)
                    }
                  >
                    <CommentButtons
                      icon={<IoEyeOutline />}
                      text={"View Application"}
                    />
                  </div>

                  <div
                    onClick={() => {
                      handleApprove(data?._id, data?.applicant?.userId);
                    }}
                    className={`${
                      acceptedApplicants.some(
                        (acc) =>
                          acc._id === data?._id &&
                          acc.applicant._id === data?.applicant?.userId
                      )
                        ? "opacity-50 pointer-events-none"
                        : ""
                    } ${
                      rejected.some(
                        (rej) =>
                          rej._id === data?._id &&
                          rej.applicant._id === data?.applicant?.userId
                      )
                        ? "hidden pointer-events-none"
                        : ""
                    }`}
                  >
                    <CommentButtons
                      icon={<IoCheckmarkOutline />}
                      text={"Approve Application"}
                    />
                  </div>
                  <div
                    onClick={() => {
                      handleReject(data?._id, data?.applicant?.userId);
                    }}
                    className={`${
                      rejected.some(
                        (rej) =>
                          rej._id === data?._id &&
                          rej.applicant._id === data?.applicant?.userId
                      )
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }${
                      acceptedApplicants.some(
                        (acc) =>
                          acc._id === data?._id &&
                          acc.applicant._id === data?.applicant?.userId
                      )
                        ? "hidden pointer-events-none"
                        : ""
                    }`}
                  >
                    <CommentButtons
                      icon={<IoCloseOutline />}
                      text={"Reject Application"}
                    />
                  </div>
                  {/* <CommentButtons
						icon={<MdOutlineDeleteOutline />}
						text={"Delete Application"}
					/> */}
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
}

export default RecieviedApplications;

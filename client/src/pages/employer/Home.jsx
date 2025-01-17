import React, { useEffect, useState } from "react";
import { TbLoader2 } from "react-icons/tb";
import Filter from "./../../components/common/Filter";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  fetchPreferedJobs,
  fetchSimilarProfiles,
} from "../../apis/employeeApi";
import { clearJobs, clearProfiles } from "../../Redux/reducers/employeeReducer";
import ProfileGrid from "../../components/common/ProfileGrid";
import JobGrid from "../../components/common/JobGrid";
const Home = () => {
  const { jobs, profiles, isLoading, hasMore, query } = useSelector(
    (state) => state.employee
  );

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = () => {
    setPage(1);
    if (activeTab) {
      dispatch(clearProfiles());
      dispatch(fetchSimilarProfiles(query));
    } else {
      dispatch(clearJobs());
      dispatch(fetchPreferedJobs(query));
    }
  };

  const fetchMoreData = () => {
    if (!hasMore || isLoading) return;

    const nextPage = page + 1;
    setPage(nextPage);
    if (activeTab) {
      dispatch(fetchSimilarProfiles({ ...query, page: nextPage }));
    } else {
      dispatch(fetchPreferedJobs({ ...query, page: nextPage }));
    }
  };

  return (
    <div className="max-w-[900px]">
      <Filter search={fetchData} />
      <div className="h-[2px] rounded-lg bg-purple-500 my-4"></div>
      <div className="mx-2">
        <div className="relative">
          <div className="grid grid-cols-2 relative shadow bg-white h-12 rounded-full border border-purple-300">
            {["Find Jobs", "Similar Jobs"].map((tab, index) => (
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
        </div>
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
          <TbLoader2 className="animate-spin text-lg" />
        </span>
        <InfiniteScroll
          dataLength={activeTab ? profiles?.length : jobs?.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4 className="text-center font-semibold">Loading...</h4>}
          endMessage={
            <p className="text-center font-semibold mt-5">
              {activeTab ? "No more Profiles" : "No more jobs"}
            </p>
          }
        >
          {activeTab === 0 ? (
            <>
              <div className="mt-10">
                {jobs?.length === 0 && !isLoading && (
                  <p className="text-center font-semibold text-2xl">
                    No jobs found! Try searching by job title or location
                  </p>
                )}
              </div>
              <JobGrid data={jobs} />
            </>
          ) : (
            <>
              <div className="mt-10">
                {profiles?.length === 0 && !isLoading && (
                  <p className="text-center font-semibold text-2xl">
                    No Profiles found! Try searching by title or location
                  </p>
                )}
              </div>
              <ProfileGrid data={profiles} />
            </>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};
export default Home;

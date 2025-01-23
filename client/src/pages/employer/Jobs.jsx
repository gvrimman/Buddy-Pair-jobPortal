import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import TextInput from "../../components/common/TextInput";
import SelectInput from "../../components/common/SelectInput";
import MultiSelect from "../../components/common/MultiSelect";
import TextAreaInput from "../../components/common/TextAreaInput";
import useFormHandler from "../../hooks/ReactHookForm/Index";
import { jobPostValidation } from "../../utils/yupValidations";
import {
  categoryData,
  experienceData,
  industyTypeOptions,
  jobTypes,
  preferedGenderOptions,
  preferredJobType,
  qualificationOptions,
  skillOptions,
} from "../../utils/constants";
import { createAJob, getPostedJobs, deleteAJob } from "../../apis/employerApi";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import CommentButtons from "../../components/common/CommentButtons";
import DialogModal from "../../components/common/DialogModal";
import SingleJob from "../../components/employer/dashboard/manageJobs/SingleJob";
import { useNavigate } from "react-router-dom";

function Jobs() {
  // redux
  const { jobs, isLoading, pagination, hasMore } = useSelector(
    (store) => store.employer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // states
  const [page, setPage] = useState(1);
  const [jobFormShow, setJobFormShow] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobViewModalOpen, setJobViewModalOpen] = useState(false);

  // fetch data and infinite scroll
  useEffect(() => {
    dispatch(getPostedJobs(page));
  }, [page]);

  // delete a job
  const handleDelete = async (jobId) => {
    dispatch(deleteAJob(jobId));
    dispatch(getPostedJobs(page));
  };

  const fetchMoreData = () => {
    if (!hasMore || isLoading) return;

    const nextPage = page + 1;
    setPage(nextPage);
  };

  // form hook
  const { register, handleSubmit, errors, reset, control, watch } =
    useFormHandler(jobPostValidation);

  const onSubmit = (data) => {
    dispatch(createAJob(data));
    reset();
    setJobFormShow(false);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="max-w-[900px] w-full relative">
      <div className="flex items-center justify-between my-3 mx-2">
        <h5 className="font-semibold text-xl text-theme-500">Posted Jobs</h5>
        <Button
          className="text-white bg-theme-500 hover:bg-theme-600"
          onClick={() => setJobFormShow(true)}
        >
          Post a Job
        </Button>
      </div>

      {/* job post form start */}
      <div
        className={`absolute inset-0 backdrop-blur ${
          jobFormShow ? "block" : "hidden"
        }`}
      ></div>
      <div
        className={`absolute w-full pb-20 top-0 bg-white border-2 shadow rounded-lg p-3 ${
          jobFormShow ? "block" : "hidden"
        }`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4 className="text-center text-lg font-semibold mb-3">
            Post a New Job
          </h4>
          <div className=" flex flex-col gap-3">
            <TextInput
              label={"Job Title"}
              type={"text"}
              registering={register("jobTitle")}
              errors={errors.jobTitle}
            />
            <TextAreaInput
              label={"Job Description"}
              type={"text"}
              registering={register("jobDescription")}
              errors={errors.jobDescription}
            />
          </div>
          <div className="my-2 md:mb-3">
            <MultiSelect
              name={"skills"}
              control={control}
              options={skillOptions}
              placeholder={"Select required skills"}
              registering={register("skills")}
              errors={errors["skills"]}
            />
          </div>
          <div className="mt-3 grid lg:grid-cols-2 gap-4">
            <SelectInput
              label={"Industry"}
              options={industyTypeOptions}
              name={"industry"}
              control={control}
              errors={errors.industry}
            />
            <SelectInput
              label={"Job Type"}
              options={jobTypes}
              name={"jobType"}
              control={control}
              errors={errors.jobType}
            />
            <SelectInput
              label={"Employment Type"}
              name={"employmentType"}
              options={preferredJobType}
              control={control}
              errors={errors.employmentType}
            />
            <SelectInput
              label={"Experience"}
              name={"experience"}
              options={experienceData}
              control={control}
              errors={errors.experience}
            />

            <SelectInput
              label={"Qualification"}
              options={qualificationOptions}
              name={"qualification"}
              control={control}
              errors={errors.qualification}
            />
            <SelectInput
              label={"Preferred Candidate Gender"}
              name={"candidateGender"}
              options={preferedGenderOptions}
              control={control}
              errors={errors.candidateGender}
            />
            <SelectInput
              label={"Location"}
              options={categoryData}
              name={"jobLocation"}
              control={control}
              errors={errors.jobLocation}
            />
            <TextInput
              label={"Offered Salary(12k - 20k)"}
              type={"text"}
              registering={register("offeredSalary")}
              errors={errors.offeredSalary}
            />
            <TextInput
              label={"Application Deadline Dates"}
              type={"date"}
              registering={register("deadline")}
              errors={errors.deadline}
              min={formatDate(new Date())}
              max={formatDate(
                new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
              )}
            />
            <div className="lg:col-span-2">
              <TextInput
                label={"Job Place"}
                type={"text"}
                registering={register("jobPlace")}
                errors={errors.jobPlace}
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <Button
              onClick={() => setJobFormShow(false)}
              type="button"
              className="bg-theme-500 hover:bg-red-800"
            >
              close
            </Button>
            <Button type="submit" className="bg-theme-500 hover:bg-theme-600">
              Post
            </Button>
          </div>
        </form>
      </div>
      {/* job post form end */}

      {/* job card grid */}

      <InfiniteScroll
        dataLength={jobs?.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4 className="text-center font-semibold">Loading...</h4>}
        endMessage={
          <p className="text-center font-semibold mt-5">"No more jobs"</p>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-5">
          {jobs.map((job, i) => (
            <div key={i} className="bg-white shadow rounded-lg p-4">
              <h2
                onClick={() => {
                  navigate(`/job-portal/jobs/${job?._id}`);
                }}
                className="text-lg font-semibold mb-2"
              >
                {job?.jobTitle}
              </h2>

              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-theme-100 text-theme-700 text-xs font-medium px-2 py-1 rounded">
                  Applicants: {job?.applicants?.length}
                </span>
                <span className="bg-theme-100 text-theme-700 text-xs font-medium px-2 py-1 rounded">
                  Selected: {job?.shortListed?.length}
                </span>
              </div>
              <div className="pr-2 py-3 flex gap-2">
                <div
                  onClick={() => {
                    setSelectedJob(job);
                    setJobViewModalOpen(!jobViewModalOpen);
                  }}
                >
                  <CommentButtons
                    icon={<IoEyeOutline />}
                    text={"View Application"}
                  />
                  <DialogModal
                    scale={{ s: "sm", m: "md" }}
                    isOpen={jobViewModalOpen}
                  >
                    <SingleJob
                      data={selectedJob}
                      setJobViewModalOpen={setJobViewModalOpen}
                    />
                  </DialogModal>
                </div>

                <div
                  onClick={() => navigate(`/job-portal/edit/job/${job._id}`)}
                >
                  <CommentButtons
                    icon={<MdOutlineModeEdit />}
                    text={"Edit Application"}
                  />
                </div>
                <div
                  onClick={() => {
                    handleDelete(job._id);
                  }}
                >
                  <CommentButtons
                    icon={<MdOutlineDeleteOutline />}
                    text={"Delete Application"}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default Jobs;

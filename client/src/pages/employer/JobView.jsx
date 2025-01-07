import React, { useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { getJobById } from "../../apis/employeeApi";
import { TbLoader2 } from "react-icons/tb";

function JobView() {
  const { job, isLoading } = useSelector((state) => state.employee);
  const { jobId } = useParams();
  const dispatch = useDispatch();

  console.log("job: ", job);

  useEffect(() => {
    dispatch(getJobById(jobId));
  }, [jobId, dispatch]);

  return (
    <div className="max-w-[900px] w-full">
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
      <div className=" py-2 px-2 rounded-md shadow-md border text-gray-700 text-sm">
        <h4 className="text-center font-semibold text-md">{job?.jobTitle}</h4>
      </div>
      <div className="my-4  shadow-lg border py-3 px-2 rounded-md text-sm leading-6">
        <p>{job?.jobDescription}</p>
      </div>

      <div className="md:grid md:grid-cols-2 md:gap-5">
        <div className="my-4 shadow-lg border py-3 px-2 rounded-md flex gap-2 flex-wrap items-center">
          {job?.skills.map((skill, idx) => (
            <div
              key={idx}
              className=" bg-purple-50 text-purple-600 w-fit px-4 py-1 rounded-full text-sm font-medium"
            >
              {skill}
            </div>
          ))}
        </div>

        <div className="my-4 shadow-lg border py-3 px-2 rounded-md flex items-center gap-2">
          <div className="flex items-center gap-1 bg-purple-50 text-purple-600 w-fit px-4 py-1 rounded-full text-sm font-medium">
            <span>Salary</span>
          </div>
          <span>:</span>
          <div className="flex items-center gap-1 bg-purple-50 text-purple-600 w-fit px-4 py-1 rounded-full text-sm font-medium">
            <span>
              <FaIndianRupeeSign />
            </span>
            <span>{job?.offeredSalary}</span>
          </div>
        </div>

        <div className="my-4  py-3 px-2 rounded-md shadow-lg border  text-sm">
          <p className="font-normal leading-7">
            Experience: <span className="font-semibold">{job?.experience}</span>
          </p>
          <p className="font-normal leading-7">
            Location:{" "}
            <span className="font-semibold">
              {job?.jobPlace}({job?.jobLocation})
            </span>
          </p>
          <p className="font-normal leading-7">
            Application Deadline:{" "}
            <span className="font-semibold">{job?.deadline.split("T")[0]}</span>
          </p>
          <p className="font-normal leading-7">
            Employment Type:{" "}
            <span className="font-semibold">{job?.employmentType}</span>
          </p>
        </div>
      </div>
      <div className="my-4 flex items-center gap-3">
        <Button onClick={()=>{alert("Not yet ready....")}} className="bg-customViolet ">apply</Button>
        <div className="border border-gray-500 flex items-center gap-2 px-2 py-1 rounded-md w-full">
          <div className="overflow-hidden aspect-square border border-gray-300 rounded-full w-8">
            <img
              className="w-full h-full object-cover"
              src={
                job && job?.owner.apps.jobPortal.companyLogo
                  ? job?.owner.apps.jobPortal.companyLogo
                  : "https://images.freeimages.com/fic/images/icons/2463/glossy/512/user_female.png"
              }
            />
          </div>
          <div>
            <p className="text-xs line-clamp-1">
              {job?.owner.apps.jobPortal.companyName}{" "}
              {job?.owner.apps.jobPortal.companyAddress}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobView;

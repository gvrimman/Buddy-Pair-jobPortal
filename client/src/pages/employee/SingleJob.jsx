import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  JobBody,
  JobHead,
  RelatedJob,
} from "../../../../components/job-portal/employee/single-job";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedJob } from "../../../../redux/employeeSlice";

function SingleJob() {
  const { id } = useParams();
  const { success } = useSelector((state) => state.employee);
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(resetEmployeeSuccess());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    dispatch(getSelectedJob(id));
  }, [id, dispatch]);
  return (
    <div className="bg-white mt-20">
      <JobHead />
      <JobBody />
      <RelatedJob />
    </div>
  );
}

export default SingleJob;

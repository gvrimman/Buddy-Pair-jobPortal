import React, { useEffect } from "react";
import {
  SingleCompanyBody,
  SingleCompanyHead,
} from "../../../../components/job-portal/employee/single-company";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCompanyOpenJobs, getSelectedCompany } from "../../../../redux/employeeSlice";

function SingleCompany() {
  const {id} = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSelectedCompany(id))
    dispatch(getCompanyOpenJobs(id))
  }, [id, dispatch]);

  return (
    <div className="bg-white mt-20">
      <SingleCompanyHead />
      <div className="mx-[15px] md:mx-[30px] xl:mx-[50px]">
        <SingleCompanyBody />
      </div>
    </div>
  );
}

export default SingleCompany;

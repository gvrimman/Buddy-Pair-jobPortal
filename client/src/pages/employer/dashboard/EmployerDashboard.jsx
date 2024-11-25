import React, { useEffect } from "react";
import HomeDashboard from "../../../components/employer/dashboard/home/HomeDashboard";
import { useDispatch } from "react-redux";
import { getApplicants, getPostedJobs } from "../../../apis/employerApi";

function EmployerDashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(getPostedJobs());
    dispatch(getApplicants());

  }, []);
  return (
    <>
      <HomeDashboard />
    </>
  );
}

export default EmployerDashboard;

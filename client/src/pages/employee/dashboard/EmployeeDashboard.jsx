import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import HomeDashboard from '../../../components/employee/dashboard/home/HomeDashboard';

function EmployeeDashboard() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAppliedJobs());
  //   dispatch(getBookMarkedJobs());
  //   dispatch(getRecentApplied());
  // },[dispatch])

  return (
    <>
      <HomeDashboard />
    </>
  )
}

export default EmployeeDashboard
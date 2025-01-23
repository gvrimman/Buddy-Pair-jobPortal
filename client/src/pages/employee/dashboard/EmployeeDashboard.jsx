import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import HomeDashboard from '../../../components/employee/dashboard/home/HomeDashboard';
import { getAppiedJobs, getBookmarkedJobs } from '../../../apis/employeeApi';

function EmployeeDashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAppiedJobs());
    dispatch(getBookmarkedJobs());
  },[dispatch])

  return (
    <div className='h-screen'>
      <HomeDashboard />
    </div>
  )
}

export default EmployeeDashboard

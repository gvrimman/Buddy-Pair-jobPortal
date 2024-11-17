import React, { useEffect } from 'react'
import BookMarked from '../../../../../components/job-portal/employee/dashboard/bookmarked/BookMarked'
import { getBookMarkedJobs } from '../../../../../redux/employeeSlice';
import { useDispatch } from 'react-redux';

function EmployeeBookMarked() {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getBookMarkedJobs());
  }, [dispatch]);
  return (
    <>
      <BookMarked />
    </>
  )
}

export default EmployeeBookMarked
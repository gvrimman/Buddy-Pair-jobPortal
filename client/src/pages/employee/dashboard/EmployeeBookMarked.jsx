import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import BookMarked from '../../../components/employee/dashboard/bookmarked/BookMarked';
import { getBookmarkedJobs } from '../../../apis/employeeApi';

function EmployeeBookMarked() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBookmarkedJobs());
  }, [dispatch])

  return (
    <>
      <BookMarked />
    </>
  )
}

export default EmployeeBookMarked
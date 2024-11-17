import React, { useEffect } from 'react'
import Resume from '../../../../../components/job-portal/employee/dashboard/resume/Resume'
import { useDispatch } from 'react-redux';
import { getPreferenceInfos } from '../../../../../redux/employeeSlice';

function EmployeeResume() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPreferenceInfos());
  }, [dispatch])

  return (
    <>
        <Resume />
    </>
  )
}

export default EmployeeResume
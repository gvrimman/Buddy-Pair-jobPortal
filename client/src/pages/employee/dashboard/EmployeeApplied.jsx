import React, { useEffect } from 'react'
import AppliedTable from '../../../../../components/job-portal/employee/dashboard/applied/AppliedTable'
import { useDispatch } from 'react-redux'
import { getAppliedJobs } from '../../../../../redux/employeeSlice';

function EmployeeApplied() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAppliedJobs());
    }, [dispatch]);
  return (
    <>
        <AppliedTable />
    </>
  )
}

export default EmployeeApplied
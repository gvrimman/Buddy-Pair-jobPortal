import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAppiedJobs } from '../../../apis/employeeApi';
import AppliedTable from '../../../components/employee/dashboard/applied/AppliedTable';

function EmployeeApplied() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAppiedJobs());
        
    }, [dispatch]);
  return (
    <div className='h-screen'>
        <AppliedTable />
    </div>
  )
}

export default EmployeeApplied
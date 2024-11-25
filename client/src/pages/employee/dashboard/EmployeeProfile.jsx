import React, { useEffect } from 'react'
import { useDispatch} from "react-redux";
import Profile from '../../../components/employee/dashboard/profile/Profile';

function EmployeeProfile() {
  const dispatch = useDispatch()
  
  return (
    <>
      <Profile />
    </>
  )
}

export default EmployeeProfile
import React, { useEffect } from 'react'
import Profile from '../../../../../components/job-portal/employee/dashboard/profile/Profile'
import { useDispatch} from "react-redux";
import { getCertificateInfos, getEducationInfos, getExperienceInfos, getProfileInfos, getProjectInfos } from '../../../../../redux/employeeSlice';

function EmployeeProfile() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfileInfos());
    dispatch(getEducationInfos());
    dispatch(getExperienceInfos());
    dispatch(getProjectInfos());
    dispatch(getCertificateInfos());
  }, [dispatch])
  
  return (
    <>
      <Profile />
    </>
  )
}

export default EmployeeProfile
import React, { useEffect } from 'react'
import { useDispatch} from "react-redux";
import Profile from '../../../components/employee/dashboard/profile/Profile';

function EmployeeProfile() {
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getProfileInfos());
  //   dispatch(getEducationInfos());
  //   dispatch(getExperienceInfos());
  //   dispatch(getProjectInfos());
  //   dispatch(getCertificateInfos());
  // }, [dispatch])
  
  return (
    <>
      <Profile />
    </>
  )
}

export default EmployeeProfile
import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import InputForms from '../../../InputForms'
import FormButton from '../../../FormButton'
import { changePassword } from '../../../../../redux/employeeSlice';

function PasswordChanging() {
  const [passwordInputs, setPasswordInputs] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const dispatch = useDispatch()

  const handlePasswords = (name, value) => {
    setPasswordInputs({...passwordInputs, [name]: value})
  };

  const handleUpdateBtn = () => {
    console.log(passwordInputs);
    dispatch(changePassword(passwordInputs));
  }

  return (
    <div className="bg-white p-4 grid gap-4 rounded-md shadow">
      <h1 className="text-xl font-semibold tracking-wider">Change Password</h1>
      <InputForms type={"password"} title={"Old Password"} name={"oldPassword"} handleChildValue={handlePasswords} />
      <InputForms type={"password"} title={"New Password"} name={"newPassword"} handleChildValue={handlePasswords} />
      <InputForms type={"password"} title={"Confirm Password"} name={"confirmPassword"} handleChildValue={handlePasswords} />
      <FormButton text={"update"} saveParentValue={handleUpdateBtn} />
    </div>
  )
}

export default PasswordChanging
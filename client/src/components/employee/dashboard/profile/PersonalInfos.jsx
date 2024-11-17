import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputForms from "../../../InputForms";
import FormButton from "../../../FormButton";
import ImgUploader from "../../../ImgUploader";
import { formatDate } from "../../../../../utils/formatDate";
import { updateProfileInfos } from "../../../../../redux/employeeSlice";

function PersonalInfos() {
  const { profile } = useSelector((state) => state.employee);
  const [personalInfos, setPersonalInfos] = useState({
    picture: "",
    username: "",
    email: "",
    phone: "",
    dateOfBirth: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setPersonalInfos({
      picture: profile?.picture,
      username: profile?.username,
      email: profile?.email,
      phone: profile?.phone,
      dateOfBirth: profile?.dateOfBirth,
    });
  }, [profile]);

  const handlePersonalInfos = (name, value) => {
    setPersonalInfos({ ...personalInfos, [name]: value });
  };

  const handlePersonalSave = () => {
    dispatch(updateProfileInfos(personalInfos));
    console.log("PERSONAL: ", personalInfos);
  };

  return (
    <div className="grid bg-white mx-2 p-4 rounded-md shadow">
      <h2 className="py-2 text-lg tracking-wide font-semibold">My Profile</h2>
      <ImgUploader
        boxText={"Browse Image"}
        name={"picture"}
        handleChildValue={handlePersonalInfos}
        value={profile?.picture}
      />
      <div className="mt-5 grid lg:grid-cols-2 gap-3">
        <InputForms
          title={"Name"}
          type={"text"}
          placeText={"Jhon Doal"}
          name={"username"}
          handleChildValue={handlePersonalInfos}
          value={profile?.username}
        />
        <InputForms
          title={"Email Address"}
          type={"email"}
          placeText={"jhondoal@gmail.com"}
          name={"email"}
          handleChildValue={handlePersonalInfos}
          value={profile?.email}
        />
        <InputForms
          title={"Phone"}
          type={"number"}
          placeText={"9988587898"}
          name={"phone"}
          handleChildValue={handlePersonalInfos}
          value={profile?.phone}
        />
        <InputForms
          title={"Date of Birth"}
          type={"date"}
          placeText={"20-12-2002"}
          name={"dateOfBirth"}
          handleChildValue={handlePersonalInfos}
          value={formatDate(profile?.dateOfBirth)}
        />
      </div>
      <FormButton text={"Save"} saveParentValue={handlePersonalSave} />
    </div>
  );
}

export default PersonalInfos;

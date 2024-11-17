import React, { useState } from "react";

import MultiFormBtns from "./MultiFormBtns";
import InputField from "../../../InputField";
import { useDispatch, useSelector } from "react-redux";
import { uploadEducationInfos } from "../../../../redux/employeeSlice";

function Education() {
  const [educationInfos, setEducationInfos] = useState({
    degree: "",
    institution: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    grade: "",
  });

  const dispatch = useDispatch();

  const handleEducationInfos = (name, value) => {
    setEducationInfos({ ...educationInfos, [name]: value });
  };

  const handleEducationSave = () => {
    dispatch(uploadEducationInfos(educationInfos));
  };

  return (
    <div className=" lg:w-4/12 h-[78%] mx-auto my-2 bg-white p-4 shadow-lg">
      <h1 className="text-lg font-semibold">Your Education</h1>
      <InputField
        label={"degree"}
        type={"text"}
        name={"degree"}
        handleChildValue={handleEducationInfos}
      />
      <InputField
        label={"institution"}
        type={"text"}
        name={"institution"}
        handleChildValue={handleEducationInfos}
      />
      <InputField
        label={"field of study"}
        type={"text"}
        name={"fieldOfStudy"}
        handleChildValue={handleEducationInfos}
      />
      <div className="grid grid-cols-2 gap-3">
        <InputField
          label={"start date"}
          type={"date"}
          name={"startDate"}
          handleChildValue={handleEducationInfos}
        />
        <InputField
          label={"end date"}
          type={"date"}
          name={"endDate"}
          handleChildValue={handleEducationInfos}
        />
      </div>
      <InputField
        label={"grade"}
        type={"text"}
        name={"grade"}
        handleChildValue={handleEducationInfos}
      />
      <MultiFormBtns saveParentValue={handleEducationSave} />
    </div>
  );
}

export default Education;

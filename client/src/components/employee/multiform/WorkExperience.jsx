import React, { useState } from "react";

import MultiFormBtns from "./MultiFormBtns";
import SelectionOption from "../../SelectionOption";
import InputField from "../../../InputField";
import { useDispatch } from "react-redux";
import { uploadExperienceInfos } from "../../../../redux/employeeSlice";

function WorkExperience() {
  const [experienceInfos, setExperienceInfos] = useState({
    jobTitle: "",
    company: "",
    startDate: "",
    endDate: "",
    isWorking: "",
    achievements: "",
  });
  const dispatch = useDispatch();

  const handleExperienceInfos = (name, value) => {
    setExperienceInfos({ ...experienceInfos, [name]: value });
  };

  const handleExperienceSave = () => {
    if (experienceInfos.isWorking === "yes") {
      setExperienceInfos({ ...experienceInfos, isWorking: true });
    } else if (experienceInfos.isWorking === "no") {
      setExperienceInfos({ ...experienceInfos, isWorking: false });
    }
    dispatch(uploadExperienceInfos(experienceInfos));
  };

  return (
    <div className="lg:w-4/12 h-[78%] mx-auto my-3 bg-white p-4 shadow-lg">
      <h1 className="text-lg font-semibold">Your Experience</h1>
      <InputField
        label={"job title"}
        type={"text"}
        name={"jobTitle"}
        handleChildValue={handleExperienceInfos}
      />
      <InputField
        label={"company"}
        type={"text"}
        name={"company"}
        handleChildValue={handleExperienceInfos}
      />
      <div className="grid grid-cols-2 gap-3">
        <InputField
          label={"start date"}
          type={"date"}
          name={"startDate"}
          handleChildValue={handleExperienceInfos}
        />
        <InputField
          label={"end date"}
          type={"date"}
          name={"endDate"}
          handleChildValue={handleExperienceInfos}
        />
      </div>
      <SelectionOption
        label={"currently working"}
        choice={["yes", "no"]}
        name={"isWorking"}
        handleChildValue={handleExperienceInfos}
      />
      <InputField
        label={"achievements"}
        type={"text"}
        name={"achievements"}
        handleChildValue={handleExperienceInfos}
      />
      <MultiFormBtns saveParentValue={handleExperienceSave} />
    </div>
  );
}

export default WorkExperience;

import React, { useState } from "react";
import SelectionOption from "../../SelectionOption";
import MultiFormBtns from "./MultiFormBtns";
import InputField from "../../../InputField";
import { useDispatch } from "react-redux";
import { uploadProjectInfos } from "../../../../redux/employeeSlice";

function PersonalProject() {
  const [projectInfos, setProjectInfos] = useState({
    projectName: "",
    description: "",
    startDate: "",
    endDate: "",
    isWorking: "",
    skills: ""
  });
  const dispatch = useDispatch()

  const handleProjectInfos = (name, value) => {
    setProjectInfos({...projectInfos, [name]: value});
  };

  const handleProjectSave = () => {
    if (projectInfos.isWorking === "yes") {
      setProjectInfos({...projectInfos,isWorking: true});
    } else if (projectInfos.isWorking === "no") {
      setProjectInfos({...projectInfos, isWorking: false});
    }
    dispatch(uploadProjectInfos(projectInfos));
  }
  return (
    <div>
      <InputField label={"project name"} type={"text"} name={"projectName"} handleChildValue={handleProjectInfos} />
      <InputField label={"description"} type={"text"} name={"description"} handleChildValue={handleProjectInfos} />
      <div className="grid grid-cols-2 gap-3">
        <InputField label={"start date"} type={"date"} name={"startDate"} handleChildValue={handleProjectInfos} />
        <InputField label={"end date"} type={"date"} name={"endDate"} handleChildValue={handleProjectInfos} />
      </div>
      <SelectionOption label={"Currently Working"} choice={["yes", "no"]} name={"isWorking"} handleChildValue={handleProjectInfos} />
      <InputField label={"skills"} type={"text"} name={"skills"} handleChildValue={handleProjectInfos} />
      <MultiFormBtns saveParentValue={handleProjectSave} />
    </div>
  );
}

export default PersonalProject;

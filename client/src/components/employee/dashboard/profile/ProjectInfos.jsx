import React, { useEffect, useState } from "react";
import InputForms from "../../../InputForms";
import FormButton from "../../../FormButton";
import TextArea from "../../../TextArea";
import { useDispatch, useSelector } from "react-redux";
import ChoiceSelection from "../../../ChoiceSelection";
import { formatDate } from "../../../../../utils/formatDate";
import { updateProjectInfos } from "../../../../../redux/employeeSlice";

function ProjectInfos() {
  const { project } = useSelector((state) => state.employee);

  const [projectInfos, setProjectInfos] = useState({
    projectName: "",
    startDate: "",
    endDate: "",
    isWorking: "",
    skills: "",
    description: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setProjectInfos({
      projectName: project?.projectName,
      startDate: project?.startDate,
      endDate: project?.endDate,
      isWorking: project?.isWorking,
      skills: project?.skills,
      description: project?.description,
    });
  }, [project]);

  const handleProjectInfos = (name, value) => {
    setProjectInfos({ ...projectInfos, [name]: value });
  };

  const handleProjectSave = () => {
    dispatch(updateProjectInfos({ id: project._id, infos: projectInfos }));
    console.log("PROJECT: ", projectInfos);
  };

  return (
    <div className="grid bg-white mx-2 p-4 rounded-md shadow">
      <h2 className="py-2 text-lg tracking-wide font-semibold">My Projects</h2>
      <div className="mt-5 grid lg:grid-cols-2 gap-3">
        <InputForms
          title={"Project Name"}
          type={"text"}
          placeText={"Job Portal"}
          name={"projectName"}
          handleChildValue={handleProjectInfos}
          value={project?.projectName}
        />
        <InputForms
          title={"Start Date"}
          type={"date"}
          placeText={""}
          name={"startDate"}
          handleChildValue={handleProjectInfos}
          value={formatDate(project?.startDate)}
        />
        <InputForms
          title={"End Date"}
          type={"date"}
          placeText={""}
          name={"endDate"}
          handleChildValue={handleProjectInfos}
          value={formatDate(project?.endDate)}
        />

        <ChoiceSelection
          label={"Currently Working"}
          option={"currently working"}
          name={"isWorking"}
          handleChildValue={handleProjectInfos}
        />

        <InputForms
          title={"Used Technologies"}
          type={"text"}
          placeText={"React"}
          name={"skills"}
          handleChildValue={handleProjectInfos}
          value={project?.skills}
        />
        <TextArea
          label={"Description"}
          name={"description"}
          value={project?.description}
          handleChildValue={handleProjectInfos}
          placeText={"A detailed description of the certification or job."}
        />
      </div>

      <FormButton text={"Save"} saveParentValue={handleProjectSave} />
    </div>
  );
}

export default ProjectInfos;

import React, { useEffect, useState } from "react";
import FormButton from "../../../FormButton";
import InputForms from "../../../InputForms";
import SelectionOption from "../../../SelectionOption";
import ChoiceSelection from "../../../ChoiceSelection";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../../../../utils/formatDate";
import { updateExperienceInfos } from "../../../../../redux/employeeSlice";

function ExperienceInfos() {
  const { experience } = useSelector((state) => state.employee);

  const [experienceInfos, setExperienceInfos] = useState({
    jobTitle: "",
    company: "",
    startDate: "",
    endDate: "",
    isWorking: "",
    achievements: "",
  });
  
  const dispatch = useDispatch()

  useEffect(() => {
    setExperienceInfos({
      jobTitle: experience?.jobTitle,
      company: experience?.company,
      startDate: experience?.startDate,
      endDate: experience?.endDate,
      isWorking: experience?.isWorking,
      achievements: experience?.achievements,
    });
  }, [experience]);

  const handleExperienceInfos = (name, value) => {
    setExperienceInfos({ ...experienceInfos, [name]: value });
  };

  const handleExperienceSave = () => {
    dispatch(updateExperienceInfos({id: experience._id, infos: experienceInfos}))
    console.log("Experie: ", experienceInfos);
  };

  return (
    <div className="grid bg-white mx-2 p-4 rounded-md shadow">
      <h2 className="py-2 text-lg tracking-wide font-semibold">
        My Experience
      </h2>
      <div className="mt-5 grid lg:grid-cols-2 gap-3">
        <InputForms
          title={"Job Title"}
          type={"text"}
          placeText={"UI Designer"}
          name={"jobTitle"}
          handleChildValue={handleExperienceInfos}
          value={experience?.jobTitle}
        />
        <InputForms
          title={"Company Name"}
          type={"text"}
          placeText={"TechX"}
          name={"company"}
          handleChildValue={handleExperienceInfos}
          value={experience?.company}
        />
        <InputForms
          title={"Start Date"}
          type={"date"}
          placeText={""}
          name={"startDate"}
          handleChildValue={handleExperienceInfos}
          value={formatDate(experience?.startDate)}
        />
        <InputForms
          title={"End Date"}
          type={"date"}
          placeText={""}
          name={"endDate"}
          handleChildValue={handleExperienceInfos}
          value={formatDate(experience?.endDate)}
        />
        <ChoiceSelection
          label={"Currently Working"}
          name={"isWorking"}
          option={"currently working"}
          handleChildValue={handleExperienceInfos}
        />

        <InputForms
          title={"Achievements"}
          type={"text"}
          name={"achievements"}
          placeText={"Award-Winning Mobile App Design"}
          handleChildValue={handleExperienceInfos}
          value={experience?.achievements}
        />
      </div>
      <FormButton text={"Save"} saveParentValue={handleExperienceSave} />
    </div>
  );
}

export default ExperienceInfos;

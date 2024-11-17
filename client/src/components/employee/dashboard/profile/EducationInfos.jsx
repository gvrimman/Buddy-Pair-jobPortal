import React, { useEffect, useState } from "react";
import InputForms from "../../../InputForms";
import FormButton from "../../../FormButton";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../../../../utils/formatDate";
import { updateEducationInfos } from "../../../../../redux/employeeSlice";

function EducationInfos() {
  const { education } = useSelector((state) => state.employee);

  const [educationalInfos, setEducationalInfos] = useState({
    degree: "",
    institution: "",
    startDate: "",
    endDate: "",
    fieldOfStudy: "",
    grade: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setEducationalInfos({
      degree: education?.degree,
      institution: education?.institution,
      startDate: education?.startDate,
      endDate: education?.endDate,
      fieldOfStudy: education?.fieldOfStudy,
      grade: education?.grade,
    });
  }, [education]);

  const handleEducationInfos = (name, value) => {
    setEducationalInfos({ ...educationalInfos, [name]: value });
  };

  const handleEducationSave = () => {
    dispatch(updateEducationInfos({ id:education._id ,infos:educationalInfos}))
    console.log("EDUCATION: ", educationalInfos);
  };

  return (
    <div className="grid bg-white mx-2 p-4 rounded-md shadow">
      <h2 className="py-2 text-lg tracking-wide font-semibold">My Education</h2>
      <div className="mt-5 grid lg:grid-cols-2 gap-3">
        <InputForms
          title={"Degree"}
          type={"text"}
          placeText={"B.A.English"}
          name={"degree"}
          handleChildValue={handleEducationInfos}
          value={education?.degree}
        />
        <InputForms
          title={"Institution"}
          type={"text"}
          placeText={"JNU University"}
          name={"institution"}
          handleChildValue={handleEducationInfos}
          value={education?.institution}
        />
        <InputForms
          title={"Start Date"}
          type={"date"}
          placeText={""}
          name={"startDate"}
          handleChildValue={handleEducationInfos}
          value={formatDate(education?.startDate)}
        />
        <InputForms
          title={"End Date"}
          type={"date"}
          placeText={"20-12-2002"}
          name={"endDate"}
          handleChildValue={handleEducationInfos}
          value={formatDate(education?.endDate)}
        />
        <InputForms
          title={"Field Of Study"}
          type={"text"}
          placeText={"Literature"}
          name={"fieldOfStudy"}
          handleChildValue={handleEducationInfos}
          value={education?.fieldOfStudy}
        />
        <InputForms
          title={"Grade"}
          type={"text"}
          placeText={"A"}
          name={"grade"}
          handleChildValue={handleEducationInfos}
          value={education?.grade}
        />
      </div>
      <FormButton text={"Save"} saveParentValue={handleEducationSave} />
    </div>
  );
}

export default EducationInfos;

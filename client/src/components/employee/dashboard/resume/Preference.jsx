import React, { useEffect, useState } from "react";
import FormButton from "../../../FormButton";
import InputForms from "../../../InputForms";
import FileUploader from "../../../FileUploader";
import TextArea from "../../../TextArea";
import { useDispatch, useSelector } from "react-redux";
import { updatePreferenceInfos } from "../../../../../redux/employeeSlice";

function Preference() {
  const { preference } = useSelector((state) => state.employee);

  const [preferenceInfos, setPreferenceInfos] = useState({
    resume: "",
    currentCTC: "",
    expectedCTC: "",
    totalExperience: "",
    skills: "",
    languages: "",
    aboutYourSelf: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setPreferenceInfos({
      resume: preference?.resume,
      currentCTC: preference?.currentCTC,
      expectedCTC: preference?.expectedCTC,
      totalExperience: preference?.totalExperience,
      skills: preference?.skills,
      languages: preference?.languages,
      aboutYourSelf: preference?.aboutYourSelf,
    });
  }, [preference]);

  const handlePreferenceInfos = (name, value) => {
    setPreferenceInfos({ ...preferenceInfos, [name]: value });
  };

  const handlePreferenceSave = () => {
    dispatch(
      updatePreferenceInfos({ id: preference._id, infos: preferenceInfos })
    );
    console.log("PREFERENCE: ", preferenceInfos);
  };

  return (
    <div className="grid bg-white mx-2 p-4 rounded-md shadow">
      <h2 className="py-2 text-lg tracking-wide font-semibold">My Resume</h2>
      <FileUploader
        boxText={"Browse Resume"}
        name={"resume"}
        handleChildValue={handlePreferenceInfos}
        value={preference?.resume}
      />
      <div className="mt-5 grid lg:grid-cols-2 gap-3">
        <InputForms
          title={"Current CTC"}
          type={"text"}
          placeText={"500000"}
          name={"currentCTC"}
          handleChildValue={handlePreferenceInfos}
          value={preference?.currentCTC}
        />
        <InputForms
          title={"Expected CTC"}
          type={"text"}
          placeText={"800000"}
          name={"expectedCTC"}
          handleChildValue={handlePreferenceInfos}
          value={preference?.expectedCTC}
        />
        <InputForms
          title={"Total Experience"}
          type={"text"}
          placeText={"4 year"}
          name={"totalExperience"}
          handleChildValue={handlePreferenceInfos}
          value={preference?.totalExperience}
        />
        <InputForms
          title={"skills"}
          type={"text"}
          placeText={"Responsive Design"}
          name={"skills"}
          handleChildValue={handlePreferenceInfos}
          value={preference?.skills}
        />
        <InputForms
          title={"language"}
          type={"text"}
          placeText={"English"}
          name={"languages"}
          handleChildValue={handlePreferenceInfos}
          value={preference?.languages}
        />
        <TextArea
          name={"aboutYourSelf"}
          label={"About YourSelf"}
          value={preference?.aboutYourSelf}
          handleChildValue={handlePreferenceInfos}
          placeText={"A detailed description of the certification or job."}
        />
      </div>
      <FormButton text={"Save"} saveParentValue={handlePreferenceSave} />
    </div>
  );
}

export default Preference;

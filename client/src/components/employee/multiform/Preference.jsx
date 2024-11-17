import React, { useRef, useState } from "react";
import { FaRegFile } from "react-icons/fa";

import MultiFormBtns from "./MultiFormBtns";
import InputField from "../../../InputField";

import { uploadFile } from "../../../../utils/uploadFuncs";
import { useDispatch } from "react-redux";
import { uploadPreferenceInfos } from "../../../../redux/employeeSlice";

function Preference() {
  const [preferenceInfos, setPreferenceInfos] = useState({
    resume: "",
    currentCTC: "",
    expectedCTC: "",
    totalExperience: "",
    prefferedLocation: "",
    skills: "",
    languages: "",
    aboutYourSelf: "",
  });
  const [fileError, setFileError] = useState("");
  const dispatch = useDispatch();

  const fileRef = useRef(null);
  const maxSize = 5 * 1024 * 1024;

  const handleUploadFile = async (e) => {
    const file = await e.target.files[0];

    uploadFile(file, maxSize)
      .then((data) => {
        setPreferenceInfos({ ...preferenceInfos, resume: data });
      })
      .catch((error) => {
        setFileError(error);
      });
  };

  const handlePreferenceInfos = (name, value) => {
    setPreferenceInfos({ ...preferenceInfos, [name]: value });
  };

  const handlePreferenceSave = () => {
    dispatch(uploadPreferenceInfos(preferenceInfos));
  };

  return (
    <div className="lg:w-4/12 h-[78%] mx-auto my-3 bg-white p-4 shadow-lg overflow-y-auto overscroll-contain">
      <h1 className="text-lg font-semibold my-1">Your Preference</h1>
      <div className="flex justify-between items-center mb-3">
        <div
          className={`w-12 lg:w-14 h-12 lg:h-14 p-2 flex justify-center items-center text-2xl lg:text-3xl border-2 ${
            preferenceInfos?.resume
              ? "border-[#20c997] text-[#20c997]"
              : "border-[#673ab7] text-[#673ab7]"
          }  rounded-full`}
        >
          <FaRegFile />
        </div>
        <button
          onClick={() => fileRef.current.click()}
          className="h-fit text-sm lg:text-md bg-[#673ab7] text-white font-semibold px-1 lg:px-3 py-2 outline outline-1 rounded-lg"
        >
          Upload Your Resume
          <input type="file" hidden ref={fileRef} onChange={handleUploadFile} />
        </button>
        {fileError && (
          <span className="text-rose-600 text-sm">{fileError}</span>
        )}
      </div>

      <InputField
        label={"current CTC"}
        type={"text"}
        name={"currentCTC"}
        handleChildValue={handlePreferenceInfos}
      />
      <InputField
        label={"expected CTC"}
        type={"text"}
        name={"expectedCTC"}
        handleChildValue={handlePreferenceInfos}
      />
      <InputField
        label={"total experience"}
        type={"text"}
        name={"totalExperience"}
        handleChildValue={handlePreferenceInfos}
      />
      <InputField
        label={"preffered location"}
        type={"text"}
        name={"prefferedLocation"}
        handleChildValue={handlePreferenceInfos}
      />
      <InputField
        label={"skills"}
        type={"text"}
        name={"skills"}
        handleChildValue={handlePreferenceInfos}
      />
      <InputField
        label={"languages"}
        type={"text"}
        name={"languages"}
        handleChildValue={handlePreferenceInfos}
      />

      <div className="grid gap-2 my-2">
        <label className="capitalize text-md font-medium">
          describe yourself
        </label>
        <textarea
          rows={3}
          className="p-2 outline outline-2 outline-[#673ab7] focus:outline foucus:outline-1 focus:outline-[#673ab7] rounded-lg"
          onChange={(e) =>
            setPreferenceInfos({
              ...preferenceInfos,
              aboutYourSelf: e.target.value,
            })
          }
        ></textarea>
      </div>

      <MultiFormBtns saveParentValue={handlePreferenceSave} />
    </div>
  );
}

export default Preference;

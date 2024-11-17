import React, { useState } from "react";
import MultiFormBtns from "./MultiFormBtns";
import InputField from "../../../InputField";
import { useDispatch } from "react-redux";
import { uploadCertificateInfos } from "../../../../redux/employeeSlice";

function Certificate() {
  const [certificateInfos, setCertificateInfos] = useState({
    certificateName: "",
    issuedOrganization: "",
    startDate: "",
    endDate: "",
    description: ""  
  });
  const dispatch = useDispatch()
  
  const handleCertificateInfos = (name, value) => {
    setCertificateInfos({...certificateInfos, [name]:value})
  };

  const handleCertificateSave = () => {
    dispatch(uploadCertificateInfos(certificateInfos));
  };

  return (
    <div>
      <InputField label={"certificate name"} type={"text"} name={"certificateName"} handleChildValue={handleCertificateInfos} />
      <InputField label={"issued organization"} type={"text"} name={"issuedOrganization"} handleChildValue={handleCertificateInfos} />
      <div className="grid grid-cols-2 gap-3">
        <InputField label={"start date"} type={"date"} name={"startDate"} handleChildValue={handleCertificateInfos} />
        <InputField label={"end date"} type={"date"} name={"endDate"} handleChildValue={handleCertificateInfos} />
      </div>
      <InputField label={"description"} type={"text"} name={"description"} handleChildValue={handleCertificateInfos} />
      <MultiFormBtns saveParentValue={handleCertificateSave} />
    </div>
  );
}

export default Certificate;

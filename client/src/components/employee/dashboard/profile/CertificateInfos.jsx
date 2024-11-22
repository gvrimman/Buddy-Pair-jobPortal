import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../../../common/TextInput";
import FormButton from "../../../common/FormButton";
import TextAreaInput from "../../../common/TextAreaInput";
import { formatDate } from "../../../../utils/formatDate";

function CertificateInfos() {
  const { certification } = useSelector((state) => state.employee);

  const [certificationInfos, setCertificationInfos] = useState({
    certificateName: "",
    issuedOrganization: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const dispatch = useDispatch()

  useEffect(() => {
    setCertificationInfos({
      certificateName: certification?.certificateName,
      issuedOrganization: certification?.issuedOrganization,
      startDate: certification?.startDate,
      endDate: certification?.endDate,
      description: certification?.description,
    });
  }, [certification]);

  const handleCertificationInfos = (name, value) => {
    setCertificationInfos({ ...certificationInfos, [name]: value });
  };

  const handleCertificationSave = () => {
    dispatch(updateCertificationInfos({id:certification._id, infos: certificationInfos}))
    console.log("CERTI: ", certificationInfos);
  };

  return (
    <div className="grid bg-white mx-2 p-4 rounded-md shadow">
      <h2 className="py-2 text-lg tracking-wide font-semibold">
        My Certification
      </h2>
      <div className="mt-5 grid lg:grid-cols-2 gap-3">
        <TextInput
          title={"Certification"}
          type={"text"}
          placeText={"Google Cloud Certified"}
          name={"certificateName"}
          handleChildValue={handleCertificationInfos}
          value={certification?.certificateName}
        />
        <TextInput
          title={"Issued"}
          type={"text"}
          placeText={"Google"}
          name={"issuedOrganization"}
          handleChildValue={handleCertificationInfos}
          value={certification?.issuedOrganization}
        />
        <TextInput
          title={"Start Date"}
          type={"date"}
          placeText={""}
          name={"startDate"}
          handleChildValue={handleCertificationInfos}
          value={formatDate(certification?.startDate)}
        />
        <TextInput
          title={"End Date"}
          type={"date"}
          placeText={""}
          name={"endDate"}
          handleChildValue={handleCertificationInfos}
          value={formatDate(certification?.endDate)}
        />
        <TextAreaInput
          label={"Description"}
          name={"description"}
          value={certification?.description}
          handleChildValue={handleCertificationInfos}
          placeText={"A detailed description of the certification or job."}
        />
      </div>
      <FormButton text={"Save"} saveParentValue={handleCertificationSave} />
    </div>
  );
}

export default CertificateInfos;

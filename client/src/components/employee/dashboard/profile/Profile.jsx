import React from "react";
import PersonalInfos from "./PersonalInfos";
import EducationInfos from "./EducationInfos";
import CertificateInfos from "./CertificateInfos";
import ExperienceInfos from "./ExperienceInfos";
import ProjectInfos from "./ProjectInfos";

function Profile() {
  return (
    <div className="grid gap-5">
      <PersonalInfos />
      <EducationInfos />
      {/* <CertificateInfos /> */}
      <ExperienceInfos />
      <ProjectInfos />
    </div>
  );
}

export default Profile;

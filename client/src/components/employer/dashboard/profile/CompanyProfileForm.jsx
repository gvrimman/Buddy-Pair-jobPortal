import React, { useEffect, useState } from "react";

import ProfileForm from "./ProfileForm";
import SocialProfileForm from "./SocialProfileForm";
import ContactForm from "./ContactForm";

function CompanyProfileForm() {


  return (
    <div className="grid gap-5 max-w-[900px] w-full">
      <ProfileForm />
      <SocialProfileForm />
      {/* <ContactForm  /> */}
    </div>
  );
}

export default CompanyProfileForm;

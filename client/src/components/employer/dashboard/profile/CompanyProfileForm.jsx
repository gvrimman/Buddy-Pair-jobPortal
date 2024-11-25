import React, { useEffect, useState } from "react";

import ProfileForm from "./ProfileForm";
import SocialProfileForm from "./SocialProfileForm";
import ContactForm from "./ContactForm";

function CompanyProfileForm() {


  return (
    <div className="grid gap-5">
      <ProfileForm  />
      <SocialProfileForm />
      {/* <ContactForm  /> */}
    </div>
  );
}

export default CompanyProfileForm;

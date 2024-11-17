import React from "react";
import { useSelector } from "react-redux";

import WorkExperience from "./WorkExperience";
import Education from "./Education";
import Professional from "./Professional";
import Preference from "./Preference";

function MultiFormBody() {
  const { pageIndex } = useSelector((state) => state.employeeInfo);
  return (
    <div className="h-full flex justify-center">
      {pageIndex === 1 && <Education />}
      {pageIndex === 2 && <WorkExperience />}
      {pageIndex === 3 && <Professional />}
      {pageIndex === 4 && <Preference />}
    </div>
  );
}

export default MultiFormBody;

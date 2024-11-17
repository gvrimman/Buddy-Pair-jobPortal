import React from "react";
import TextSearch from "../../common/TextSearch";

function CompaniesSideSection() {
  return (
    <div className="h-fit my-5 p-3 hidden lg:grid gap-4 bg-customBgColor">
      <TextSearch firsttitle={"Search by keywords"} secondtitle={"Location"} />
    </div>
  );
}

export default CompaniesSideSection;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CompaniesHead from "./CompaniesHead";
import BodySection from "./BodySection";

function CompaniesSection({ toggleValue, setToggleValue }) {
  // const { success } = useSelector((state) => state.employee);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (success) {
  //     const timer = setTimeout(() => {
  //       dispatch(resetEmployeeSuccess())
  //     }, 5000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [success]);

  return (
    <div
      className={`h-screen col-span-3 py-5 ms-8 mr-2 ${
        toggleValue && "blur-md overflow-hidden"
      }`}
    >
      <CompaniesHead setToggleValue={setToggleValue} />
      <BodySection />
    </div>
  );
}

export default CompaniesSection;

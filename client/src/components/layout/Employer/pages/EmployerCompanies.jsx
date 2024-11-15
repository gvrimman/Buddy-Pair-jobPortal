import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
// import { getOtherCompanies } from '../../../../redux/employerSlice';
import CompaniesSideSection from '../components/companies/CompaniesSideSection';
import CompaniesSideBar from '../components/companies/CompaniesSideBar';
import CompaniesSection from '../components/companies/CompaniesSection';

function EmployerCompanies() {
  const [toggleJobSection, setToggleJobSection] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getOtherCompanies());
  }, [dispatch]);

  return (
    <div className="max-w-[1440px] py-8 mx-auto px-7 grid lg:grid-cols-4">
      <CompaniesSideSection />
      <CompaniesSideBar
        toggleValue={toggleJobSection}
        setToggleValue={setToggleJobSection}
      />
      <CompaniesSection
        toggleValue={toggleJobSection}
        setToggleValue={setToggleJobSection}
      />
    </div>
  );
}

export default EmployerCompanies
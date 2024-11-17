import React, { useEffect } from 'react'
import CompanyHead from './CompanyHead'
import CompanyBody from './CompanyBody'

function CompanySection({ toggleValue, setToggleValue }) {

  return (
    <div
      className={`h-screen col-span-3 py-5 ms-8 mr-2 ${
        toggleValue && "blur-md overflow-hidden"
      }`}
    >
      <CompanyHead setToggleValue={setToggleValue} />
      <CompanyBody />
    </div>
  )
}

export default CompanySection
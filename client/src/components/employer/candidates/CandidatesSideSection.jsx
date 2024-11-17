import React from 'react'
import { categoryData, experienceData } from '../../../utils/constants.js'
import TextSearch from '../../common/TextSearch.jsx'
import OptionSearch from '../../common/OptionSearch.jsx'
import SwitchSearch from '../../common/SwitchSearch.jsx'
import RadioSearch from '../../common/RadioSearch.jsx'
import { jobTypeData, postedDateData } from '../../../utils/job-search.js'


function CandidatesSideSection() {
  return (
    <div className="my-5 p-3 hidden lg:grid gap-4 bg-customBgColor rounded-lg ">
      <TextSearch firsttitle={"Search by keywords"} secondtitle={"Location"}  />
      <OptionSearch title={"Category"} contents={categoryData}  />
      {/* <SwitchSearch title={"Job Type"} contents={jobTypeData}  /> */}
      <RadioSearch title={"Date Posted"} contents={postedDateData}  />
      {/* <SwitchSearch title={"Experience"} contents={experienceData}  /> */}
    </div>
  )
}

export default CandidatesSideSection
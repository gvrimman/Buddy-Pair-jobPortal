import React from 'react'

function ChoiceSelection({label, option, name, handleChildValue}) {

  const handleChoiceSelection = (e) => {
    const newValue = e.target.value;
    handleChildValue(name, newValue)
  };
    
  return (
    <div className="grid">
          <label className="text-sm font-semibold">{label}</label>
          <select onChange={handleChoiceSelection} className="ms-1 my-2 p-[21px] bg-gray-200 placeholder:text-slate-500 text-sm font-semibold tracking-wide rounded-md focus:bg-white focus:outline focus:outline-2 focus:outline-blue-500">
            <option className="capitalize">
              {option}
            </option>
            <option value="true" className="capitalize">
              yes
            </option>
            <option value="false" className="capitalize">
              no
            </option>
          </select>
        </div>
  )
}

export default ChoiceSelection

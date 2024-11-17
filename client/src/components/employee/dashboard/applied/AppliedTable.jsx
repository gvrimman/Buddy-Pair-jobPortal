import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { resetEmployeeSuccess } from "../../../../../redux/employeeSlice";
import TableBody from "../TableBody";
import TableHead from "../TableHead";

function AppliedTable() {
  const { appliedJobs, success } = useSelector((state) => state.employee);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(resetEmployeeSuccess());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);
  return (
    <div className="bg-white p-4 grid gap-4 rounded-md shadow">
      <h1 className="text-xl font-semibold tracking-wider">Applied Jobs</h1>
      <table>
        <thead className="bg-blue-100 text-blue-500">
            <TableHead />
        </thead>
        <tbody>
          {appliedJobs?.map((job, index) => (
            <TableBody key={index} job={job} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppliedTable;

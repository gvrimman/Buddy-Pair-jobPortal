import React from 'react'
import TableBody from '../TableBody'
import TableHead from '../TableHead'
import { useSelector } from 'react-redux'

function BookMarked() {
    const { bookMarkedJobs } = useSelector((state) => state.employee);
    
  return (
    <div className="bg-white p-4 grid gap-4 rounded-md shadow">
      <h1 className="text-xl font-semibold tracking-wider">BookMarked Jobs</h1>
      <table>
        <thead className="bg-blue-100 text-blue-500">
            <TableHead />
        </thead>
        <tbody>
          {bookMarkedJobs?.map((job, index) => (
            <TableBody key={index} job={job} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BookMarked
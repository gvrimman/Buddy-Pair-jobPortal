import React from "react";

function TableHead() {
  return (
    <tr >
      <th className="p-4 text-start">Job Title</th>
      <th className="p-4 text-start">Date Applied</th>
      <th className="p-4 text-start">Status</th>
      <th className="p-4 text-start">Action</th>
    </tr>
  );
}

export default TableHead;

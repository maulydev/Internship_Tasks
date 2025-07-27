"use client";

import { FormData } from "@/types";

const CSVPreview = ({ previewData }: { previewData: FormData[] }) => {
  console.log(previewData);
  return (
    <div className="min-h-96">
      <table className="table-auto border-collapse w-full text-sm">
        <thead>
          <tr className="[&>*]:text-start [&>*]:p-2 bg-blue-500 text-white">
            <th className="px-2 py-1">SN</th>
            <th className="px-2 py-1">First Name</th>
            <th className="px-2 py-1">Last Name</th>
            <th className="px-2 py-1">Phone</th>
            <th className="px-2 py-1">Email</th>
            <th className="px-2 py-1">Salary</th>
            <th className="px-2 py-1">Joined Date</th>
            <th className="px-2 py-1">Position</th>
            <th className="px-2 py-1">Department</th>
          </tr>
        </thead>
        {previewData?.length > 0 && (
          <tbody>
            {previewData?.map((emp, index) => (
              <tr key={index} className="[&>*]:p-4 hover:bg-blue-50 even:bg-blue-0 font-normal">
                <td className="px-2 py-1">
                  {index + 1}
                </td>
                <td className="px-2 py-1">
                  {emp.firstName}
                </td>
                <td className="px-2 py-1">
                  {emp.lastName}
                </td>
                <td className="px-2 py-1 max-w-24 truncate">
                  {emp.phone}
                </td>
                <td className="px-2 py-1 max-w-24 truncate">
                  {emp.email}
                </td>
                <td className="px-2 py-1">
                  {emp.salary}
                </td>
                <td className="px-2 py-1">
                  {emp.joinedDate}
                </td>
                <td className="px-2 py-1 max-w-24 truncate">
                  {emp.position}
                </td>
                <td className="px-2 py-1 max-w-24 truncate">
                  {emp.department}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default CSVPreview;

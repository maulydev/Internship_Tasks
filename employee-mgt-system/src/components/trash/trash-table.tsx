"use client";

import { FaSearch } from "react-icons/fa";
import { useFetchTrashedEmployees } from "@/hooks/trash";
import DeleteButton from "./buttons/delete-button";
import RestoreButton from "./buttons/restore-button";
import { BiTrash } from "react-icons/bi";
import RestoreAllButton from "./buttons/restore-all-button";
import EmptyTrashButton from "./buttons/empty-trash-button";

const TrashTable = () => {
  const {
    data: employees = [],
    isLoading,
    isError,
    error,
  } = useFetchTrashedEmployees();

  return (
    <>
      <div className="bg-white shadow-xl p-6 container mx-auto">
        {isLoading && (
          <div className="text-center py-20 text-gray-500">Loading...</div>
        )}

        {isError && (
          <div className="text-center py-20 text-red-500">
            Failed to load employees: {error?.message || "Something went wrong"}
          </div>
        )}

        {!isLoading && !isError && (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
              <span className="flex gap-x-4">
                <div className="flex items-center gap-x-4 bg-gray-100 pl-6 pr-4">
                  <input
                    type="text"
                    name="searchTerm"
                    placeholder="Search employee"
                    className="py-4 outline-none min-w-xs"
                  />
                  <FaSearch />
                </div>
              </span>
              <span className="flex flex-nowrap gap-x-4 [&>*]:px-8 [&>*]:py-4 [&>*]:cursor-pointer text-white font-bold">
                <RestoreAllButton disabled={employees?.length === 0} />
                <EmptyTrashButton disabled={employees?.length === 0} />
              </span>
            </div>

            {employees.length > 0 ? (
              <table className="w-full mt-8">
                <thead>
                  <tr className="[&>*]:text-start [&>*]:p-4 bg-red-500 text-white">
                    <th>Sn</th>
                    <th>Emp ID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Position</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp, idx) => (
                    <tr
                      key={emp.id}
                      className="[&>*]:p-4 hover:bg-red-50 even:bg-blue-0"
                    >
                      <td>{idx + 1}</td>
                      <td>{emp.empId || `Emp00${idx + 1}`}</td>
                      <td>{`${emp.firstName} ${emp.lastName}`}</td>
                      <td>{emp.phone}</td>
                      <td>{emp.position?.name}</td>
                      <td>{emp.department?.name || "N/A"}</td>
                      <td>{emp.status || "Active"}</td>
                      <td className="space-x-2">
                        <RestoreButton selectedEmpId={emp?.empId} />
                        <DeleteButton selectedEmpId={emp?.empId} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-16 text-gray-400 text-center bg-gray-100 mt-4 font-bold flex flex-col items-center">
                <BiTrash className="text-8xl" />
                <p>Empty Trash</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default TrashTable;

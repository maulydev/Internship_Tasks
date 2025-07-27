"use client";

import { FaSearch } from "react-icons/fa";
import ImportTrigger from "./buttons/import-trigger";
import AddButton from "./buttons/add-button";
import { BsPeople } from "react-icons/bs";
import { useFetchEmployees } from "@/hooks/employees";
import ViewButton from "./buttons/view-button";
import EditButton from "./buttons/edit-button";
import TrashButton from "./buttons/trash-button";
import { useState } from "react";
import { useDebounce } from "use-debounce";

const EmployeeTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 300);
  const [statusFilter, setStatusFilter] = useState<"ACTIVE" | "INACTIVE">("ACTIVE");

  const {
    data: employees = [],
    isLoading,
    isError,
    error,
  } = useFetchEmployees(debouncedSearch, statusFilter);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value as "ACTIVE" | "INACTIVE");
  };

  console.log(statusFilter);

  return (
    <div className="bg-white shadow-xl p-6 container mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
        <span className="flex gap-x-4">
          <div className="flex items-center gap-x-4 bg-gray-100 pl-6 pr-4">
            <input
              autoFocus
              type="text"
              name="searchTerm"
              value={searchTerm}
              placeholder="Search employee"
              className="py-4 outline-none min-w-xs bg-gray-100 disabled:opacity-50"
              onChange={handleSearch}
              // disabled={isLoading}
            />
            <FaSearch />
          </div>
          <select
            value={statusFilter}
            onChange={handleStatusFilter}
            className="bg-gray-100 px-6 py-4 outline-none disabled:opacity-50"
            disabled={isLoading}
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </span>

        <span className="flex flex-nowrap gap-x-4 [&>*]:px-8 [&>*]:py-4 [&>*]:cursor-pointer text-white font-bold">
          <AddButton disabled={isLoading} />
          <ImportTrigger disabled={isLoading} />
        </span>
      </div>

      {/* Table or status messages */}
      {isError && (
        <div className="text-center py-20 text-red-500">
          Failed to load employees: {error?.message || "Something went wrong"}
        </div>
      )}

      <table className="w-full mt-8">
        <thead>
          <tr className="[&>*]:text-start [&>*]:p-4 bg-blue-500 text-white">
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
          {isLoading ? (
            <tr>
              <td colSpan={8} className="text-center py-10 text-gray-500">
                Loading employees...
              </td>
            </tr>
          ) : employees.length > 0 ? (
            employees.map((emp, idx) => (
              <tr
                key={emp.id}
                className="[&>*]:p-4 hover:bg-blue-50 even:bg-blue-0"
              >
                <td>{idx + 1}</td>
                <td>{emp.empId || `Emp00${idx + 1}`}</td>
                <td>{`${emp.firstName} ${emp.lastName}`}</td>
                <td>{emp.phone}</td>
                <td>{emp.position?.name}</td>
                <td>{emp.department?.name || "N/A"}</td>
                <td>{emp.status || "Active"}</td>
                <td className="space-x-2">
                  <ViewButton selectedEmpId={emp?.empId} />
                  <EditButton selectedEmpId={emp?.empId} />
                  <TrashButton selectedEmpId={emp?.empId} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={8}
                className="text-center py-16 text-gray-400 bg-gray-100 font-bold"
              >
                <div className="flex flex-col items-center">
                  <BsPeople className="text-8xl mb-4" />
                  <p>No employee found</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;

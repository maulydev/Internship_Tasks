"use client";

import { FaSearch } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { useFetchDepartments } from "@/hooks/meta";
import AddButton from "./buttons/add-button";
import EditDepartmentButton from "./buttons/edit-button";
import DeleteButton from "./buttons/delete-button";
import { Meta } from "@/types";

const DepartmentTable = () => {
  const {
    data: departments = [],
    isLoading,
    isError,
    error,
  } = useFetchDepartments();

  return (
    <>
      <div className="bg-white shadow-xl p-6 container mx-auto">
        {isLoading && (
          <div className="text-center py-20 text-gray-500">Loading...</div>
        )}

        {isError && (
          <div className="text-center py-20 text-red-500">
            Failed to load departments:{" "}
            {error?.message || "Something went wrong"}
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
                    placeholder="Search department"
                    className="py-4 outline-none min-w-xs"
                  />
                  <FaSearch />
                </div>
              </span>
              <span className="flex flex-nowrap gap-x-4 [&>*]:px-8 [&>*]:py-4 [&>*]:cursor-pointer text-white font-bold">
                <AddButton />
              </span>
            </div>

            {departments.length > 0 ? (
              <table className="w-full mt-8">
                <thead>
                  <tr className="[&>*]:text-start [&>*]:p-4 bg-blue-500 text-white">
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((dept: Meta, idx: number) => (
                    <tr
                      key={dept.id}
                      className="[&>*]:p-4 hover:bg-blue-50 even:bg-blue-0"
                    >
                      <td>{idx + 1}</td>
                      <td>{dept.name}</td>
                      <td className="space-x-2">
                        <EditDepartmentButton selectedDept={dept} />
                        <DeleteButton selectedDept={dept} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-16 text-gray-400 text-center bg-gray-100 mt-4 font-bold flex flex-col items-center">
                <BsPeople className="text-8xl" />
                <p>No departments found</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default DepartmentTable;

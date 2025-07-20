import { FaSearch } from "react-icons/fa";
import ImportTrigger from "./import-trigger";
import AddButton from "./add-button";

const EmployeeTable = () => {
  return (
    <>
      <div className="bg-white shadow-xl p-6 container mx-auto">
        <h2 className="font-bold text-xl">Employees</h2>
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
            <select className="bg-gray-100 px-6 py-4 outline-none">
              <option value="ACTIVE">Active</option>
              <option value="ACTIVE">Inactive</option>
            </select>
          </span>
          <span className="flex flex-nowrap gap-x-4 [&>*]:px-8 [&>*]:py-4 [&>*]:cursor-pointer text-white font-bold">
            <AddButton />
            <ImportTrigger />
          </span>
        </div>

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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((_, idx) => (
              <tr className="[&>*]:p-4 hover:bg-blue-50 even:bg-blue-0">
                <td>{idx + 1}</td>
                <td>Emp00{idx + 1}</td>
                <td>Michael Smith</td>
                <td>0200000001</td>
                <td>CTO</td>
                <td>Technology</td>
                <td>Actcive</td>
                <td className="space-x-2 [&>*]:cursor-pointer [&>*]:hover:underline">
                  <button className="text-sm p-2 text-blue-500 font-medium px-4">
                    View
                  </button>
                  <button className="text-sm p-2 text-amber-500 font-medium px-4">
                    Edit
                  </button>
                  <button className="text-sm p-2 text-red-500 font-medium px-4">
                    Trash
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeeTable;

import { useFetchEmployeeDetail } from "@/hooks/employees";
import { formatDate } from "@/utils/formatters";
import React from "react";
import { CgClose } from "react-icons/cg";

type EmployeeDetailProps = {
  showModal: boolean;
  handleClose: () => void;
  selectedEmpId: string;
};

const EmployeeDetail = ({
  showModal,
  handleClose,
  selectedEmpId,
}: EmployeeDetailProps) => {
  const { data: employeeDetail, isLoading } = useFetchEmployeeDetail(
    selectedEmpId || ""
  );

  return (
    <div
      className={`${
        showModal ? "visible" : "invisible"
      } bg-black/50 fixed inset-0 text-gray-800`}
    >
      <div
        className={`${
          showModal ? "translate-y-0" : "-translate-y-[110%]"
        } duration-700 bg-white shadow-xl px-6 pt-6 pb-12 container mx-auto my-4 max-w-4xl relative font-medium`}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-5 top-5 text-xl cursor-pointer"
          title="Close form"
        >
          <CgClose />
        </button>

        <div className="mb-6">
          <h1 className="text-2xl font-bold">Employee Details</h1>
          <p className="text-sm text-gray-500">
            View the selected employee's information
          </p>
        </div>

        {isLoading ? (
          <p className="text-center text-gray-600">
            Loading employee details...
          </p>
        ) : !employeeDetail ? (
          <p className="text-center text-red-500">No employee data found.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 text-lg">
            <div>
              <p className="text-gray-500">Full Name</p>
              <span className="inline-flex gap-2">
                <p className="font-semibold">{employeeDetail.firstName}</p>
                <p className="font-semibold">{employeeDetail.lastName}</p>
              </span>
            </div>
            <div>
              <p className="text-gray-500">Employee ID</p>
              <p className="font-semibold">{employeeDetail.empId}</p>
            </div>
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-semibold">{employeeDetail.email}</p>
            </div>
            <div>
              <p className="text-gray-500">Phone</p>
              <p className="font-semibold">{employeeDetail.phone}</p>
            </div>
            <div>
              <p className="text-gray-500">Position</p>
              <p className="font-semibold">
                {employeeDetail.position?.name || "-"}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Department</p>
              <p className="font-semibold">
                {employeeDetail.department?.name || "-"}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Salary</p>
              <p className="font-semibold">{employeeDetail.salary}</p>
            </div>
            <div>
              <p className="text-gray-500">Joined Date</p>
              <p className="font-semibold">
                {new Date(employeeDetail.joinedDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Status</p>
              <p className="font-semibold capitalize">
                {employeeDetail.status}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Created</p>
              <p className="font-semibold">
                {formatDate(employeeDetail.createdAt)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetail;
